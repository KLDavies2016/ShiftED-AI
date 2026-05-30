"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  /** Currently selected value, 0..max. */
  value: number;
  /** Called with the new selection. */
  onChange: (value: number) => void;
  /** Max stars (default 5). */
  max?: number;
  /** Accessible name for the radio group. */
  label: string;
  /** Optional id for the wrapper — links a Label to the group via htmlFor. */
  id?: string;
  className?: string;
  /** Disabled state. */
  disabled?: boolean;
}

/**
 * Five-star rating input.
 *
 * Implemented as a `role="radiogroup"` so screen readers announce it as a
 * one-of-N choice. Arrow keys move selection; Home / End jump to the ends.
 * The visual treatment is filled gradient stars for the active range, with a
 * hover state so users can see what they're about to commit to.
 */
export function StarRating({
  value,
  onChange,
  max = 5,
  label,
  id,
  className,
  disabled = false,
}: StarRatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const groupRef = React.useRef<HTMLDivElement>(null);

  const displayValue = hovered ?? value;

  function setFromKey(e: React.KeyboardEvent) {
    if (disabled) return;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        onChange(Math.min(max, value + 1 || 1));
        break;
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        onChange(Math.max(0, value - 1));
        break;
      case "Home":
        e.preventDefault();
        onChange(1);
        break;
      case "End":
        e.preventDefault();
        onChange(max);
        break;
    }
  }

  return (
    <div
      ref={groupRef}
      id={id}
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled}
      onKeyDown={setFromKey}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl border border-input bg-card/60 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        disabled && "opacity-60",
        className,
      )}
    >
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
        const active = n <= displayValue;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} out of ${max} — ${ratingLabel(n)}`}
            disabled={disabled}
            onMouseEnter={() => !disabled && setHovered(n)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => !disabled && setHovered(n)}
            onBlur={() => setHovered(null)}
            onClick={() => !disabled && onChange(n)}
            className={cn(
              "group inline-flex size-9 items-center justify-center rounded-lg transition-transform",
              "hover:scale-110 focus-visible:outline-none focus-visible:scale-110",
              disabled && "cursor-not-allowed hover:scale-100",
            )}
          >
            <Star
              className={cn(
                "size-6 transition-colors",
                active
                  ? "fill-[url(#star-gradient)] stroke-transparent"
                  : "fill-transparent stroke-muted-foreground/60 group-hover:stroke-foreground",
              )}
            />
          </button>
        );
      })}
      {/* Single SVG gradient definition referenced by every active star. */}
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fa66c6" />
            <stop offset="50%" stopColor="#a76be2" />
            <stop offset="100%" stopColor="#5470fe" />
          </linearGradient>
        </defs>
      </svg>
      <span className="sr-only" aria-live="polite">
        {value > 0 ? `${value} of ${max}` : "no rating yet"}
      </span>
    </div>
  );
}

function ratingLabel(n: number): string {
  return (
    ["", "Not important", "Slightly important", "Important", "Very important", "Critical"][n] ??
    ""
  );
}
