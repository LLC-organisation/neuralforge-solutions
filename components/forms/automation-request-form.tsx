"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";
import { automationSchema, type AutomationFormData } from "@/lib/schemas/automation";
import { submitAutomationRequest } from "@/lib/actions/automation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function AutomationRequestForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AutomationFormData>({
    resolver: zodResolver(automationSchema),
  });

  const onSubmit = async (data: AutomationFormData) => {
    const result = await submitAutomationRequest(data);
    if (result.success) {
      setSubmitted(true);
    } else if ("error" in result && result.error) {
      toast.error(result.error);
    } else {
      toast.error("Please check the form for errors and try again.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle className="text-yellow-500 mb-4" size={56} />
        <h3 className="text-white text-2xl font-semibold mb-2">Request Received!</h3>
        <p className="text-white/70 max-w-md">
          Thank you for the detailed request. Our team will review your workflow and get back to you within 2 business days with a proposal.
        </p>
      </div>
    );
  }

  const field = (
    id: keyof AutomationFormData,
    label: string,
    placeholder: string,
    type: "input" | "textarea" = "input",
    inputType = "text"
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label} *</Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          rows={4}
          placeholder={placeholder}
          aria-describedby={errors[id] ? `${id}-error` : undefined}
          aria-invalid={!!errors[id]}
          {...register(id)}
        />
      ) : (
        <Input
          id={id}
          type={inputType}
          placeholder={placeholder}
          aria-describedby={errors[id] ? `${id}-error` : undefined}
          aria-invalid={!!errors[id]}
          {...register(id)}
        />
      )}
      {errors[id] && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-400">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {field("fullName", "Full Name", "Jane Smith")}
        {field("companyName", "Company Name", "Acme Corp")}
        {field("email", "Email Address", "jane@acme.com", "input", "email")}
        {field("phone", "Phone Number", "+1 555 0100", "input", "tel")}
        {field("industry", "Industry", "e.g. Healthcare, Logistics, Finance")}
        {field("estimatedMonthlyVolume", "Estimated Monthly Volume", "e.g. ~500 invoices/month")}
      </div>

      {field(
        "existingSystems",
        "Existing Systems",
        "List the software and tools your team currently uses (e.g. QuickBooks, Slack, Salesforce)...",
        "textarea"
      )}

      {field(
        "currentProcess",
        "Current Process",
        "Walk us through the manual steps your team does today, step by step...",
        "textarea"
      )}

      {field(
        "painPoints",
        "Pain Points",
        "What is slow, expensive, error-prone, or frustrating about the current process?",
        "textarea"
      )}

      {field(
        "desiredAutomation",
        "Desired Automation",
        "Describe what you want to happen automatically. Be as specific as possible...",
        "textarea"
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Submitting...
          </>
        ) : (
          "Submit Automation Request"
        )}
      </Button>
    </form>
  );
}
