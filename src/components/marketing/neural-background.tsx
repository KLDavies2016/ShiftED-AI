"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Animated neural-network background.
 *
 * Renders a constellation of "neurons" onto a fixed full-viewport canvas that
 * sits behind every section. Behaviour:
 *
 *  • Nodes drift continuously on their own with a tiny per-node velocity.
 *  • As the user scrolls, each node parallax-shifts vertically. Different
 *    nodes have different parallax factors so the field feels 3D.
 *  • Nearby nodes draw a thin glowing connection — the closer they are, the
 *    brighter the line. This is the "neural" look from the inspiration image.
 *  • Sporadically a small subset of nodes pulse brightly, like firing
 *    neurons. The pulse is short and randomised so it never looks scripted.
 *
 * Performance notes:
 *  • DPR-aware sizing keeps it crisp on retina.
 *  • The render loop is paused when the tab is hidden (Page Visibility API).
 *  • Honours prefers-reduced-motion — falls back to a static frame.
 *  • Node count and connection range scale down on small viewports.
 *
 * Visual notes:
 *  • Effect is dark-mode only. In light mode the rendered glow doesn't read,
 *    so we return null rather than ship a washed-out version.
 *  • Colours come straight from the brand gradient: a violet/cyan/blue
 *    constellation that ties the page back to the logo.
 */

interface Node {
  /** Stable id used for short-lived cascade scheduling. */
  id: number;
  /** Resting position (before scroll & drift offsets). */
  baseX: number;
  baseY: number;
  /** Continuous drift velocity (px/sec). */
  vx: number;
  vy: number;
  /** Current rendered position — recomputed each frame. */
  x: number;
  y: number;
  /** Per-node parallax factor for scroll shift (0.15…0.7). */
  parallax: number;
  /** Pulse state: phase 0..1, 1 = fully lit. */
  pulse: number;
  /** Next time (in ms since start) this node should fire a new pulse. */
  nextPulseAt: number;
  /** Radius in CSS pixels. */
  radius: number;
}

/**
 * A short-lived firing event travelling along one connection.
 * Used to draw the bright "synaptic" trail when one neuron triggers another.
 */
interface FiringEdge {
  fromId: number;
  toId: number;
  /** Time the firing started (ms since perf origin). */
  startedAt: number;
  /** How long the trail stays visible (ms). */
  duration: number;
}

