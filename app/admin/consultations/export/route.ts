import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const rows = await prisma.consultationRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "ID",
    "Full Name",
    "Company Name",
    "Email",
    "Phone",
    "Industry",
    "Company Size",
    "Business Challenge",
    "Desired Outcome",
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
        escape(r.companySize),
        escape(r.businessChallenge),
        escape(r.desiredOutcome),
        r.createdAt.toISOString(),
      ].join(",")
    ),
  ];

  const date = new Date().toISOString().split("T")[0];

  return new NextResponse(csvRows.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="consultations-${date}.csv"`,
    },
  });
}
