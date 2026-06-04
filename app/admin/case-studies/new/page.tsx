import { createCaseStudy } from "@/lib/actions/case-studies";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

      <form action={createCaseStudy} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="clientProblem">Client Problem *</Label>
          <Textarea id="clientProblem" name="clientProblem" rows={4} required className="resize-y" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="solution">Solution *</Label>
          <Textarea id="solution" name="solution" rows={4} required className="resize-y" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="results">Results *</Label>
          <Textarea id="results" name="results" rows={3} required className="resize-y" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="industry">Industry (optional)</Label>
            <Input id="industry" name="industry" placeholder="e.g. Healthcare" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size (optional)</Label>
            <Input id="companySize" name="companySize" placeholder="e.g. 11-50" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            name="published"
            value="true"
            className="accent-yellow-500 w-4 h-4"
          />
          <Label htmlFor="published" className="cursor-pointer">
            Publish immediately (visible on the public site)
          </Label>
        </div>
        <div className="flex gap-3">
          <Button type="submit">Create Case Study</Button>
          <Link href="/admin/case-studies">
            <Button type="button" variant="ghost">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
