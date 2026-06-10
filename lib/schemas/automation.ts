import { z } from "zod";
import { contactBaseSchema } from "./contact-base";

export const automationSchema = contactBaseSchema.extend({
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

export type AutomationFormData = typeof automationSchema._type;
