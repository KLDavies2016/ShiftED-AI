"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Sign-in shell. The Supabase calls are commented out — once the platform
 * phase begins, replace the simulated handler with the real `signInWithOtp` /
 * `signInWithPassword` call.
 */
export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      // TODO(auth-phase): swap for real Supabase call.
      // const supabase = getSupabaseBrowserClient();
      // await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/auth/callback` } });
      await new Promise((r) => setTimeout(r, 600));
      toast.success("Check your inbox for a magic link.");
    } catch {
      toast.error("Couldn't send the link. Try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="border-border/60 bg-card/70 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="font-display text-2xl">Welcome back.</CardTitle>
        <CardDescription>
          Sign in with a magic link. We'll email you a single-use code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-1.5 block">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@work.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? <Loader2 className="animate-spin" /> : <Mail />}
            Email me a link
            <ArrowRight />
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button variant="outline" size="lg" className="w-full" disabled>
          Single sign-on (coming soon)
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link href="/signup" className="text-foreground underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
