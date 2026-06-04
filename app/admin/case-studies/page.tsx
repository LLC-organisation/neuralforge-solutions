import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { toggleCaseStudyPublished } from "@/lib/actions/case-studies";
import { Badge } from "@/components/ui/badge";
import { DeleteCaseStudyButton } from "@/components/admin/delete-case-study-button";

export default async function CaseStudiesAdminPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold mb-1">Case Studies</h1>
          <p className="text-zinc-400">{caseStudies.length} total</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={15} />
          New Case Study
        </Link>
      </div>

      {caseStudies.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-400 mb-4">No case studies yet.</p>
          <Link
            href="/admin/case-studies/new"
            className="text-yellow-500 hover:text-yellow-400 text-sm"
          >
            Add your first case study →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={study.published ? "default" : "secondary"}>
                    {study.published ? "Published" : "Draft"}
                  </Badge>
                  {study.industry && <Badge variant="outline">{study.industry}</Badge>}
                </div>
                <p className="text-white text-sm font-medium line-clamp-2">
                  {study.clientProblem.slice(0, 120)}...
                </p>
                <p className="text-zinc-500 text-xs mt-1">
                  {new Date(study.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <form action={toggleCaseStudyPublished.bind(null, study.id, !study.published)}>
                  <button
                    type="submit"
                    className="text-xs text-zinc-400 hover:text-yellow-500 px-3 py-1.5 rounded border border-zinc-700 hover:border-yellow-500/50 transition-colors"
                  >
                    {study.published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <Link
                  href={`/admin/case-studies/${study.id}/edit`}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                  aria-label="Edit case study"
                >
                  <Pencil size={15} />
                </Link>
                <DeleteCaseStudyButton id={study.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
