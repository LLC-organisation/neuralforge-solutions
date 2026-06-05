import {
  Mail,
  MessageCircle,
  Send,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import { ConsultationForm } from "@/components/forms/consultation-form";
import prisma from "@/lib/prisma";

async function getSiteSettings() {
  try {
    return await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  } catch {
    return null;
  }
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-blue-500/50 hover:text-blue-400 text-white/70 transition-all duration-300 group"
    >
      <span className="text-blue-400 group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}

export async function ContactSection() {
  const settings = await getSiteSettings();

  const socialLinks = [
    settings?.email && {
      href: `mailto:${settings.email}`,
      icon: <Mail size={20} />,
      label: "Email Us",
    },
    settings?.whatsapp && {
      href: settings.whatsapp,
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
    },
    settings?.telegram && {
      href: settings.telegram,
      icon: <Send size={20} />,
      label: "Telegram",
    },
    settings?.linkedin && {
      href: settings.linkedin,
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
    },
    settings?.instagram && {
      href: settings.instagram,
      icon: <Instagram size={20} />,
      label: "Instagram",
    },
    settings?.twitter && {
      href: settings.twitter,
      icon: <Twitter size={20} />,
      label: "X (Twitter)",
    },
    settings?.facebook && {
      href: settings.facebook,
      icon: <Facebook size={20} />,
      label: "Facebook",
    },
  ].filter(Boolean) as SocialLinkProps[];

  return (
    <section id="contact" className="py-24 bg-black">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white mb-4">Let's Talk</h2>
            <p className="text-white/70 text-lg">
              Tell us what's taking up too much of your team's time. We'll figure out together whether we can help.
            </p>
          </div>

          {socialLinks.length > 0 && (
            <div className="mb-16">
              <h3 className="text-white/60 text-sm uppercase tracking-widest mb-6 text-center">
                Reach us on
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {socialLinks.map((link) => (
                  <SocialLink key={link.label} {...link} />
                ))}
              </div>
            </div>
          )}

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <h3 className="text-white text-2xl font-semibold mb-2">Book a Free Consultation</h3>
            <p className="text-white/60 mb-8">
              Fill in your details and we'll get back to you within one business day to schedule a call.
            </p>
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
