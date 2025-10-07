'use client';

import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from './ProjectCard';
import Link from 'next/link';

export function FeaturedProjects() {
  const { projects, isLoading, error } = useProjects({ limit: 6 });

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-600 mb-8">
              Discover our premium real estate portfolio
            </p>
            <div className="text-red-600">
              Failed to load projects. Please try again later.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium real estate portfolio featuring the finest properties 
            across Egypt&apos;s most prestigious locations.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/projects"
                className="btn btn-primary text-lg px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
              >
                View All Projects
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
