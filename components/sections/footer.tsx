"use client";

import Image from "next/image";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-900 bg-black">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.jpeg"
              alt="Rychlo Technology Solutions"
              width={44}
              height={44}
              className="rounded-md object-cover"
            />
            <span className="text-white font-semibold">Rychlo Technology Solutions</span>
          </div>
          <span className="text-blue-400 text-xs font-medium ml-9">Build. Automate. Scale.</span>
        </div>

        <nav className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleScroll(link.href)}
              className="text-white/50 hover:text-white text-sm transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <p className="text-white/40 text-xs">
          &copy; 2025 Rychlo Technology Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
