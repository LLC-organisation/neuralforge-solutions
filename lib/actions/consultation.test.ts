// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitConsultationRequest } from "./consultation";

vi.mock("@/lib/prisma", () => ({
  default: {
    consultationRequest: {
      create: vi.fn().mockResolvedValue({ id: "mock-id" }),
    },
  },
}));

vi.mock("@/lib/email", () => ({
  sendConsultationNotification: vi.fn().mockResolvedValue(undefined),
}));

const validPayload = {
  fullName: "Jane Smith",
  companyName: "Tech Co",
  email: "jane@techco.com",
  phone: "+1 555 0200",
  industry: "Technology",
  companySize: "11-50" as const,
  businessChallenge: "We spend too much time on repetitive data entry tasks every day.",
  desiredOutcome: "Automate our invoice processing so the team can focus on clients.",
};

describe("submitConsultationRequest", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns success for a valid payload", async () => {
    const result = await submitConsultationRequest(validPayload);
    expect(result.success).toBe(true);
  });

  it("writes to the database when payload is valid", async () => {
    const { default: prisma } = await import("@/lib/prisma");
    await submitConsultationRequest(validPayload);
    expect(prisma.consultationRequest.create).toHaveBeenCalledOnce();
    expect(prisma.consultationRequest.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ email: validPayload.email }),
    });
  });

  it("sends an email notification when payload is valid", async () => {
    const { sendConsultationNotification } = await import("@/lib/email");
    await submitConsultationRequest(validPayload);
    expect(sendConsultationNotification).toHaveBeenCalledOnce();
  });

  it("returns fieldErrors for an invalid email and does not write to DB", async () => {
    const { default: prisma } = await import("@/lib/prisma");
    const result = await submitConsultationRequest({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success && "fieldErrors" in result) {
      expect(result.fieldErrors?.email).toBeDefined();
    }
    expect(prisma.consultationRequest.create).not.toHaveBeenCalled();
  });

  it("returns fieldErrors for empty required fields and does not send email", async () => {
    const { sendConsultationNotification } = await import("@/lib/email");
    const result = await submitConsultationRequest({
      ...validPayload,
      fullName: "",
      companyName: "",
    });
    expect(result.success).toBe(false);
    expect(sendConsultationNotification).not.toHaveBeenCalled();
  });

  it("returns fieldErrors for businessChallenge that is too short", async () => {
    const result = await submitConsultationRequest({
      ...validPayload,
      businessChallenge: "Short",
    });
    expect(result.success).toBe(false);
    if (!result.success && "fieldErrors" in result) {
      expect(result.fieldErrors?.businessChallenge).toBeDefined();
    }
  });
});
