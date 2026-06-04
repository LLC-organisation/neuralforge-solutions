import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { CapabilitiesSection } from "@/components/sections/capabilities";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <CapabilitiesSection />
        <HowItWorksSection />
        <WhyChooseUsSection />
        <CaseStudiesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
