import CleanNavbar from "@/components/CleanNavbar";
import SimpleHero from "@/components/SimpleHero";
import SimpleAbout from "@/components/SimpleAbout";
import PropertiesTable from "@/components/PropertiesTable";
import SimpleContact from "@/components/SimpleContact";
import SimpleFooter from "@/components/SimpleFooter";
import FeatureCards from "@/components/FeatureCards";

export default function Page() {
  return (
    <div className="min-h-screen">
      <CleanNavbar />
      <main>
        <SimpleHero />
        <FeatureCards />
        <SimpleAbout />
        <PropertiesTable />
        <SimpleContact />
      </main>
      <SimpleFooter />
    </div>
  );
}
