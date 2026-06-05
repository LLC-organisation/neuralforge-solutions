import prisma from "@/lib/prisma";
import { Users, Bot, BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";

async function getStats() {
  const [consultations, automationRequests, caseStudies] = await Promise.all([
    prisma.consultationRequest.count(),
    prisma.automationRequest.count(),
    prisma.caseStudy.count({ where: { published: true } }),
  ]);
  return { consultations, automationRequests, caseStudies };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    {
      label: "Consultation Requests",
      value: stats.consultations,
      icon: Users,
      href: "/admin/consultations",
    },
    {
      label: "Automation Requests",
      value: stats.automationRequests,
      icon: Bot,
      href: "/admin/automation-requests",
    },
    {
      label: "Published Case Studies",
      value: stats.caseStudies,
      icon: BookOpen,
      href: "/admin/case-studies",
    },
    {
      label: "Total Leads",
      value: stats.consultations + stats.automationRequests,
      icon: TrendingUp,
      href: "/admin/consultations",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-white text-2xl font-semibold mb-2">Dashboard</h1>
      <p className="text-zinc-400 mb-8">Overview of your leads and content.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <Icon size={20} className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-zinc-400 text-sm">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

