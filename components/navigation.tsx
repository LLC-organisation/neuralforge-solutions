"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="Rychlo"
            width={80}
            height={80}
            className="rounded-md object-contain"
          />
          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg leading-tight">
              Rychlo
            </span>
            <span className="text-blue-400 text-xs font-medium">
              Build. Automate. Scale.
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleScroll(link.href)}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button size="sm" onClick={() => handleScroll("#contact")}>
            Book Free Consultation
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/98 border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleScroll(link.href)}
              className="text-white/70 hover:text-white text-left text-base font-medium transition-colors duration-200 py-1"
            >
              {link.label}
            </button>
          ))}
          <Button className="w-full mt-2" onClick={() => handleScroll("#contact")}>
            Book Free Consultation
          </Button>
        </div>
      )}
    </header>
  );
}
