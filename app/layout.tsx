// @ts-ignore: CSS module side-effect import declaration
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ChatbotWidget } from "@/components/chatbot-widget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://rychlo.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rychlo Technology Solutions",
  url: siteUrl,
  logo: `${siteUrl}/logo.jpeg`,
  description:
    "Rychlo Technology Solutions delivers AI-powered automation, cybersecurity, and custom software that helps businesses eliminate manual work and scale with confidence.",
  foundingDate: "2024",
  founders: [
    { "@type": "Person", name: "Victor Kamiri" },
    { "@type": "Person", name: "Lee Haney" },
    { "@type": "Person", name: "George Akai" },
  ],
  sameAs: ["https://linkedin.com/in/george-akai"],
  serviceType: [
    "Workflow Automation",
    "AI Systems",
    "Cybersecurity",
    "Custom Software Development",
  ],
};

export const metadata = {
  title: {
    default: "Rychlo Technology Solutions",
    template: "%s | Rychlo",
  },
  icons: {
    icon: "/logo.jpeg",
  },
  description:
    "Rychlo Technology Solutions delivers AI-powered automation, cybersecurity, and custom software that helps businesses eliminate manual work and scale with confidence.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Rychlo Technology Solutions | AI & Automation Experts",
    description:
      "AI automation, cybersecurity, and custom software for growing businesses.",
    url: siteUrl,
    siteName: "Rychlo Technology Solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rychlo Technology Solutions | AI & Automation Experts",
    description: "Build. Automate. Scale.",
  },
  keywords: [
    "AI Automation",
    "Business Automation",
    "Cybersecurity",
    "AI Consulting",
    "Digital Transformation",
    "Workflow Automation",
    "Custom Software",
    "Rychlo Technology",
    "East Africa Tech",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <ChatbotWidget />
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  );
}
