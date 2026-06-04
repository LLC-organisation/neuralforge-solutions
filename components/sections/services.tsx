"use client";

import { motion } from "motion/react";
import {
  FileText,
  ScanLine,
  Workflow,
  Bot,
  Plug,
  BarChart3,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  index: number;
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  benefits,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      className={cn(
        "group bg-zinc-900 border border-zinc-800 rounded-lg p-6",
        "hover:border-yellow-500/50 transition-all duration-300 flex flex-col gap-4"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <Icon size={22} className="text-black" />
      </div>

      {/* Title */}
      <h3 className="text-white text-xl font-semibold">{title}</h3>

      {/* Description */}
      <p className="text-white/70 text-sm leading-relaxed">{description}</p>

      {/* Benefits */}
      <ul className="flex flex-col gap-2 mt-auto">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm">
            <CheckCircle2
              size={15}
              className="text-yellow-500 mt-0.5 shrink-0"
            />
            <span className="text-white/80">{benefit}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

const services: Omit<ServiceCardProps, "index">[] = [
  {
    icon: FileText,
    title: "Tax Automation",
    description:
      "Automate tax calculations, filings, and compliance tracking so your team never misses a deadline.",
    benefits: [
      "Eliminate manual tax prep",
      "Real-time compliance alerts",
      "Reduce filing errors by 90%",
    ],
  },
  {
    icon: ScanLine,
    title: "Document Processing",
    description:
      "Extract, classify, and route documents without manual handling.",
    benefits: [
      "Process invoices in seconds",
      "Zero manual data entry",
      "Works with PDFs, emails, and scans",
    ],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Replace repetitive multi-step processes with automated pipelines.",
    benefits: [
      "Save 20+ hours per week",
      "Consistent, error-free execution",
      "Runs 24/7 without supervision",
    ],
  },
  {
    icon: Bot,
    title: "AI Assistants",
    description:
      "Deploy intelligent assistants that handle customer queries and internal tasks.",
    benefits: [
      "Answer questions instantly",
      "Available around the clock",
      "Learns your business over time",
    ],
  },
  {
    icon: Plug,
    title: "System Integrations",
    description:
      "Connect your existing tools so data flows automatically between them.",
    benefits: [
      "No more copy-pasting data",
      "Syncs in real time",
      "Works with 500+ apps",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Get real-time visibility into your operations without manual reporting.",
    benefits: [
      "Live dashboards, no spreadsheets",
      "Spot bottlenecks instantly",
      "Data-driven decisions made easy",
    ],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-black">
      <div className="container flex flex-col gap-12">
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center text-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white">Our Services</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" />
          <p className="text-white/70 max-w-xl text-base leading-relaxed">
            End-to-end automation services designed to eliminate friction from
            your operations.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
