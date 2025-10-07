import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleHero from "@/components/SimpleHero";
import PropertiesGrid from "@/components/PropertiesGrid";
import SimpleFooter from "@/components/SimpleFooter";

export default function Page() {
  return (
    <div className="min-h-screen">
      <SimpleNavbar />
      <main>
        <SimpleHero />
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our premium real estate portfolio featuring the finest properties 
                across Egypt&apos;s most prestigious locations.
              </p>
            </div>
            <PropertiesGrid />
          </div>
        </section>
      </main>
      <SimpleFooter />
    </div>
  );
}
