import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * Shared shell for every public marketing route. Auth routes opt out of this
 * by living in the (auth) route group with their own minimal layout.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // No bg-background here — the fixed neural-network canvas in app/layout.tsx
    // needs to be visible behind page content. Body keeps the base colour.
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
