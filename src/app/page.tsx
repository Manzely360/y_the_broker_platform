import ProfessionalNavbar from "@/components/ProfessionalNavbar";
import UltraAdvancedHero from "@/components/UltraAdvancedHero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import ProfessionalPropertiesGrid from "@/components/ProfessionalPropertiesGrid";
import ProfessionalFooter from "@/components/ProfessionalFooter";

export default function Page() {
  return (
    <div className="min-h-screen">
      <ProfessionalNavbar />
      <main>
        <UltraAdvancedHero />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our premium real estate portfolio featuring the finest
                properties across Egypt&apos;s most prestigious locations.
              </p>
            </div>
            <ProfessionalPropertiesGrid />
          </div>
        </section>
        <ContactSection />
      </main>
      <ProfessionalFooter />
    </div>
  );
}
