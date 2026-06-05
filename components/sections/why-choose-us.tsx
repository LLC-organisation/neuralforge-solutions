"use client";

import { motion } from "motion/react";
import {
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  Settings,
  HeartHandshake,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
        "hover:border-blue-500/50 transition-all duration-300 flex flex-col gap-4"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="text-white font-semibold">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

const reasons: Omit<ReasonCardProps, "index">[] = [
  {
    icon: DollarSign,
    title: "Lower Operational Costs",
    description: "Replace manual, time-intensive tasks with automated systems — keep your output high without expanding your team.",
  },
  {
    icon: TrendingUp,
    title: "Your Team Works on Better Things",
    description: "When routine work is handled automatically, your people can focus on the work they're actually good at.",
  },
  {
    icon: CheckCircle,
    title: "Fewer Costly Mistakes",
    description: "Automated processes are consistent. Manual ones aren't. We help move your critical work into systems that don't have bad days.",
  },
  {
    icon: Clock,
    title: "Faster Turnaround",
    description: "Tasks that used to take hours run in minutes — without anyone sitting in front of a screen watching them.",
  },
  {
    icon: Settings,
    title: "Built Around Your Business",
    description: "We don't sell templates. Every system we build is designed around how your business actually works.",
  },
  {
    icon: HeartHandshake,
    title: "We Stay After the Work Is Done",
    description: "We don't disappear after launch. If something needs tuning or your process changes, we're a phone call away.",
  },
];

export function WhyChooseUsSection() {
  const handleScroll = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container flex flex-col gap-12">
        <motion.div
          className="flex flex-col items-center text-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white">Why Clients Work With Us</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
          <p className="text-white/70 max-w-xl text-base leading-relaxed">
            We're not a software vendor. We're a team you can call when something breaks, needs improving, or isn't quite right.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.title} {...reason} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="bg-gradient-to-r from-blue-600/20 to-blue-400/10 border border-blue-500/30 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3 className="text-white font-semibold text-xl mb-1">Curious what this would look like for your business?</h3>
            <p className="text-white/60 text-sm">We'll walk you through a free 30-minute consultation — no pressure, no sales script.</p>
          </div>
          <Button size="lg" onClick={handleScroll} className="shrink-0 gap-2">
            Get a Free Consultation <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
