"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CaseStudyFormState } from "@/lib/actions/case-studies";
import Link from "next/link";

interface CaseStudyFormProps {
  action: (state: CaseStudyFormState, formData: FormData) => Promise<CaseStudyFormState>;
  defaultValues?: {
    clientProblem?: string;
    solution?: string;
    results?: string;
    industry?: string | null;
    companySize?: string | null;
    published?: boolean;
  };
  submitLabel?: string;
}

export function CaseStudyForm({ action, defaultValues, submitLabel = "Save" }: CaseStudyFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="clientProblem">Client Problem *</Label>
        <Textarea
          id="clientProblem"
          name="clientProblem"
          rows={4}
          required
          defaultValue={defaultValues?.clientProblem ?? ""}
          className="resize-y"
        />
        {state?.fieldErrors?.clientProblem && (
          <p className="text-red-400 text-sm">{state.fieldErrors.clientProblem[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="solution">Solution *</Label>
        <Textarea
          id="solution"
          name="solution"
          rows={4}
          required
          defaultValue={defaultValues?.solution ?? ""}
          className="resize-y"
        />
        {state?.fieldErrors?.solution && (
          <p className="text-red-400 text-sm">{state.fieldErrors.solution[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="results">Results *</Label>
        <Textarea
          id="results"
          name="results"
          rows={3}
          required
          defaultValue={defaultValues?.results ?? ""}
          className="resize-y"
        />
        {state?.fieldErrors?.results && (
          <p className="text-red-400 text-sm">{state.fieldErrors.results[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="industry">Industry (optional)</Label>
          <Input
            id="industry"
            name="industry"
            placeholder="e.g. Healthcare"
            defaultValue={defaultValues?.industry ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companySize">Company Size (optional)</Label>
          <Input
            id="companySize"
            name="companySize"
            placeholder="e.g. 11-50"
            defaultValue={defaultValues?.companySize ?? ""}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="published"
          name="published"
          value="true"
          defaultChecked={defaultValues?.published ?? false}
          className="accent-yellow-500 w-4 h-4"
        />
        <Label htmlFor="published" className="cursor-pointer">
          Published (visible on the public site)
        </Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
        <Link href="/admin/case-studies">
          <Button type="button" variant="ghost" disabled={pending}>
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
