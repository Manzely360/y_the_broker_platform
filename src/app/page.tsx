import AdvancedNavbar from "@/components/AdvancedNavbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen">
      <AdvancedNavbar />
      <main>
        <HeroSection />
        <FeaturedProperties />
        <StatsSection />
        <TestimonialsSection />
        <PartnersSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
