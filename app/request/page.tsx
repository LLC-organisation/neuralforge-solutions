import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AutomationRequestForm } from "@/components/forms/automation-request-form";

export const metadata: Metadata = {
  title: "Submit Automation Request",
  description:
    "Tell us about the workflow you want to automate. The more detail you share, the better our proposal will be.",
};

export default function RequestPage() {
  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        <div className="mb-10">
          <h1 className="text-white text-3xl md:text-4xl font-semibold mb-3">
            Submit an Automation Request
          </h1>
          <p className="text-white/70 text-lg">
            Tell us exactly what you want automated. The more detail you share,
            the more precise our proposal will be. We'll get back to you within 2 business days.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
          <AutomationRequestForm />
        </div>
      </div>
    </div>
  );
}
