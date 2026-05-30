import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Brand mark. The SVG below is hand-tuned from the official ShiftED AI logo —
 * a stylised lotus made of gradient petals — paired with the wordmark.
 *
 * Usage:
 *   <Logo />                  // mark + wordmark, links to /
 *   <Logo variant="mark" />   // mark only
 *   <Logo as="span" />        // non-linked (for footers in unusual contexts)
 */
interface LogoProps {
  variant?: "full" | "mark";
  as?: "link" | "span";
  className?: string;
}

export function Logo({ variant = "full", as = "link", className }: LogoProps) {
  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark className="h-7 w-auto" />
      {variant === "full" ? (
        <span className="font-display text-xl font-semibold tracking-tight text-foreground">
          ShiftED <span className="text-foreground/60">AI</span>
        </span>
      ) : null}
    </span>
  );
  if (as === "span") return inner;
  return (
    <Link href="/" aria-label="ShiftED AI home" className="inline-flex items-center">
      {inner}
    </Link>
  );
}

function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 332 260"
      role="img"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="lotus-radial"
          cx="166.07"
          cy="15.76"
          r="175.12"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-0.02 -1 0.75 -0.02 158.15 182.06)"
        >
          <stop offset="0.12" stopColor="#fa66c6" />
          <stop offset="0.24" stopColor="#d568d2" />
          <stop offset="0.42" stopColor="#a76be2" />
          <stop offset="0.59" stopColor="#836dee" />
          <stop offset="0.75" stopColor="#696ff7" />
          <stop offset="0.89" stopColor="#5970fc" />
          <stop offset="1" stopColor="#5470fe" />
        </radialGradient>
        <linearGradient
          id="lotus-linear"
          x1="165.46"
          y1="49.81"
          x2="165.46"
          y2="224.65"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fa66c6" />
          <stop offset="0.31" stopColor="#d968d1" />
          <stop offset="0.82" stopColor="#7b6ef1" />
          <stop offset="1" stopColor="#5470fe" />
        </linearGradient>
      </defs>
      <path
        d="M156.84,3.51c-26.3,25.65-97.95,111.68-.18,212.46a12.3,12.3,0,0,0,17.61,0C272,115.19,200.39,29.16,174.09,3.51A12.35,12.35,0,0,0,156.84,3.51Z"
        fill="url(#lotus-radial)"
      />
      <path
        d="M216.57,213.5a122.64,122.64,0,0,1-102.2,0C41.93,180.17,41.19,95.06,44,61.17a12.37,12.37,0,0,1,16-10.8c24.73,7.61,75,30.65,95.94,95.36l.17.54c.74,2.08,3.73,9.4,9.38,9.4s8.63-7.32,9.38-9.4l.17-.54C196,81,246.22,58,271,50.37a12.35,12.35,0,0,1,16,10.8C289.75,95.06,289,180.17,216.57,213.5Z"
        fill="url(#lotus-linear)"
      />
      <path
        d="M318.42,114.26a12.35,12.35,0,0,1,12.32,14.54c-5.58,31-28.57,104.76-122,125.8a197,197,0,0,1-86.52,0C28.85,233.58,5.81,160,.2,128.89a12.35,12.35,0,0,1,12.39-14.54c25.57.46,79.64,7.67,110.66,57.2h0c7.75,14.33,18.6,29.15,33.28,44.3a12.41,12.41,0,0,0,17.84,0c14.11-14.56,24.69-28.81,32.36-42.62l2.68-4.52C240.68,121.2,293.36,114.54,318.42,114.26Z"
        fill="url(#lotus-linear)"
      />
    </svg>
  );
}
