import { Container } from "@/components/ui/container";
import { WaitlistForm } from "./waitlist-form";
import { Reveal } from "./reveal";

/**
 * Closing CTA banner used at the bottom of every marketing page.
 * Repeats the primary conversion offer with a slightly different framing so
 * it doesn't feel duplicated.
 */
export function CtaBanner() {
  return (
    <section className="relative isolate py-24 sm:py-32">
      <Container>
        <Reveal className="glass-card noise relative overflow-hidden p-10 sm:p-14">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-90"
            style={{
              background:
                "radial-gradient(120% 80% at 0% 0%, rgba(250,102,198,0.18), transparent 55%), radial-gradient(80% 80% at 100% 100%, rgba(84,112,254,0.22), transparent 55%)",
            }}
          />
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-display-lg text-foreground">
                Protect the human{" "}
                <span className="text-gradient-brand">in your work</span>.
              </h2>
              <p className="mt-4 max-w-xl text-balance text-muted-foreground">
                Join the waitlist to be notified when we go live — or head to
                our <a href="/testing" className="underline underline-offset-2 hover:text-foreground">testing page</a> to
                sign up as a tester and help shape the experience.
              </p>
            </div>
            <WaitlistForm variant="expanded" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
