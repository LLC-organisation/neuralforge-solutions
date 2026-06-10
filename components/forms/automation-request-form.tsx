"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";
import { submitAutomationRequest } from "@/lib/actions/automation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function AutomationRequestForm() {
  const [state, formAction, isPending] = useActionState(
    submitAutomationRequest,
    {}
  );

  useEffect(() => {
    if (state.error) toast.error(state.error);
  }, [state.error]);

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle className="text-blue-500 mb-4" size={56} />
        <h3 className="text-white text-2xl font-semibold mb-2">Request Received!</h3>
        <p className="text-white/70 max-w-md">
          Thank you for the detailed request. Our team will review your workflow and get back to you within 2 business days with a proposal.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" name="fullName" placeholder="Jane Smith" />
          {state.fieldErrors?.fullName?.[0] && (
            <p role="alert" className="text-sm text-red-400">{state.fieldErrors.fullName[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input id="companyName" name="companyName" placeholder="Acme Corp" />
          {state.fieldErrors?.companyName?.[0] && (
            <p role="alert" className="text-sm text-red-400">{state.fieldErrors.companyName[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" name="email" type="email" placeholder="jane@acme.com" />
          {state.fieldErrors?.email?.[0] && (
            <p role="alert" className="text-sm text-red-400">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+1 555 0100" />
          {state.fieldErrors?.phone?.[0] && (
            <p role="alert" className="text-sm text-red-400">{state.fieldErrors.phone[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry *</Label>
          <Input id="industry" name="industry" placeholder="e.g. Healthcare, Logistics, Finance" />
          {state.fieldErrors?.industry?.[0] && (
            <p role="alert" className="text-sm text-red-400">{state.fieldErrors.industry[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimatedMonthlyVolume">Estimated Monthly Volume *</Label>
          <Input id="estimatedMonthlyVolume" name="estimatedMonthlyVolume" placeholder="e.g. ~500 invoices/month" />
          {state.fieldErrors?.estimatedMonthlyVolume?.[0] && (
            <p role="alert" className="text-sm text-red-400">{state.fieldErrors.estimatedMonthlyVolume[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="existingSystems">Existing Systems *</Label>
        <Textarea
          id="existingSystems"
          name="existingSystems"
          rows={4}
          placeholder="List the software and tools your team currently uses (e.g. QuickBooks, Slack, Salesforce)..."
        />
        {state.fieldErrors?.existingSystems?.[0] && (
          <p role="alert" className="text-sm text-red-400">{state.fieldErrors.existingSystems[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentProcess">Current Process *</Label>
        <Textarea
          id="currentProcess"
          name="currentProcess"
          rows={4}
          placeholder="Walk us through the manual steps your team does today, step by step..."
        />
        {state.fieldErrors?.currentProcess?.[0] && (
          <p role="alert" className="text-sm text-red-400">{state.fieldErrors.currentProcess[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="painPoints">Pain Points *</Label>
        <Textarea
          id="painPoints"
          name="painPoints"
          rows={4}
          placeholder="What is slow, expensive, error-prone, or frustrating about the current process?"
        />
        {state.fieldErrors?.painPoints?.[0] && (
          <p role="alert" className="text-sm text-red-400">{state.fieldErrors.painPoints[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="desiredAutomation">Desired Automation *</Label>
        <Textarea
          id="desiredAutomation"
          name="desiredAutomation"
          rows={4}
          placeholder="Describe what you want to happen automatically. Be as specific as possible..."
        />
        {state.fieldErrors?.desiredAutomation?.[0] && (
          <p role="alert" className="text-sm text-red-400">{state.fieldErrors.desiredAutomation[0]}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        {isPending ? (
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
