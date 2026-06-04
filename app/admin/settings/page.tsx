import prisma from "@/lib/prisma";
import { updateSiteSettings } from "@/lib/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton" },
    update: {},
  });

  const fields: { id: keyof typeof settings; label: string; placeholder: string }[] = [
    { id: "email", label: "Email Address", placeholder: "hello@biashara-automation.com" },
    { id: "whatsapp", label: "WhatsApp URL", placeholder: "https://wa.me/1234567890" },
    { id: "telegram", label: "Telegram URL", placeholder: "https://t.me/yourhandle" },
    { id: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/company/..." },
    { id: "instagram", label: "Instagram URL", placeholder: "https://instagram.com/..." },
    { id: "twitter", label: "X (Twitter) URL", placeholder: "https://x.com/..." },
    { id: "facebook", label: "Facebook URL", placeholder: "https://facebook.com/..." },
  ];

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-white text-2xl font-semibold mb-2">Settings</h1>
      <p className="text-zinc-400 mb-8">
        Update social links displayed in the Contact section. Leave blank to hide a channel.
      </p>

      <form action={updateSiteSettings} className="space-y-5">
        {fields.map(({ id, label, placeholder }) => (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
              id={id}
              name={id}
              type={id === "email" ? "email" : "url"}
              placeholder={placeholder}
              defaultValue={(settings[id] as string | null) ?? ""}
            />
          </div>
        ))}

        <Button type="submit" className="mt-2">Save Settings</Button>
      </form>
    </div>
  );
}
