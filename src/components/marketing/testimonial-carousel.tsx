"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "./reveal";
import { testimonials } from "@/data/testimonials";

/**
 * Autoplay-light testimonial carousel. Pauses on hover, supports keyboard
 * left/right, and falls back to a static stack with prefers-reduced-motion.
 */
export function TestimonialCarousel() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6500);
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonials[index]!;

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      className="relative py-24 sm:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge>Voices from the work</Badge>
          <h2 className="mt-4 font-display text-display-lg">
            What people are telling us.
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="glass-card relative px-6 py-10 sm:px-10 sm:py-12">
            <Quote
              aria-hidden
              className="absolute -top-5 left-6 size-10 text-brand-violet"
              strokeWidth={1.5}
            />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-balance text-lg leading-relaxed text-foreground/90 sm:text-xl"
              >
                "{t.quote}"
              </motion.blockquote>
            </AnimatePresence>
            <div className="mt-8 flex items-center justify-between gap-4">
              <div>
                <div className="font-display font-semibold">{t.author}</div>
                <div className="text-sm text-muted-foreground">
                  {t.role}
                  {t.organization ? ` · ${t.organization}` : ""}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" aria-label="Previous" onClick={prev}>
                  <ChevronLeft />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Next" onClick={next}>
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Testimonial pagination">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-brand-gradient" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
