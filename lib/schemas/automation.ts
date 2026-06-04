import { z } from "zod";

export const automationSchema = z.object({
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
  existingSystems: z
    .string()
    .min(1, "Please list your existing systems")
    .max(2000, "Must be under 2000 characters"),
  currentProcess: z
    .string()
    .min(10, "Please describe your current process in at least 10 characters")
    .max(2000, "Must be under 2000 characters"),
  painPoints: z
    .string()
    .min(10, "Please describe your pain points in at least 10 characters")
    .max(2000, "Must be under 2000 characters"),
  desiredAutomation: z
    .string()
    .min(10, "Please describe your desired automation in at least 10 characters")
    .max(2000, "Must be under 2000 characters"),
  estimatedMonthlyVolume: z
    .string()
    .min(1, "Please provide an estimated volume")
    .max(200, "Must be under 200 characters"),
});

export type AutomationFormData = z.infer<typeof automationSchema>;
