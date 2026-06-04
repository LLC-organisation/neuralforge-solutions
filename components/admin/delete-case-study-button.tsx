"use client";

import { deleteCaseStudy } from "@/lib/actions/case-studies";
import { Trash2 } from "lucide-react";

export function DeleteCaseStudyButton({ id }: { id: string }) {
  const action = deleteCaseStudy.bind(null, id);

  return (
    <form action={action}>
      <button
        type="submit"
        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-md transition-colors"
        aria-label="Delete case study"
        onClick={(e) => {
          if (!confirm("Delete this case study? This cannot be undone.")) {
            e.preventDefault();
          }
        }}
      >
        <Trash2 size={15} />
      </button>
    </form>
  );
}
