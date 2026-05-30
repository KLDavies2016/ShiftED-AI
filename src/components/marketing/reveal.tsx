"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

/**
 * Drop-in scroll-reveal wrapper. Honours `prefers-reduced-motion`
 * automatically because Framer Motion already does.
 */
interface RevealProps {
  children: React.ReactNode;
  /** Pixel offset before triggering. Default: -10% (slightly before in view). */
  rootMargin?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical translation in px. */
  y?: number;
  as?: React.ElementType;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const MotionEl = motion(as as React.ElementType);
  return (
    <MotionEl
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionEl>
  );
}
