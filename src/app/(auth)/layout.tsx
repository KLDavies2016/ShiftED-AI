import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { AnimatedGlow } from "@/components/marketing/animated-glow";

/**
 * Minimal auth layout. No site header/footer — auth screens are focused single
 * tasks. We surface the logo + a back link, and let the page own the rest.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedGlow />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 sm:px-6 lg:px-8">
        <Logo />
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to site
        </Link>
      </header>
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
