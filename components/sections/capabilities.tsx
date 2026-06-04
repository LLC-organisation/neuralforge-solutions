"use client";

import { motion } from "motion/react";
import {
  FileSearch,
  Network,
  Zap,
  Brain,
  LineChart,
  ShieldCheck,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CapabilityItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

function CapabilityItem({
  icon: Icon,
  title,
  description,
  index,
}: CapabilityItemProps) {
  return (
    <motion.div
      className={cn(
        "group bg-zinc-900 border border-zinc-800 rounded-lg p-5",
        "hover:border-yellow-500/50 transition-all duration-300 flex flex-col gap-3"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <Icon size={18} className="text-black" />
      </div>
      <h3 className="text-white text-base font-semibold">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

const capabilities: Omit<CapabilityItemProps, "index">[] = [
  {
    icon: FileSearch,
    title: "Intelligent Document Processing",
    description:
      "Read, extract, and process data from any document format",
  },
  {
    icon: Network,
    title: "Multi-System Integration",
    description:
      "Connect your apps so data flows without human intervention",
  },
  {
    icon: Zap,
    title: "Autonomous Task Execution",
    description:
      "Let software complete repetitive tasks while your team focuses on what matters",
  },
  {
    icon: Brain,
    title: "AI Agents & Copilots",
    description:
      "Intelligent assistants that learn your business and help your team work faster",
  },
  {
    icon: LineChart,
    title: "Analytics & Monitoring",
    description:
      "Real-time dashboards that show you what's working and what needs attention",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Governance",
    description:
      "Built-in audit trails and controls to keep your business compliant",
  },
  {
    icon: Lock,
    title: "Security & Scalability",
    description:
      "Enterprise-grade security that grows with your business",
  },
];

export function CapabilitiesSection() {
  return (
    <section id="solutions" className="py-24 bg-zinc-950">
      <div className="container flex flex-col gap-12">
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center text-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white">What We Can Do For You</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" />
          <p className="text-white/70 max-w-xl text-base leading-relaxed">
            A full spectrum of automation capabilities built for real business
            challenges.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, i) => (
            <CapabilityItem key={cap.title} {...cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
