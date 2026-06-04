import { createCaseStudy } from "@/lib/actions/case-studies";
import { CaseStudyForm } from "@/components/forms/case-study-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCaseStudyPage() {
  return (
    <div className="p-8 max-w-2xl">
      <Link
        href="/admin/case-studies"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Case Studies
      </Link>

      <h1 className="text-white text-2xl font-semibold mb-8">New Case Study</h1>

      <CaseStudyForm action={createCaseStudy} submitLabel="Create Case Study" />
    </div>
  );
}
