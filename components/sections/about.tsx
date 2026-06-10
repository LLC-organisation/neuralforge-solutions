"use client";

import { motion } from "motion/react";
import {
  Lightbulb,
  ShieldCheck,
  Users,
  Handshake,
  Lock,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  index: number;
}

function ValueCard({ icon: Icon, title, index }: ValueCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-zinc-900 border border-zinc-800 rounded-lg p-5",
        "hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center gap-3 text-center"
      )}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <Icon size={18} className="text-white" />
      </div>
      <span className="text-white font-medium text-sm">{title}</span>
    </motion.div>
  );
}

const values: Omit<ValueCardProps, "index">[] = [
  { icon: Lightbulb, title: "Practical Innovation" },
  { icon: ShieldCheck, title: "Integrity" },
  { icon: Users, title: "Client First" },
  { icon: Handshake, title: "Collaboration" },
  { icon: ShieldCheck, title: "Transparency" },
  { icon: Lock, title: "Security First" },
];

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  initials: string;
  index: number;
}

function TeamCard({ name, role, bio, initials, index }: TeamCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-zinc-900 border border-zinc-800 rounded-lg p-6",
        "hover:border-blue-500/50 transition-all duration-300 flex flex-col gap-4"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <span className="text-white font-bold text-xl">{initials}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-white font-semibold text-lg">{name}</h3>
        <p className="text-blue-400 text-sm font-medium">{role}</p>
      </div>
      <p className="text-white/60 text-sm leading-relaxed">{bio}</p>
    </motion.div>
  );
}

const team: Omit<TeamCardProps, "index">[] = [
  {
    name: "Victor Kamiri",
    role: "Co-Founder · Mobile & Frontend UI/UX Engineer & Marketing Lead",
    initials: "VK",
    bio: "Victor leads design and marketing at Rychlo. He builds the interfaces our clients interact with every day and makes sure complex technology feels straightforward to use.",
  },
  {
    name: "Lee Haney",
    role: "Co-Founder · Tech & AI Engineering Lead",
    initials: "LH",
    bio: "Lee is the one who figures out how to build it. He leads our engineering work, designs the AI systems we deploy, and makes sure everything we ship is reliable and well-built.",
  },
  {
    name: "George Akai",
    role: "Co-Founder · Cybersecurity Lead & AI Engineer",
    initials: "GA",
    bio: "George keeps our systems, and our clients' systems, secure. He leads cybersecurity across all our projects and designs the architecture that handles sensitive data responsibly.",
  },
];

export function AboutSection() {
  const handleScroll = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-24 bg-black">
      <div className="container flex flex-col gap-20">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 flex flex-col gap-4 hover:border-blue-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
              <h3 className="text-blue-400 font-semibold text-lg uppercase tracking-wide">Our Mission</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Our work is simple: take the tasks that eat up your team's time and
              build systems to handle them automatically. The goal isn't just
              efficiency. It's giving people space to do the kind of work they
              actually want to do.
            </p>
          </motion.div>

          <motion.div
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 flex flex-col gap-4 hover:border-blue-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
              <h3 className="text-blue-400 font-semibold text-lg uppercase tracking-wide">Our Vision</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              To be the go-to technology team for growing businesses in East Africa
              and beyond. Not a vendor you call once, but a partner who understands
              your operations and helps you stay ahead of what's coming.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="flex flex-col gap-8">
          <motion.div
            className="flex flex-col items-center text-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white">Our Values</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {values.map((value, i) => (
              <ValueCard key={value.title} {...value} index={i} />
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="flex flex-col gap-8">
          <motion.div
            className="flex flex-col items-center text-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white">Meet the Founders</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <TeamCard key={member.name} {...member} index={i} />
            ))}
          </div>
        </div>

        {/* Company Story + CTA */}
        <motion.div
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 md:p-12 flex flex-col gap-6 hover:border-blue-500/50 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
            <h3 className="text-blue-400 font-semibold text-lg uppercase tracking-wide">Our Story</h3>
          </div>
          <p className="text-white/80 leading-relaxed text-base max-w-3xl">
            Rychlo came out of a straightforward observation: most businesses spend too much time on work
            that technology could handle. We saw teams doing the same manual tasks day after day:
            data entry, chasing approvals, pulling reports. We knew there was a better way.
            We built Rychlo to offer practical, well-engineered solutions: automation that actually runs,
            security that holds up, and a team that stays accountable long after the project is delivered.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
            <Button size="lg" onClick={handleScroll} className="gap-2">
              Work With Our Team <ArrowRight size={16} />
            </Button>
            <span className="text-white/40 text-sm">Free first call. No sales pressure.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
