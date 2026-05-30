import { Container } from "@/components/ui/container";

/**
 * "Trusted by" logo wall. Until partners agree to public branding, we use
 * stylised wordmarks so the section still reads as social proof without
 * implying false partnerships.
 */
const partners = [
  "Hartwell NHS Trust",
  "Northwind Aid",
  "Aldwych & Co",
  "Lattice Labs",
  "City of Edinburgh Council",
  "my-pwb.co.uk",
];

export function LogoWall() {
  return (
    <section className="relative border-y border-border/60 bg-background/60 py-12">
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Trusted by leaders in healthcare, social impact and people-first business
        </p>
        <ul className="mt-8 grid grid-cols-2 items-center justify-items-center gap-y-6 gap-x-8 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p) => (
            <li
              key={p}
              className="font-display text-base font-semibold text-foreground/60 transition-colors hover:text-foreground"
            >
              {p}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
