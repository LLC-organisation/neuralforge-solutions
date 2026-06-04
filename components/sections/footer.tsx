"use client";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
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
        {/* Logo + tagline */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <span className="text-black font-bold text-xs">B</span>
            </div>
            <span className="text-white font-semibold">
              Biashara Automation
            </span>
          </div>
          <span className="text-yellow-500 text-xs font-medium ml-9">
            Automate. Grow. Thrive.
          </span>
        </div>

        {/* Nav links */}
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

        {/* Copyright */}
        <p className="text-white/40 text-xs">
          &copy; 2025 Biashara Automation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
