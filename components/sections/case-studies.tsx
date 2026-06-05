import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";

async function getPublishedCaseStudies() {
  try {
    return await prisma.caseStudy.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function CaseStudiesSection() {
  const caseStudies = await getPublishedCaseStudies();

  if (caseStudies.length === 0) return null;

  return (
    <section id="case-studies" className="py-24 bg-zinc-950">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-white mb-4">Success Stories</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Real businesses, real results. Here's what automation has done for our clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex gap-2 mb-4 flex-wrap">
                {study.industry && (
                  <Badge variant="secondary">{study.industry}</Badge>
                )}
                {study.companySize && (
                  <Badge variant="outline">{study.companySize} employees</Badge>
                )}
              </div>

              <div className="mb-4">
                <h4 className="text-blue-400 text-xs uppercase tracking-widest mb-2 font-semibold">
                  The Challenge
                </h4>
                <p className="text-white/80 text-sm leading-relaxed line-clamp-4">
                  {study.clientProblem}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-blue-400 text-xs uppercase tracking-widest mb-2 font-semibold">
                  Our Solution
                </h4>
                <p className="text-white/80 text-sm leading-relaxed line-clamp-4">
                  {study.solution}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-zinc-800">
                <h4 className="text-blue-400 text-xs uppercase tracking-widest mb-2 font-semibold">
                  Results
                </h4>
                <p className="text-white font-medium text-sm leading-relaxed">
                  {study.results}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
