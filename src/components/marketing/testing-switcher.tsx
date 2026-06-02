"use client";

import * as React from "react";
import { BellRing, FlaskConical } from "lucide-react";

import { WaitlistForm } from "./waitlist-form";
import { TesterForm } from "./tester-form";
import { cn } from "@/lib/utils";

type Mode = "waitlist" | "tester";

/**
 * Tabbed switcher used on the /testing page. Lets visitors choose between the
 * lightweight waitlist signup and the full tester application without
 * stacking both forms on top of each other.
 *
 * Implements the WAI-ARIA Authoring Practices tabs pattern — arrow keys
 * move between tabs, Tab/Shift-Tab move in/out of the tab list, and the
 * active tabpanel is fully revealed (no nested focus traps).
 */
export function TestingSwitcher() {
  // Tester is the default tab — testers are the priority conversion on this
  // page; waitlist remains a one-click alternative.
  const [mode, setMode] = React.useState<Mode>("tester");
  const waitlistTabRef = React.useRef<HTMLButtonElement>(null);
  const testerTabRef = React.useRef<HTMLButtonElement>(null);

  function onTabKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = mode === "waitlist" ? "tester" : "waitlist";
      setMode(next);
      requestAnimationFrame(() => {
        (next === "waitlist" ? waitlistTabRef : testerTabRef).current?.focus();
      });
    }
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-2 sm:p-3">
      <div
        role="tablist"
        aria-label="Choose how to take part"
        className="grid grid-cols-2 gap-1 rounded-xl bg-background/40 p-1"
      >
        <TabButton
          ref={waitlistTabRef}
          icon={BellRing}
          label="Join the waitlist"
          subLabel="Notify me when we go live"
          active={mode === "waitlist"}
          onClick={() => setMode("waitlist")}
          onKeyDown={onTabKey}
          controls="panel-waitlist"
          id="tab-waitlist"
        />
        <TabButton
          ref={testerTabRef}
          icon={FlaskConical}
          label="Sign up to be a tester"
          subLabel="Help us shape ShiftED AI"
          active={mode === "tester"}
          onClick={() => setMode("tester")}
          onKeyDown={onTabKey}
          controls="panel-tester"
          id="tab-tester"
        />
      </div>

      <div className="p-5 sm:p-7">
        {mode === "waitlist" ? (
          <div
            role="tabpanel"
            id="panel-waitlist"
            aria-labelledby="tab-waitlist"
            tabIndex={0}
          >
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Join the waitlist
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Get one email when we go live. No follow-up sequence, no spam.
              Just the moment the platform opens.
            </p>
            <div className="mt-5">
              <WaitlistForm variant="expanded" />
            </div>
          </div>
        ) : (
          <div
            role="tabpanel"
            id="panel-tester"
            aria-labelledby="tab-tester"
            tabIndex={0}
          >
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Sign up to be a tester
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Help us shape it. We'll send a short brief, give you early
              access, and request feedback at the end of the journey.
            </p>
            <div className="mt-5">
              <TesterForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface TabButtonProps {
  icon: React.ElementType;
  label: string;
  subLabel: string;
  active: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  controls: string;
  id: string;
}

const TabButton = React.forwardRef<HTMLButtonElement, TabButtonProps>(
  function TabButton({ icon: Icon, label, subLabel, active, onClick, onKeyDown, controls, id }, ref) {
    return (
      <button
        ref={ref}
        role="tab"
        id={id}
        aria-controls={controls}
        aria-selected={active}
        tabIndex={active ? 0 : -1}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={cn(
          "group relative flex items-start gap-3 rounded-lg p-3 text-left transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          active
            ? "bg-card text-foreground shadow-soft"
            : "text-muted-foreground hover:bg-card/40 hover:text-foreground",
        )}
      >
        <span
          className={cn(
            "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-border/60",
            active
              ? "bg-brand-gradient/15 text-foreground"
              : "bg-background/60 text-muted-foreground",
          )}
        >
          <Icon className="size-4" />
        </span>
        <span className="flex flex-col">
          <span className="font-display text-sm font-semibold">{label}</span>
          <span className="text-xs">{subLabel}</span>
        </span>
        {active && (
          <span
            aria-hidden
            className="absolute inset-x-3 -bottom-px h-px bg-brand-gradient"
          />
        )}
      </button>
    );
  },
);
