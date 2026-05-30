"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Signup shell. Today this funnels into the waitlist API — when the platform
 * phase is live, swap the body for a Supabase `signUp` call and a verification
 * follow-up. The marketing site already drives 99% of net-new accounts here.
 */
export default function SignupPage() {
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName,
          consent: true,
          source: "/signup",
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Try again.");
      setDone(true);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <Card className="border-border/60 bg-card/70 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="font-display text-2xl">You're on the list.</CardTitle>
          <CardDescription>
            We'll email you when the platform goes live.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/60 bg-card/70 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="font-display text-2xl">Create your account.</CardTitle>
        <CardDescription>
          Join the waitlist to be notified when we go live — or head to{" "}
          <a className="underline underline-offset-4" href="/testing">testing</a>{" "}
          if you'd like to help shape the experience as a tester.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="mb-1.5 block">Full name</Label>
            <Input
              id="fullName"
              autoComplete="name"
              placeholder="Alex Mensah"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="mb-1.5 block">Work email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="alex@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? <Loader2 className="animate-spin" /> : null}
            Join the waitlist <ArrowRight />
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have access?{" "}
          <Link href="/login" className="text-foreground underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
