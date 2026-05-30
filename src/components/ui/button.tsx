"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Brand gradient fill, primary CTA.
        primary:
          "text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-px bg-brand-gradient",
        // Solid neutral, high-contrast.
        secondary:
          "bg-foreground text-background hover:opacity-90",
        // Outline with gradient hairline.
        outline:
          "gradient-border bg-card text-foreground hover:bg-card/80",
        // Subtle button for secondary CTAs / nav.
        ghost:
          "text-foreground/80 hover:bg-muted hover:text-foreground",
        // Destructive — used in dashboards.
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
        // Link-style button.
        link:
          "text-primary underline-offset-4 hover:underline rounded-none px-0",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
