import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s]{10,15}$/, "Enter a valid phone number"),
  inquiryType: z.enum(["new_sip", "portfolio_review", "general", "support"]),
  message: z
    .string()
    .trim()
    .min(10, "Please add a few more details (10+ characters)"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
