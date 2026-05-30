import { z } from "zod";

/**
 * Validation schemas shared between client (react-hook-form) and server
 * (API route handlers). Keep them flat and serialisable.
 */

export const waitlistSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  fullName: z
    .string()
    .min(2, "Tell us your name.")
    .max(120, "That's a long name — shorten it a touch.")
    .optional()
    .or(z.literal("")),
  role: z
    .enum([
      "INDIVIDUAL",
      "MANAGER",
      "HR_LEADER",
      "CLINICIAN",
      "EDUCATOR",
      "OTHER",
    ])
    .optional(),
  organization: z.string().max(160).optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true, {
    message: "We need your consent to email you.",
  }),
  source: z.string().max(160).optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const contactSchema = z.object({
  fullName: z.string().min(2, "Tell us your name."),
  email: z.string().email("Enter a valid email address."),
  topic: z
    .enum(["GENERAL", "SALES", "PARTNERSHIPS", "PRESS", "SUPPORT"])
    .default("GENERAL"),
  company: z.string().max(160).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Add a few more details.")
    .max(4000, "Trim that down a touch."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  source: z.string().max(160).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const testerSchema = z.object({
  fullName: z.string().min(2, "Tell us your name."),
  email: z.string().email("Enter a valid email address."),
  company: z
    .string()
    .max(160, "Trim the company name a touch.")
    .optional()
    .or(z.literal("")),
  importanceRating: z
    .number({ invalid_type_error: "Pick a star rating." })
    .int()
    .min(1, "Pick at least one star.")
    .max(5),
  wantsAtWork: z
    .string()
    .min(2, "A short answer is fine — even a yes or no.")
    .max(2000, "Trim that down a touch."),
  biggestChallenge: z
    .string()
    .min(2, "Tell us one thing — even briefly.")
    .max(2000, "Trim that down a touch."),
  source: z.string().max(160).optional(),
});

export type TesterInput = z.infer<typeof testerSchema>;
