"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { z } from "zod";

const settingsSchema = z.object({
  email: z.string().email().optional().or(z.literal("")),
  whatsapp: z.string().url().optional().or(z.literal("")),
  telegram: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
});

export async function updateSiteSettings(formData: FormData) {
  const raw = {
    email: (formData.get("email") as string) || undefined,
    whatsapp: (formData.get("whatsapp") as string) || undefined,
    telegram: (formData.get("telegram") as string) || undefined,
    linkedin: (formData.get("linkedin") as string) || undefined,
    instagram: (formData.get("instagram") as string) || undefined,
    twitter: (formData.get("twitter") as string) || undefined,
    facebook: (formData.get("facebook") as string) || undefined,
  };

  const parsed = settingsSchema.safeParse(raw);
  if (!parsed.success) return { error: "Invalid settings." };

  // Replace empty strings with null
  const data = Object.fromEntries(
    Object.entries(parsed.data).map(([k, v]) => [k, v === "" ? null : v])
  );

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...data },
    update: data,
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
