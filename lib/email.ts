import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.RESEND_TO_EMAIL ?? "team@rychlo.tech";
const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@rychlo.tech";

type ConsultationData = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
};

type AutomationData = ConsultationData & {
  industry: string;
  existingSystems: string;
  currentProcess: string;
  painPoints: string;
  desiredAutomation: string;
  estimatedMonthlyVolume: string;
};

const templates = {
  consultation: {
    subject: (d: ConsultationData) =>
      `New Lead — ${d.fullName} (${d.companyName})`,
    text: (d: ConsultationData) =>
      `New consultation lead received.\n\nName:    ${d.fullName}\nCompany: ${d.companyName}\nEmail:   ${d.email}\nPhone:   ${d.phone}`,
  },
  automation: {
    subject: (d: AutomationData) =>
      `New Automation Request — ${d.companyName}`,
    text: (d: AutomationData) =>
      [
        "New custom automation request received.",
        "",
        `Name:    ${d.fullName}`,
        `Company: ${d.companyName}`,
        `Email:   ${d.email}`,
        `Phone:   ${d.phone}`,
        `Industry: ${d.industry}`,
        `Estimated Monthly Volume: ${d.estimatedMonthlyVolume}`,
        "",
        "Existing Systems:",
        d.existingSystems,
        "",
        "Current Process:",
        d.currentProcess,
        "",
        "Pain Points:",
        d.painPoints,
        "",
        "Desired Automation:",
        d.desiredAutomation,
      ].join("\n"),
  },
};

async function send(subject: string, text: string) {
  await resend.emails.send({ from: FROM, to: TO, subject, text });
}

export async function sendConsultationNotification(data: ConsultationData) {
  const t = templates.consultation;
  await send(t.subject(data), t.text(data));
}

export async function sendAutomationRequestNotification(data: AutomationData) {
  const t = templates.automation;
  await send(t.subject(data), t.text(data));
}
