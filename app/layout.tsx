import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://biashara-automation.com";

export const metadata: Metadata = {
  title: {
    default: "Biashara Automation | Business Automation Solutions",
    template: "%s | Biashara Automation",
  },
  description:
    "We help businesses eliminate repetitive work through intelligent automation solutions tailored to their needs. Tax automation, document processing, AI assistants, and more.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Biashara Automation | Business Automation Solutions",
    description:
      "Automate Your Business. Focus on Growth. Intelligent automation solutions for non-technical business owners.",
    url: siteUrl,
    siteName: "Biashara Automation",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biashara Automation | Business Automation Solutions",
    description:
      "Automate Your Business. Focus on Growth.",
  },
  keywords: [
    "AI Automation",
    "Business Automation",
    "Workflow Automation",
    "AI Consulting",
    "Digital Transformation",
    "Tax Automation",
    "Document Processing",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  );
}
