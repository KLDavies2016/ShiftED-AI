"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { waitlistSchema, type WaitlistInput } from "@/lib/validation";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
  /** "inline" is a single-line email + button. "expanded" is the full form. */
  variant?: "inline" | "expanded";
  className?: string;
}

const roleOptions: { value: WaitlistInput["role"]; label: string }[] = [
  { value: "INDIVIDUAL", label: "Individual professional" },
  { value: "MANAGER", label: "People manager" },
  { value: "HR_LEADER", label: "HR / People leader" },
  { value: "CLINICIAN", label: "Clinician / care worker" },
  { value: "EDUCATOR", label: "Educator / coach" },
  { value: "OTHER", label: "Something else" },
];

/**
 * Waitlist signup form. The same component renders inline (header / hero) and
 * expanded (waitlist section). Submissions go to /api/waitlist which persists
 * to Prisma and triggers a Resend confirmation email.
 */
export function WaitlistForm({ variant = "inline", className }: WaitlistFormProps) {
  const [done, setDone] = React.useState(false);
  const isExpanded = variant === "expanded";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
      fullName: "",
      organization: "",
      consent: true,
      role: undefined,
    },
  });

  async function onSubmit(values: WaitlistInput) {
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Try again?");
      }
      setDone(true);
      toast.success("You're on the list. Check your inbox.");
      reset();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  if (done) {
    return (
      <div
        className={cn(
          "glass-card flex items-center gap-3 p-5 text-sm",
          className,
        )}
        role="status"
      >
        <CheckCircle2 className="size-5 shrink-0 text-primary" />
        <div>
          <div className="font-medium">You're on the waitlist.</div>
          <div className="text-muted-foreground">
            We've sent a confirmation email. We'll be in touch when the
            platform goes live.
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("w-full", className)}
    >
      {isExpanded ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="fullName"
            label="Full name"
            error={errors.fullName?.message}
            inputProps={{ ...register("fullName"), placeholder: "Alex Avatar", autoComplete: "name" }}
          />
          <Field
            id="email"
            label="Work email"
            error={errors.email?.message}
            inputProps={{
              ...register("email"),
              type: "email",
              placeholder: "alex@company.com",
              autoComplete: "email",
              required: true,
            }}
          />
          <div className="sm:col-span-1">
            <Label htmlFor="role" className="mb-1.5 block">Role</Label>
            <select
              id="role"
              {...register("role")}
              className="flex h-11 w-full rounded-xl border border-input bg-card/60 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <option value="">Pick what fits</option>
              {roleOptions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <Field
            id="organization"
            label="Organisation (optional)"
            error={errors.organization?.message}
            inputProps={{ ...register("organization"), placeholder: "ShiftED AI" }}
          />
          <div className="sm:col-span-2">
            <label className="flex items-start gap-3 text-xs text-muted-foreground">
              <input
                type="checkbox"
                {...register("consent")}
                className="mt-0.5 size-4 rounded border-input accent-primary"
                defaultChecked
              />
              <span>
                I'd like ShiftED AI to email me about early access. You can
                unsubscribe at any time. See our{" "}
                <a href="/legal/privacy" className="underline underline-offset-2">privacy notice</a>.
              </span>
            </label>
            {errors.consent ? (
              <p className="mt-2 text-xs text-destructive">{errors.consent.message}</p>
            ) : null}
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : null}
              Join the waitlist
              <ArrowRight />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <Input
              id="waitlist-email"
              type="email"
              autoComplete="email"
              placeholder="you@work.com"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "waitlist-email-error" : undefined}
              required
            />
            {errors.email ? (
              <p
                id="waitlist-email-error"
                className="mt-1.5 text-xs text-destructive"
              >
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <Button type="submit" size="lg" disabled={isSubmitting} className="sm:w-auto">
            {isSubmitting ? <Loader2 className="animate-spin" /> : null}
            Join the waitlist
            <ArrowRight />
          </Button>
          <input type="hidden" {...register("consent")} value="true" />
        </div>
      )}
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
