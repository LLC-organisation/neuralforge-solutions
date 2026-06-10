"use server";

import prisma from "@/lib/prisma";
import { sendConsultationNotification } from "@/lib/email";
import { consultationSchema } from "@/lib/schemas/consultation";
import type { FormState } from "@/lib/schemas/form-state";

export async function submitConsultationRequest(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = consultationSchema.safeParse({
    fullName: formData.get("fullName"),
    companyName: formData.get("companyName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.consultationRequest.create({ data: parsed.data });
    await sendConsultationNotification(parsed.data);
    return { success: true };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}
