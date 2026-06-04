"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";
import { consultationSchema, COMPANY_SIZES, type ConsultationFormData } from "@/lib/schemas/consultation";
import { submitConsultationRequest } from "@/lib/actions/consultation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
  });

  const onSubmit = async (data: ConsultationFormData) => {
    const result = await submitConsultationRequest(data);
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
          Thank you for reaching out. We'll be in touch within 1 business day to schedule your consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="Jane Smith"
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p id="fullName-error" role="alert" className="text-sm text-red-400">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            placeholder="Acme Corp"
            aria-describedby={errors.companyName ? "companyName-error" : undefined}
            aria-invalid={!!errors.companyName}
            {...register("companyName")}
          />
          {errors.companyName && (
            <p id="companyName-error" role="alert" className="text-sm text-red-400">
              {errors.companyName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@acme.com"
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 555 0100"
            aria-describedby={errors.phone ? "phone-error" : undefined}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="text-sm text-red-400">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry *</Label>
          <Input
            id="industry"
            placeholder="e.g. Healthcare, Logistics, Finance"
            aria-describedby={errors.industry ? "industry-error" : undefined}
            aria-invalid={!!errors.industry}
            {...register("industry")}
          />
          {errors.industry && (
            <p id="industry-error" role="alert" className="text-sm text-red-400">
              {errors.industry.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companySize">Company Size *</Label>
          <Select
            onValueChange={(val) => setValue("companySize", val as ConsultationFormData["companySize"], { shouldValidate: true })}
            value={watch("companySize")}
          >
            <SelectTrigger
              id="companySize"
              aria-describedby={errors.companySize ? "companySize-error" : undefined}
              aria-invalid={!!errors.companySize}
            >
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {COMPANY_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size} employees
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.companySize && (
            <p id="companySize-error" role="alert" className="text-sm text-red-400">
              {errors.companySize.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessChallenge">Business Challenge *</Label>
        <Textarea
          id="businessChallenge"
          rows={4}
          placeholder="Describe the repetitive tasks or business problems you want to solve..."
          aria-describedby={errors.businessChallenge ? "businessChallenge-error" : undefined}
          aria-invalid={!!errors.businessChallenge}
          {...register("businessChallenge")}
        />
        {errors.businessChallenge && (
          <p id="businessChallenge-error" role="alert" className="text-sm text-red-400">
            {errors.businessChallenge.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="desiredOutcome">Desired Outcome *</Label>
        <Textarea
          id="desiredOutcome"
          rows={4}
          placeholder="What does success look like? What would change if this problem was solved?"
          aria-describedby={errors.desiredOutcome ? "desiredOutcome-error" : undefined}
          aria-invalid={!!errors.desiredOutcome}
          {...register("desiredOutcome")}
        />
        {errors.desiredOutcome && (
          <p id="desiredOutcome-error" role="alert" className="text-sm text-red-400">
            {errors.desiredOutcome.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Submitting...
          </>
        ) : (
          "Request Consultation"
        )}
      </Button>
    </form>
  );
}
