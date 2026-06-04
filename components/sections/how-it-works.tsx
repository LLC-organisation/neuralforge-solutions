"use client";

import { motion } from "motion/react";

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Tell us about your challenge",
    description:
      "Share the repetitive tasks and bottlenecks slowing your business down.",
  },
  {
    number: 2,
    title: "We analyze your workflow",
    description:
      "Our team maps your current processes and identifies the best automation opportunities.",
  },
  {
    number: 3,
    title: "We design your solution",
    description:
      "We build a custom automation blueprint tailored to your specific operations.",
  },
  {
    number: 4,
    title: "We implement automation",
    description:
      "Our engineers deploy and test your automation, integrating seamlessly with your existing tools.",
  },
  {
    number: 5,
    title: "We support and optimize",
    description:
      "We monitor performance and continuously improve your automations as your business evolves.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-black">
      <div className="container flex flex-col gap-16">
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center text-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white">How It Works</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" />
          <p className="text-white/70 max-w-xl text-base leading-relaxed">
            A proven five-step process to take you from bottleneck to
            fully automated.
          </p>
        </motion.div>

        {/* Desktop: horizontal with connecting line */}
        <div className="hidden lg:flex items-start gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-start flex-1">
              <motion.div
                className="flex flex-col items-center text-center gap-4 flex-1 px-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                {/* Number circle + connector row */}
                <div className="relative flex items-center w-full justify-center">
                  {/* Left connector */}
                  {i > 0 && (
                    <div className="absolute right-1/2 top-1/2 -translate-y-1/2 w-1/2 h-px bg-yellow-500/40" />
                  )}
                  {/* Right connector */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-1/2 h-px bg-yellow-500/40" />
                  )}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                    <span className="text-black font-bold text-lg">
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3 className="text-white text-base font-semibold">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex lg:hidden flex-col gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-4">
              {/* Left: number + vertical line */}
              <div className="flex flex-col items-center">
                <motion.div
                  className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center shrink-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <span className="text-black font-bold">{step.number}</span>
                </motion.div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-yellow-500/30 my-2" />
                )}
              </div>

              {/* Right: content */}
              <motion.div
                className="flex flex-col gap-1 pb-8"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-white font-semibold">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
