import { caseStudies as caseStudyQueries } from "@/lib/queries/case-studies";
import { notFound } from "next/navigation";
import { updateCaseStudy } from "@/lib/actions/case-studies";
import { CaseStudyForm } from "@/components/forms/case-study-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const study = await caseStudyQueries.getById(id);
  if (!study) notFound();

  const action = updateCaseStudy.bind(null, id);

  return (
    <div className="p-8 max-w-2xl">
      <Link
        href="/admin/case-studies"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Case Studies
      </Link>

      <h1 className="text-white text-2xl font-semibold mb-8">Edit Case Study</h1>

      <CaseStudyForm
        action={action}
        defaultValues={{
          clientProblem: study.clientProblem,
          solution: study.solution,
          results: study.results,
          industry: study.industry,
          companySize: study.companySize,
          published: study.published,
        }}
        submitLabel="Save Changes"
      />
    </div>
  );
}
