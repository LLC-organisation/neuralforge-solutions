"use server";

import prisma from "@/lib/prisma";
import { sendConsultationNotification } from "@/lib/email";
import { consultationSchema, type ConsultationFormData } from "@/lib/schemas/consultation";

type SuccessResult = { success: true };
type ErrorResult = {
  success: false;
  fieldErrors?: Partial<Record<keyof ConsultationFormData, string[]>>;
  error?: string;
};

export async function submitConsultationRequest(
  data: unknown
): Promise<SuccessResult | ErrorResult> {
  const parsed = consultationSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors as Partial<
        Record<keyof ConsultationFormData, string[]>
      >,
    };
  }

  try {
    await prisma.consultationRequest.create({ data: parsed.data });
    await sendConsultationNotification(parsed.data);
    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
