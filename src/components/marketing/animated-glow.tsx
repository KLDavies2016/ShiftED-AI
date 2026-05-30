"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Soft, slow-drifting gradient glows used behind hero / CTA sections.
 *
 * Pure CSS where it can be, framer-motion only for the drift so we don't
 * tax the main thread. Pointer-events disabled — it's purely decorative.
 */
export function AnimatedGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <motion.div
        className="absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(250,102,198,0.35), transparent 60%), radial-gradient(circle at 70% 70%, rgba(84,112,254,0.35), transparent 60%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 4, -2, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 right-[-10%] h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(167,107,226,0.32), transparent 65%)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* faint grid wash */}
      <div className="absolute inset-0 bg-grid opacity-[0.35] dark:opacity-[0.5]" />
    </div>
  );
}
