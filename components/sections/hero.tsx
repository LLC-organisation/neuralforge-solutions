"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck } from "lucide-react";

export function HeroSection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
        alt="Technology background"
        fill
        className="object-cover"
        priority
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/95" />

      {/* Blue accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.08)_0%,_transparent_70%)]" />

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center text-center gap-8 py-32">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-blue-300 text-sm font-medium">Automation · AI · Cybersecurity</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <span className="text-white">We Build the Systems</span>{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            That Free Your Team.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-white/70 text-lg md:text-xl max-w-2xl text-balance leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          Amek Technology builds automation tools, AI systems, and security solutions
          for businesses that want to do more without adding more staff.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
        >
          <Button size="lg" onClick={() => handleScroll("#contact")} className="gap-2">
            <CalendarCheck size={18} />
            Book Free Consultation
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleScroll("#services")}
            className="gap-2"
          >
            Explore Our Services
            <ArrowRight size={16} />
          </Button>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {["Workflow Automation", "AI Assistants", "Cybersecurity", "System Integrations"].map((tag) => (
            <span key={tag} className="text-white/40 text-sm flex items-center gap-1.5">
              <span className="w-1 h-1 bg-blue-500 rounded-full" />
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
