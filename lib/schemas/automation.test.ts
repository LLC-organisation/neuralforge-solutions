import { describe, it, expect } from "vitest";
import { automationSchema } from "./automation";

const valid = {
  fullName: "John Doe",
  companyName: "Tech Logistics Inc",
  email: "john@techlogistics.com",
  phone: "+1 555 0200",
  industry: "Logistics",
  existingSystems: "QuickBooks, Slack, Google Sheets, FedEx API",
  currentProcess:
    "Every morning, we manually export shipment data from FedEx and copy it into Google Sheets, then update QuickBooks.",
  painPoints:
    "The process takes 90 minutes daily, is error-prone, and delays our morning stand-up.",
  desiredAutomation:
    "Automatically sync shipment data from FedEx into Google Sheets and QuickBooks every morning at 7am.",
  estimatedMonthlyVolume: "~500 shipments/month",
};

describe("automationSchema", () => {
  it("accepts a fully valid automation request", () => {
    const result = automationSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects when required fields are missing", () => {
    const result = automationSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.fullName).toBeDefined();
      expect(errors.companyName).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.existingSystems).toBeDefined();
      expect(errors.currentProcess).toBeDefined();
      expect(errors.painPoints).toBeDefined();
      expect(errors.desiredAutomation).toBeDefined();
      expect(errors.estimatedMonthlyVolume).toBeDefined();
    }
  });

  it("rejects a malformed email address", () => {
    const result = automationSchema.safeParse({ ...valid, email: "bad-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("rejects currentProcess shorter than 10 characters", () => {
    const result = automationSchema.safeParse({ ...valid, currentProcess: "Short" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.currentProcess).toBeDefined();
    }
  });

  it("rejects painPoints shorter than 10 characters", () => {
    const result = automationSchema.safeParse({ ...valid, painPoints: "Hurts" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.painPoints).toBeDefined();
    }
  });

  it("rejects desiredAutomation shorter than 10 characters", () => {
    const result = automationSchema.safeParse({ ...valid, desiredAutomation: "Automate" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.desiredAutomation).toBeDefined();
    }
  });

  it("returns typed data on success", () => {
    const result = automationSchema.safeParse(valid);
    if (result.success) {
      expect(result.data.email).toBe(valid.email);
      expect(result.data.estimatedMonthlyVolume).toBe(valid.estimatedMonthlyVolume);
    }
  });
});
