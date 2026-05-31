"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactInput } from "@/lib/validation";

const topics: { value: ContactInput["topic"]; label: string }[] = [
  { value: "GENERAL", label: "General question" },
  { value: "SALES", label: "Sales / team pilot" },
  { value: "PARTNERSHIPS", label: "Partnerships" },
  { value: "PRESS", label: "Press" },
  { value: "SUPPORT", label: "Support" },
];

interface ContactFormProps {
  defaultTopic?: ContactInput["topic"];
}

export function ContactForm({ defaultTopic = "GENERAL" }: ContactFormProps) {
  const [done, setDone] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: defaultTopic, message: "", fullName: "", email: "", company: "" },
  });

  async function onSubmit(values: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong.");
      }
      toast.success("Thanks — we'll be in touch within a business day.");
      setDone(true);
      reset();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  if (done) {
    return (
      <div className="glass-card flex items-start gap-3 p-6">
        <CheckCircle2 className="size-6 shrink-0 text-primary" />
        <div>
          <div className="font-display text-lg font-semibold">Message received.</div>
          <p className="mt-1 text-sm text-muted-foreground">
            We've sent you a confirmation email and our team will reply within a
            business day. If it's urgent, just reply to that email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 sm:grid-cols-2">
      <div>
        <Label htmlFor="fullName" className="mb-1.5 block">Full name</Label>
        <Input id="fullName" autoComplete="name" placeholder="Alex Avatar" {...register("fullName")} />
        {errors.fullName && <p className="mt-1.5 text-xs text-destructive">{errors.fullName.message}</p>}
      </div>
      <div>
        <Label htmlFor="email" className="mb-1.5 block">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="alex@company.com"
          {...register("email")}
        />
        {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="company" className="mb-1.5 block">Organisation (optional)</Label>
        <Input id="company" placeholder="ShiftED AI" {...register("company")} />
      </div>
      <div>
        <Label htmlFor="topic" className="mb-1.5 block">Topic</Label>
        <select
          id="topic"
          {...register("topic")}
          className="flex h-11 w-full rounded-xl border border-input bg-card/60 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {topics.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="message" className="mb-1.5 block">Message</Label>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell us a bit about what you're trying to do."
          {...register("message")}
          className="flex w-full rounded-xl border border-input bg-card/60 px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Loader2 className="animate-spin" /> : null}
          Send message <ArrowRight />
        </Button>
      </div>
    </form>
  );
}
