"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarRating } from "@/components/ui/star-rating";
import { testerSchema, type TesterInput } from "@/lib/validation";

/**
 * Tester application form. Captures everything we need to triage the first
 * waves of testers without creating a wall of fields:
 *   - Name / email / company (contact basics)
 *   - 1–5 star empathy & critical-thinking importance rating
 *   - "Would you want this at work?" — qualitative fit
 *   - "Biggest challenge" — feeds product discovery
 *
 * Submits to /api/tester. The route is rate-limited and triggers a Resend
 * confirmation to both the applicant and the admin inbox.
 */
export function TesterForm() {
  const [done, setDone] = React.useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TesterInput>({
    resolver: zodResolver(testerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      importanceRating: 0,
      wantsAtWork: "",
      biggestChallenge: "",
    },
  });

  async function onSubmit(values: TesterInput) {
    try {
      const res = await fetch("/api/tester", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong.");
      }
      toast.success("Thanks — we'll be in touch with next steps.");
      setDone(true);
      reset();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  if (done) {
    return (
      <div className="glass-card flex items-start gap-3 p-6" role="status">
        <CheckCircle2 className="size-6 shrink-0 text-primary" />
        <div>
          <div className="font-display text-lg font-semibold">
            Tester application received.
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            We've emailed you a confirmation and we'll be in touch shortly with
            next steps and a brief confidentiality note. Thank you for
            helping shape ShiftED AI.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-5 sm:grid-cols-2"
    >
      <Field
        id="tester-name"
        label="Name"
        error={errors.fullName?.message}
        inputProps={{
          ...register("fullName"),
          placeholder: "Alex Avatar",
          autoComplete: "name",
        }}
      />
      <Field
        id="tester-email"
        label="Email"
        error={errors.email?.message}
        inputProps={{
          ...register("email"),
          type: "email",
          placeholder: "alex@company.com",
          autoComplete: "email",
        }}
      />
      <div className="sm:col-span-2">
        <Field
          id="tester-company"
          label="Company name"
          error={errors.company?.message}
          inputProps={{
            ...register("company"),
            placeholder: "ShiftED AI",
            autoComplete: "organization",
          }}
        />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="tester-rating" className="mb-1.5 block">
          How important do you think empathy and critical-thinking skills are?
        </Label>
        <Controller
          name="importanceRating"
          control={control}
          render={({ field }) => (
            <StarRating
              id="tester-rating"
              label="How important do you think empathy and critical-thinking skills are?"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.importanceRating ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.importanceRating.message}</p>
        ) : null}
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="tester-want" className="mb-1.5 block">
          Is this a tool you would want access to at work?
        </Label>
        <textarea
          id="tester-want"
          rows={3}
          placeholder="Honest answers welcome — yes, no, or somewhere in between."
          {...register("wantsAtWork")}
          className="flex w-full rounded-xl border border-input bg-card/60 px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        {errors.wantsAtWork ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.wantsAtWork.message}</p>
        ) : null}
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="tester-challenge" className="mb-1.5 block">
          What is your biggest challenge?
        </Label>
        <textarea
          id="tester-challenge"
          rows={4}
          placeholder="One thing about your work or your team that you wish you had more support with."
          {...register("biggestChallenge")}
          className="flex w-full rounded-xl border border-input bg-card/60 px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        {errors.biggestChallenge ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.biggestChallenge.message}</p>
        ) : null}
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Loader2 className="animate-spin" /> : null}
          Submit application <ArrowRight />
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          We'll only use this to invite you to test and to shape what we build.
          You can withdraw any time.
        </p>
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}
function Field({ id, label, error, inputProps }: FieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block">
        {label}
      </Label>
      <Input id={id} aria-invalid={!!error} {...inputProps} />
      {error ? <p className="mt-1.5 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
