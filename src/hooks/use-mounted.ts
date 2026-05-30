"use client";

import { useEffect, useState } from "react";

/**
 * Returns true after the first client render. Use this to avoid hydration
 * mismatches when reading from `window`, `localStorage`, or `matchMedia`.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
