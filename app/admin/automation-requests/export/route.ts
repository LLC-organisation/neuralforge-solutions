import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const rows = await prisma.automationRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "ID",
    "Full Name",
    "Company Name",
    "Email",
    "Phone",
    "Industry",
    "Existing Systems",
    "Current Process",
    "Pain Points",
    "Desired Automation",
    "Estimated Monthly Volume",
    "Submitted At",
  ];

  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;

  const csvRows = [
    headers.join(","),
    ...rows.map((r) =>
      [
        escape(r.id),
        escape(r.fullName),
        escape(r.companyName),
        escape(r.email),
        escape(r.phone),
        escape(r.industry),
        escape(r.existingSystems),
        escape(r.currentProcess),
        escape(r.painPoints),
        escape(r.desiredAutomation),
        escape(r.estimatedMonthlyVolume),
        r.createdAt.toISOString(),
      ].join(",")
    ),
  ];

  const date = new Date().toISOString().split("T")[0];

  return new NextResponse(csvRows.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="automation-requests-${date}.csv"`,
    },
  });
}
