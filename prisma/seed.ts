import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Upsert the singleton SiteSettings row
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      email: "hello@biashara-automation.com",
      whatsapp: "https://wa.me/15550001234",
      telegram: "https://t.me/biashara_auto",
      linkedin: "https://linkedin.com/company/biashara-automation",
      instagram: "https://instagram.com/biashara_automation",
      twitter: "https://x.com/biashara_auto",
      facebook: "https://facebook.com/biashara.automation",
    },
  });

  // Seed mock case studies
  const caseStudies = [
    {
      clientProblem:
        "A regional accounting firm was spending 30+ hours per week manually entering invoice data from PDF documents into their accounting software. Errors were frequent, causing delays in client billing.",
      solution:
        "We deployed an intelligent document processing pipeline that automatically extracts invoice data from PDFs, validates it against predefined rules, and pushes it directly into their accounting software via API integration.",
      results:
        "Invoice processing time reduced from 30 hours/week to under 2 hours. Error rate dropped by 94%. The team redirected 28 hours/week to higher-value client advisory work.",
      industry: "Accounting",
      companySize: "11-50",
      published: true,
    },
    {
      clientProblem:
        "A property management company was tracking maintenance requests across 200+ units using email chains and spreadsheets. Requests were getting lost, response times were unpredictable, and tenant satisfaction was declining.",
      solution:
        "We built a workflow automation system that captures maintenance requests through a simple form, automatically assigns them to the right contractor based on type and location, and sends status updates to tenants at each stage.",
      results:
        "Average response time improved from 4.2 days to 18 hours. Tenant satisfaction scores increased by 40%. The operations team eliminated 15 hours/week of manual coordination work.",
      industry: "Real Estate",
      companySize: "11-50",
      published: true,
    },
    {
      clientProblem:
        "A healthcare staffing agency was manually matching nurse candidates to open hospital shifts using spreadsheets. The process took 3-4 hours daily and often resulted in unfilled shifts due to slow communication.",
      solution:
        "We developed an AI-powered matching system that automatically suggests the best available candidates for each shift based on qualifications, availability, and location. Candidates receive instant notifications and can confirm in one click.",
      results:
        "Shift fill rate improved from 71% to 96%. Daily coordination time dropped from 4 hours to 30 minutes. Agency revenue increased 18% in the first quarter after launch.",
      industry: "Healthcare",
      companySize: "1-10",
      published: true,
    },
  ];

  for (const caseStudy of caseStudies) {
    await prisma.caseStudy.create({ data: caseStudy });
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
