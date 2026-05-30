import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Standard horizontal container — caps page width and adds responsive
 * gutter padding. Use this on every section root.
 */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
