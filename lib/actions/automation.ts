"use server";

import prisma from "@/lib/prisma";
import { sendAutomationRequestNotification } from "@/lib/email";
import { automationSchema } from "@/lib/schemas/automation";
import type { FormState } from "@/lib/schemas/form-state";

export async function submitAutomationRequest(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = automationSchema.safeParse({
    fullName: formData.get("fullName"),
    companyName: formData.get("companyName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    industry: formData.get("industry"),
    existingSystems: formData.get("existingSystems"),
    currentProcess: formData.get("currentProcess"),
    painPoints: formData.get("painPoints"),
    desiredAutomation: formData.get("desiredAutomation"),
    estimatedMonthlyVolume: formData.get("estimatedMonthlyVolume"),
  });

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.automationRequest.create({ data: parsed.data });
    await sendAutomationRequestNotification(parsed.data);
    return { success: true };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}
