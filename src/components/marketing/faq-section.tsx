import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/data/faq";
import { Reveal } from "./reveal";

export function FaqSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <Badge>FAQ</Badge>
            <h2 className="mt-4 font-display text-display-lg">
              Questions we hear{" "}
              <span className="text-gradient-brand">most often</span>.
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              Still curious? Drop us a line on the{" "}
              <a href="/contact" className="underline underline-offset-2 hover:text-foreground">
                contact page
              </a>{" "}
              — we reply within a business day.
            </p>
          </Reveal>

          <Reveal>
            <Accordion type="single" collapsible className="rounded-2xl border border-border/60 bg-card/40 px-6">
              {faq.map((item) => (
                <AccordionItem key={item.question} value={item.question} className="last:border-b-0">
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
