import { describe, it, expect } from "vitest";
import { consultationSchema } from "./consultation";

const valid = {
  fullName: "Jane Smith",
  companyName: "Acme Corp",
  email: "jane@acme.com",
  phone: "+1 555 0100",
  industry: "Healthcare",
  companySize: "11-50",
  businessChallenge: "We spend 20 hours per week on manual data entry into our CRM.",
  desiredOutcome: "Automate data entry so the team can focus on client relationships.",
};

describe("consultationSchema", () => {
  it("accepts a fully valid consultation request", () => {
    const result = consultationSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects when required fields are missing", () => {
    const result = consultationSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.fullName).toBeDefined();
      expect(errors.companyName).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.phone).toBeDefined();
      expect(errors.industry).toBeDefined();
      expect(errors.businessChallenge).toBeDefined();
      expect(errors.desiredOutcome).toBeDefined();
    }
  });

  it("rejects a malformed email address", () => {
    const result = consultationSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("rejects empty strings for required text fields", () => {
    const result = consultationSchema.safeParse({
      ...valid,
      fullName: "",
      companyName: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.fullName).toBeDefined();
      expect(errors.companyName).toBeDefined();
    }
  });

  it("rejects an invalid companySize value", () => {
    const result = consultationSchema.safeParse({ ...valid, companySize: "not-a-size" });
    expect(result.success).toBe(false);
  });

  it("accepts all valid companySize enum values", () => {
    const sizes = ["1-10", "11-50", "51-200", "200+"] as const;
    for (const size of sizes) {
      const result = consultationSchema.safeParse({ ...valid, companySize: size });
      expect(result.success).toBe(true);
    }
  });

  it("rejects businessChallenge shorter than 10 characters", () => {
    const result = consultationSchema.safeParse({ ...valid, businessChallenge: "Too short" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.businessChallenge).toBeDefined();
    }
  });

  it("rejects desiredOutcome shorter than 10 characters", () => {
    const result = consultationSchema.safeParse({ ...valid, desiredOutcome: "Short" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.desiredOutcome).toBeDefined();
    }
  });

  it("returns typed data on success", () => {
    const result = consultationSchema.safeParse(valid);
    if (result.success) {
      expect(result.data.email).toBe(valid.email);
      expect(result.data.companySize).toBe("11-50");
    }
  });
});
