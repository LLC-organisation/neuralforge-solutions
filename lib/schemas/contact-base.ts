import { z } from "zod";

export const contactBaseSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be under 100 characters"),
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Phone number must be under 20 characters"),
});

export type ContactBaseData = z.infer<typeof contactBaseSchema>;
