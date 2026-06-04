"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "@/lib/prisma";

const caseStudySchema = z.object({
  clientProblem: z.string().min(10, "Please describe the client problem"),
  solution: z.string().min(10, "Please describe the solution"),
  results: z.string().min(10, "Please describe the results"),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  published: z.boolean().default(false),
});

export async function createCaseStudy(formData: FormData) {
  const raw = {
    clientProblem: formData.get("clientProblem") as string,
    solution: formData.get("solution") as string,
    results: formData.get("results") as string,
    industry: formData.get("industry") as string | undefined,
    companySize: formData.get("companySize") as string | undefined,
    published: formData.get("published") === "true",
  };

  const parsed = caseStudySchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  await prisma.caseStudy.create({ data: parsed.data });
  revalidatePath("/admin/case-studies");
  revalidatePath("/");
  redirect("/admin/case-studies");
}

export async function updateCaseStudy(id: string, formData: FormData) {
  const raw = {
    clientProblem: formData.get("clientProblem") as string,
    solution: formData.get("solution") as string,
    results: formData.get("results") as string,
    industry: (formData.get("industry") as string) || undefined,
    companySize: (formData.get("companySize") as string) || undefined,
    published: formData.get("published") === "true",
  };

  const parsed = caseStudySchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  await prisma.caseStudy.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/case-studies");
  revalidatePath("/");
  redirect("/admin/case-studies");
}

export async function deleteCaseStudy(id: string) {
  await prisma.caseStudy.delete({ where: { id } });
  revalidatePath("/admin/case-studies");
  revalidatePath("/");
}

export async function toggleCaseStudyPublished(id: string, published: boolean) {
  await prisma.caseStudy.update({ where: { id }, data: { published } });
  revalidatePath("/admin/case-studies");
  revalidatePath("/");
}
