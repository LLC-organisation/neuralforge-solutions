import prisma from "@/lib/prisma";
import { Download } from "lucide-react";
import Link from "next/link";

export default async function AutomationRequestsPage() {
  const rows = await prisma.automationRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold mb-1">Automation Requests</h1>
          <p className="text-zinc-400">{rows.length} total</p>
        </div>
        <Link
          href="/admin/automation-requests/export"
          className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm px-4 py-2 rounded-md transition-colors"
        >
          <Download size={15} />
          Export CSV
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-400">No automation requests yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <details
              key={row.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl group"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-zinc-800/50 rounded-xl transition-colors">
                <div>
                  <p className="text-white font-medium">{row.fullName}</p>
                  <p className="text-zinc-400 text-sm">{row.companyName} · {row.industry}</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-300 text-sm">{row.estimatedMonthlyVolume}</p>
                  <p className="text-zinc-500 text-xs">
                    {new Date(row.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </summary>

              <div className="px-5 pb-5 border-t border-zinc-800 pt-4 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-yellow-500 text-xs uppercase tracking-widest mb-1">Email</p>
                    <p className="text-white/80 text-sm">{row.email}</p>
                  </div>
                  <div>
                    <p className="text-yellow-500 text-xs uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-white/80 text-sm">{row.phone}</p>
                  </div>
                </div>
                {[
                  ["Existing Systems", row.existingSystems],
                  ["Current Process", row.currentProcess],
                  ["Pain Points", row.painPoints],
                  ["Desired Automation", row.desiredAutomation],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-yellow-500 text-xs uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-white/80 text-sm leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
