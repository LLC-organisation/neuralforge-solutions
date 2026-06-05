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
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  index: number;
}

function ServiceCard({ icon: Icon, title, description, benefits, index }: ServiceCardProps) {
  const handleScroll = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

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
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <Icon size={22} className="text-white" />
      </div>

      <h3 className="text-white text-xl font-semibold">{title}</h3>
      <p className="text-white/70 text-sm leading-relaxed">{description}</p>

      <ul className="flex flex-col gap-2 mt-auto">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm">
            <CheckCircle2 size={15} className="text-blue-400 mt-0.5 shrink-0" />
            <span className="text-white/80">{benefit}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleScroll}
        className="mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors"
      >
        Get started <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}

const services: Omit<ServiceCardProps, "index">[] = [
  {
    icon: FileText,
    title: "Tax Automation",
    description: "We build systems that handle tax calculations, filing, and compliance tracking automatically — so your team isn't scrambling when deadlines hit.",
    benefits: ["No more manual data entry at year-end", "Automatic compliance checks", "Fewer costly filing mistakes"],
  },
  {
    icon: ScanLine,
    title: "Document Processing",
    description: "Invoices, contracts, applications — we build pipelines that extract the right data and route it where it needs to go, without anyone having to touch it.",
    benefits: ["Process documents in seconds, not hours", "Handles PDFs, emails, and scanned forms", "No manual data entry"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "We map your most time-consuming processes and replace them with automated pipelines that run quietly in the background.",
    benefits: ["Reclaim hours every week", "Consistent execution every time", "Runs even when your team is offline"],
  },
  {
    icon: Bot,
    title: "AI Assistants",
    description: "We build AI assistants trained on your business — your products, your processes, your tone — so your team isn't answering the same questions all day.",
    benefits: ["Instant responses to common questions", "Handles intake forms and basic support", "Gets smarter as your business grows"],
  },
  {
    icon: Plug,
    title: "System Integrations",
    description: "Your tools should talk to each other. We connect your CRM, accounting software, inbox, and other platforms so nothing slips through the cracks.",
    benefits: ["No more copying data between platforms", "Syncs in real time", "Works with the tools you already use"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Stop pulling reports manually. We build dashboards that update automatically so you always know what's happening in your business.",
    benefits: ["Live data, no spreadsheet maintenance", "Spot problems before they get expensive", "Reports your whole team can actually read"],
  },
];

export function ServicesSection() {
  const handleScroll = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-24 bg-black">
      <div className="container flex flex-col gap-12">
        <motion.div
          className="flex flex-col items-center text-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white">Our Services</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
          <p className="text-white/70 max-w-xl text-base leading-relaxed">
            We build practical technology that solves specific problems — from automating repetitive tasks to securing your systems and connecting your tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>

        {/* Section CTA */}
        <motion.div
          className="flex flex-col items-center gap-4 pt-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white/60 text-sm">Not sure where to start? Let's talk through your specific situation.</p>
          <Button size="lg" onClick={handleScroll} className="gap-2">
            Book a Free Strategy Session <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
