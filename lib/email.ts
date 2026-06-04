import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO = process.env.RESEND_TO_EMAIL ?? "team@biashara-automation.com";
const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@biashara-automation.com";

export async function sendConsultationNotification(data: {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  businessChallenge: string;
  desiredOutcome: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `New Consultation Request — ${data.companyName}`,
    text: `
New consultation request received.

Name: ${data.fullName}
Company: ${data.companyName}
Email: ${data.email}
Phone: ${data.phone}
Industry: ${data.industry}
Company Size: ${data.companySize}

Business Challenge:
${data.businessChallenge}

Desired Outcome:
${data.desiredOutcome}
    `.trim(),
  });
}

export async function sendAutomationRequestNotification(data: {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  industry: string;
  existingSystems: string;
  currentProcess: string;
  painPoints: string;
  desiredAutomation: string;
  estimatedMonthlyVolume: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `New Automation Request — ${data.companyName}`,
    text: `
New custom automation request received.

Name: ${data.fullName}
Company: ${data.companyName}
Email: ${data.email}
Phone: ${data.phone}
Industry: ${data.industry}
Estimated Monthly Volume: ${data.estimatedMonthlyVolume}

Existing Systems:
${data.existingSystems}

Current Process:
${data.currentProcess}

Pain Points:
${data.painPoints}

Desired Automation:
${data.desiredAutomation}
    `.trim(),
  });
}