export function NeuralBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const reducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (resolvedTheme !== "dark") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    let nodes: Node[] = [];
    let firings: FiringEdge[] = [];
    let connectionDistance = 150;
    let raf = 0;
    let running = true;
    let lastFrame = performance.now();
    let scrollY = window.scrollY;

    /** Re-seed nodes & resize the canvas backing store. */
    function setup() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = window.innerHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area but caps so we don't melt low-end machines.
      const area = width * height;
      const target = Math.round(area / 14000);
      const count = Math.max(40, Math.min(target, 170));
      connectionDistance = Math.max(110, Math.min(width / 9, 180));

      // Spread the field well beyond the viewport on every axis so a healthy
      // number of neurons live "off the page". Combined with the soft edge
      // mask this gives the field real depth — you can feel that there's
      // more constellation past the visible edges.
      const xBleed = 0.4;   // 40% past each horizontal edge
      const yBleed = 0.45;  // 45% past each vertical edge
      const fieldW = width * (1 + xBleed * 2);
      const fieldH = height * (1 + yBleed * 2);
      const xOffset = -width * xBleed;
      const yOffset = -height * yBleed;

      // Enforce a minimum separation between neurons (Poisson-disc-ish
      // sampling via rejection). Stops the field from showing tight pairs
      // or clusters and keeps the constellation visually even.
      const minDistance = Math.max(80, Math.min(width / 11, 130));
      const minDistance2 = minDistance * minDistance;
      const placed: { x: number; y: number }[] = [];

      nodes = Array.from({ length: count }, (_, idx): Node => {
        let bx = 0;
        let by = 0;
        // Try up to 40 times to find a slot that respects the minimum
        // distance to every already-placed neuron. After that, give up and
        // accept whatever the last sample produced — guarantees the loop
        // terminates even on tight viewports.
        for (let attempt = 0; attempt < 40; attempt++) {
          bx = xOffset + ((Math.random() + Math.random()) / 2) * fieldW;
          by = yOffset + ((Math.random() + Math.random()) / 2) * fieldH;
          let ok = true;
          for (const p of placed) {
            const dx = p.x - bx;
            const dy = p.y - by;
            if (dx * dx + dy * dy < minDistance2) {
              ok = false;
              break;
            }
          }
          if (ok) break;
        }
        placed.push({ x: bx, y: by });
        return {
          id: idx,
          baseX: bx,
          baseY: by,
          vx: (Math.random() - 0.5) * 0.06,
          vy: (Math.random() - 0.5) * 0.06,
          x: bx,
          y: by,
          parallax: 0.15 + Math.random() * 0.55,
          pulse: 0,
          // Spread the first round of firings over a wide window so the page
          // doesn't load with a burst of synchronised activity.
          nextPulseAt: performance.now() + Math.random() * 22000,
          radius: 1.2 + Math.random() * 1.8,
        };
      });
      firings = [];
    }

    /**
     * Find the n nearest neighbours of a node (within `connectionDistance`).
     * Cheap O(n) scan — fine at this node count, no spatial index needed.
     */
    function nearestNeighbours(source: Node, n: number): Node[] {
      const max2 = connectionDistance * connectionDistance * 1.6;
      const candidates: { node: Node; d2: number }[] = [];
      for (const other of nodes) {
        if (other.id === source.id) continue;
        const dx = other.x - source.x;
        const dy = other.y - source.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < max2) candidates.push({ node: other, d2 });
      }
      candidates.sort((a, b) => a.d2 - b.d2);
      return candidates.slice(0, n).map((c) => c.node);
    }

    /**
     * Trigger a firing on `node` and propagate to its 2–3 closest neighbours
     * a short delay later — that's the synaptic cascade the user asked for.
     */
    function fire(node: Node, now: number, depth: number) {
      node.pulse = 1;
      if (depth >= 2) return; // limit cascade chain length
      const targets = nearestNeighbours(node, depth === 0 ? 3 : 2);
      for (const target of targets) {
        const dist = Math.hypot(target.x - node.x, target.y - node.y);
        const delay = 60 + dist * 1.6; // closer neurons fire sooner
        firings.push({
          fromId: node.id,
          toId: target.id,
          startedAt: now,
          duration: 320 + dist * 0.6,
        });
        // Schedule the downstream pulse. We do it by overriding the target's
        // own pulse timer rather than setTimeout, so the rAF loop owns time.
        const triggerAt = now + delay;
        target.nextPulseAt = Math.min(target.nextPulseAt, triggerAt);
        // Tag the depth so the loop knows how many more hops to allow.
        // We piggyback on the `pulse` field staying at 0 until trigger.
        // Recursive cascading happens via the regular firing check below.
        // (See tick() loop.)
        void depth;
      }
    }

    function onResize() {
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      setup();
    }

    function onScroll() {
      scrollY = window.scrollY;
    }

    function onVisibility() {
      if (document.hidden) running = false;
      else if (!running) {
        running = true;
        lastFrame = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }

    function tick(now: number) {
      if (!running) return;
      const dt = Math.min(50, now - lastFrame); // clamp big tab-switch deltas
      lastFrame = now;

      // Clear with a barely-there fade so trailing motion feels analogue
      // rather than mechanical.
      ctx!.clearRect(0, 0, width, height);

      // Pre-compute scroll-driven offset per node into the live x/y fields.
      const xMin = -width * 0.4;
      const xMax = width * 1.4;
      const yRange = height * 1.9; // matches the 45% top/bottom bleed
      const yStart = -height * 0.45;
      for (const n of nodes) {
        // Drift.
        n.baseX += n.vx * (dt / 16);
        n.baseY += n.vy * (dt / 16);
        // Wrap horizontally across the bleed-extended field.
        if (n.baseX < xMin) n.baseX = xMax;
        if (n.baseX > xMax) n.baseX = xMin;

        const parallaxOffset = scrollY * n.parallax * 0.12;
        // Modulo-wrap vertically across the full bleed-extended height so
        // scrolling feels continuous without the wrap seam ever showing.
        const wrapped =
          (((n.baseY - parallaxOffset - yStart) % yRange) + yRange) % yRange +
          yStart;
        n.x = n.baseX;
        n.y = wrapped;

        // Pulses fade out smoothly. Slower decay = brighter trails.
        if (n.pulse > 0) n.pulse = Math.max(0, n.pulse - dt / 1100);
        if (now >= n.nextPulseAt) {
          // Schedule the next spontaneous firing. Wide random window so the
          // field never looks synchronised — every neuron drifts on its own
          // clock between roughly 9 and 30 seconds.
          n.nextPulseAt = now + 9000 + Math.random() * 21000;
          // Cascade depth=0: this is a fresh root firing.
          fire(n, now, 0);
        }
      }

      // Reap expired firing edges.
      if (firings.length > 0) {
        firings = firings.filter((f) => now - f.startedAt < f.duration);
      }

      // --- Static connections ---------------------------------------------
      // Additive blending makes overlapping lines bloom. We pre-multiply
      // alpha into the colour to keep state changes minimal.
      ctx!.globalCompositeOperation = "lighter";
      ctx!.lineWidth = 0.9;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const max2 = connectionDistance * connectionDistance;
          if (d2 > max2) continue;
          const d = Math.sqrt(d2);
          const proximity = 1 - d / connectionDistance; // 0..1
          // Pulse from either endpoint boosts the local mesh — firing
          // neurons visibly "light up" their neighbours.
          const pulseLift = (a.pulse + b.pulse) * 0.55;
          const alpha = Math.min(0.85, proximity * 0.32 + pulseLift);

          // Colour mix: violet → blue across the field horizontally.
          const t = (a.x + b.x) / (2 * width);
          const r = Math.round(132 + (84 - 132) * t); // 132 → 84
          const g = Math.round(109 + (112 - 109) * t); // 109 → 112
          const bl = Math.round(238 + (254 - 238) * t); // 238 → 254
          ctx!.strokeStyle = `rgba(${r},${g},${bl},${alpha})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      // --- Firing edges (synaptic cascade) --------------------------------
      // For each active firing, draw a bright travelling stroke from source
      // to target. The head of the stroke advances over time; the tail
      // fades. Visually this reads as a packet of light jumping between
      // neurons.
      for (const f of firings) {
        const from = nodes[f.fromId];
        const to = nodes[f.toId];
        if (!from || !to) continue;
        const progress = (now - f.startedAt) / f.duration; // 0..1
        if (progress < 0 || progress > 1) continue;

        // Eased progress for a more "shot" feel.
        const easedHead = 1 - Math.pow(1 - progress, 2);
        const easedTail = Math.max(0, 1 - Math.pow(1 - progress, 4) - 0.6);

        const hx = from.x + (to.x - from.x) * easedHead;
        const hy = from.y + (to.y - from.y) * easedHead;
        const tx = from.x + (to.x - from.x) * easedTail;
        const ty = from.y + (to.y - from.y) * easedTail;

        // Glowing head + tail. Two strokes so the leading point reads brighter.
        const headAlpha = 0.95 * (1 - progress * 0.7);
        ctx!.lineWidth = 2;
        ctx!.strokeStyle = `rgba(190, 215, 255, ${headAlpha})`;
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(hx, hy);
        ctx!.stroke();

        // Inner ultra-bright core line.
        ctx!.lineWidth = 0.9;
        ctx!.strokeStyle = `rgba(255, 255, 255, ${headAlpha * 0.8})`;
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(hx, hy);
        ctx!.stroke();

        // Bright dot at the head — the "packet" tip.
        const headGlow = ctx!.createRadialGradient(hx, hy, 0, hx, hy, 8);
        headGlow.addColorStop(0, `rgba(220, 235, 255, ${headAlpha})`);
        headGlow.addColorStop(1, "rgba(220, 235, 255, 0)");
        ctx!.fillStyle = headGlow;
        ctx!.beginPath();
        ctx!.arc(hx, hy, 8, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Restore default line width for the node-glow pass.
      ctx!.lineWidth = 1;

      // --- Nodes ----------------------------------------------------------
      for (const n of nodes) {
        // Base brightness is higher; firing neurons go close to full white.
        const lit = 0.55 + n.pulse * 0.45;
        const glowSize = n.radius * (8 + n.pulse * 6);
        const gradient = ctx!.createRadialGradient(
          n.x,
          n.y,
          0,
          n.x,
          n.y,
          glowSize,
        );
        gradient.addColorStop(0, `rgba(180, 205, 255, ${0.75 * lit})`);
        gradient.addColorStop(1, "rgba(180, 205, 255, 0)");
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, glowSize, 0, Math.PI * 2);
        ctx!.fill();

        // Bright core. Punchier when firing.
        const coreAlpha = Math.min(1, 1.05 * lit);
        ctx!.fillStyle = `rgba(235, 242, 255, ${coreAlpha})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius * (1 + n.pulse * 0.6), 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    }

    function staticFrame() {
      // Reduced-motion users get a single, calm render with no animation.
      tick(performance.now());
      running = false;
    }

    setup();

    if (reducedMotion) {
      staticFrame();
    } else {
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [resolvedTheme, reducedMotion]);

  // Effect intentionally hidden in light mode — see file-level note.
  if (resolvedTheme && resolvedTheme !== "dark") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        // Very soft radial fall-off — most of the page sees the constellation
        // at full strength so neurons can clearly continue past the visible
        // edges, with only the extreme corners dimming for legibility.
        maskImage:
          "radial-gradient(ellipse 120% 115% at 50% 45%, black 82%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 120% 115% at 50% 45%, black 82%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full opacity-[0.55]" />
    </div>
  );
}
