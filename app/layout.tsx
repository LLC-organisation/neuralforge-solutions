// @ts-ignore: CSS module side-effect import declaration
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://amek.tech";

export const metadata = {
  title: {
    default: "Rychlo",
    template: "%s | Rychlo",
  },
  icons: {
    icon: "/logo.jpeg",
  },
  description:
    "Rychlo Technology Solutions delivers AI-powered automation, cybersecurity, and custom software that helps businesses eliminate manual work and scale with confidence.",
  metadataBase: new URL(siteUrl),
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
