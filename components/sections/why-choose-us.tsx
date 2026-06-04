"use client";

import { motion } from "motion/react";
import {
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  Settings,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReasonCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

function ReasonCard({ icon: Icon, title, description, index }: ReasonCardProps) {
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
      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <Icon size={20} className="text-black" />
      </div>
      <h3 className="text-white font-semibold">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

const reasons: Omit<ReasonCardProps, "index">[] = [
  {
    icon: DollarSign,
    title: "Reduce Costs",
    description:
      "Cut operational costs by eliminating manual labor from repetitive tasks",
  },
  {
    icon: TrendingUp,
    title: "Increase Efficiency",
    description:
      "Get more done in less time with automation that never takes a day off",
  },
  {
    icon: CheckCircle,
    title: "Minimize Errors",
    description:
      "Remove human error from your most critical business processes",
  },
  {
    icon: Clock,
    title: "Faster Operations",
    description: "Processes that took hours now complete in minutes",
  },
  {
    icon: Settings,
    title: "Custom Solutions",
    description:
      "Every automation is built specifically for your business, not a generic template",
  },
  {
    icon: HeartHandshake,
    title: "Continuous Support",
    description:
      "We stay with you after launch to optimize and expand your automation",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="container flex flex-col gap-12">
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center text-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white">Why Businesses Choose Us</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" />
          <p className="text-white/70 max-w-xl text-base leading-relaxed">
            Real, measurable impact for businesses that are ready to grow without
            growing their headcount.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.title} {...reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
