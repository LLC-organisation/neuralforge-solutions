"use server";

import prisma from "@/lib/prisma";
import { sendAutomationRequestNotification } from "@/lib/email";
import { automationSchema, type AutomationFormData } from "@/lib/schemas/automation";

type SuccessResult = { success: true };
type ErrorResult = {
  success: false;
  fieldErrors?: Partial<Record<keyof AutomationFormData, string[]>>;
  error?: string;
};

export async function submitAutomationRequest(
  data: unknown
): Promise<SuccessResult | ErrorResult> {
  const parsed = automationSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors as Partial<
        Record<keyof AutomationFormData, string[]>
      >,
    };
  }

  try {
    await prisma.automationRequest.create({ data: parsed.data });
    await sendAutomationRequestNotification(parsed.data);
    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
