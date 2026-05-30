import Link from "next/link";
import { LifeBuoy } from "lucide-react";

import { Logo } from "./logo";
import { footerNav, supportResources } from "@/data/nav";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Shift your emotional development with ShiftED AI, a practice-based
            platform for long-term behavioural change.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            ShiftED AI is a practice-based training platform, not therapy.
            Content is certified by psychologists.
          </p>
        </div>

        <FooterColumn title="Product" links={footerNav.product} />
        <FooterColumn title="Company" links={footerNav.company} />
        <FooterColumn title="Resources & legal">
          {[...footerNav.resources, ...footerNav.legal].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </FooterColumn>
      </div>

      {/* Crisis & professional support panel. Always visible because anyone
          arriving in distress shouldn't need to hunt for it. */}
      <div className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
            <div className="flex items-start gap-3 sm:max-w-xs">
              <div className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-gradient/10 text-foreground ring-1 ring-border/60">
                <LifeBuoy className="size-4" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold">
                  Need professional support?
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  ShiftED isn't therapy. If something you're working through
                  feels bigger than practice, these services can help.
                </p>
              </div>
            </div>
            <ul className="grid flex-1 gap-3 sm:grid-cols-3">
              {supportResources.map((s) => (
                <li
                  key={s.name}
                  className="rounded-lg border border-border/60 bg-background/40 p-3"
                >
                  <div className="text-xs font-semibold">{s.name}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px]">
                    <a
                      href={`tel:${s.phone.replace(/\s+/g, "")}`}
                      className="font-mono font-medium text-foreground hover:text-primary"
                    >
                      {s.phone}
                    </a>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                    >
                      website
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>© {year} ShiftED AI Ltd. All rights reserved.</p>
          <p>Built with care for the people doing the hardest jobs.</p>
        </div>
      </div>
    </footer>
  );
}

interface ColProps {
  title: string;
  links?: { label: string; href: string }[];
  children?: React.ReactNode;
}
function FooterColumn({ title, links, children }: ColProps) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/80">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links?.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
        {children}
      </ul>
    </div>
  );
}
