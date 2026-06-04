import { z } from "zod";

export const COMPANY_SIZES = ["1-10", "11-50", "51-200", "200+"] as const;
export type CompanySize = (typeof COMPANY_SIZES)[number];

export const consultationSchema = z.object({
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
  industry: z
    .string()
    .min(1, "Industry is required")
    .max(100, "Industry must be under 100 characters"),
  companySize: z.enum(COMPANY_SIZES, {
    errorMap: () => ({ message: "Please select a company size" }),
  }),
  businessChallenge: z
    .string()
    .min(10, "Please describe your challenge in at least 10 characters")
    .max(2000, "Business challenge must be under 2000 characters"),
  desiredOutcome: z
    .string()
    .min(10, "Please describe your desired outcome in at least 10 characters")
    .max(2000, "Desired outcome must be under 2000 characters"),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;
