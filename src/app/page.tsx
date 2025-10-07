import { Hero } from '@/components/Hero';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { QuickSearch } from '@/components/QuickSearch';
import { Partners } from '@/components/Partners';
import { Stats } from '@/components/Stats';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Quick Search */}
      <QuickSearch />
      
      {/* Featured Projects */}
      <FeaturedProjects />
      
      {/* Stats Section */}
      <Stats />
      
      {/* Partners Section */}
      <Partners />
    </div>
  );
}