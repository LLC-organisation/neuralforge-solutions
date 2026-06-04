"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

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
        alt="Business automation background"
        fill
        className="object-cover"
        priority
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center text-center gap-8 py-32">
        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="text-white">Automate Your Business.</span>{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Focus on Growth.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-white/70 text-lg md:text-xl max-w-2xl text-balance leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          We help businesses eliminate repetitive work through intelligent
          automation solutions tailored to their needs.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <Button size="lg" onClick={() => handleScroll("#contact")}>
            Request Consultation
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleScroll("#services")}
          >
            Explore Solutions
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
