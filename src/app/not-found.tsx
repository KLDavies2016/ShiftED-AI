import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedGlow } from "@/components/marketing/animated-glow";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      <AnimatedGlow />
      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 font-display text-display-lg">
          We can't find that page.
        </h1>
        <p className="mt-4 max-w-md text-balance text-muted-foreground">
          The link might have moved, expired or never existed. Head back to the
          start and let's keep going.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/contact">Tell us what broke</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
