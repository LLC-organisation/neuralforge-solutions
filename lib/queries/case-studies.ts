import prisma from "@/lib/prisma";

export const caseStudies = {
  getPublished: () =>
    prisma.caseStudy.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    }),

  getAll: () =>
    prisma.caseStudy.findMany({
      orderBy: { createdAt: "desc" },
    }),

  getById: (id: string) =>
    prisma.caseStudy.findUnique({ where: { id } }),
};
