"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";
import { submitConsultationRequest } from "@/lib/actions/consultation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ConsultationForm() {
  const [state, formAction, isPending] = useActionState(
    submitConsultationRequest,
    {}
  );

  useEffect(() => {
    if (state.error) toast.error(state.error);
  }, [state.error]);

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle className="text-blue-400 mb-4" size={56} />
        <h3 className="text-white text-2xl font-semibold mb-2">We'll be in touch!</h3>
        <p className="text-white/70 max-w-md">
          Thanks for reaching out. Our team will contact you within 1 business day to discuss your needs.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" name="fullName" placeholder="Jane Smith" />
          {state.fieldErrors?.fullName?.[0] && (
            <p role="alert" className="text-sm text-red-400">
              {state.fieldErrors.fullName[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input id="companyName" name="companyName" placeholder="Acme Corp" />
          {state.fieldErrors?.companyName?.[0] && (
            <p role="alert" className="text-sm text-red-400">
              {state.fieldErrors.companyName[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" name="email" type="email" placeholder="jane@acme.com" />
          {state.fieldErrors?.email?.[0] && (
            <p role="alert" className="text-sm text-red-400">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+254 700 000 000" />
          {state.fieldErrors?.phone?.[0] && (
            <p role="alert" className="text-sm text-red-400">
              {state.fieldErrors.phone[0]}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Sending...
          </>
        ) : (
          "Book Free Consultation"
        )}
      </Button>
    </form>
  );
}
