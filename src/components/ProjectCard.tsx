'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project, getCategoryColor, getCategoryIcon, formatPrice } from '@/lib/api';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <div className="card group cursor-pointer hover:shadow-large transition-all duration-300">
      <div className="relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
        )}
        
        {!imageError && project.gallery[0] ? (
          <Image
            src={project.gallery[0]}
            alt={project.name}
            width={400}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={false}
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">🏠</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
            <span className="mr-1">{getCategoryIcon(project.category)}</span>
            {project.category}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {project.status}
          </span>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link
            href={`/projects/${project.slug}`}
            className="btn btn-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="card-body">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
            <Link href={`/projects/${project.slug}`}>
              {project.name}
            </Link>
          </h3>
          
          <div className="flex items-center text-gray-600 mb-2">
            <span className="text-sm">📍</span>
            <span className="ml-1 text-sm">{project.location}</span>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            {project.area && (
              <div className="flex items-center">
                <span className="mr-1">📐</span>
                <span>{project.area} sq ft</span>
              </div>
            )}
            {project.bedrooms !== 'N/A' && (
              <div className="flex items-center">
                <span className="mr-1">🛏️</span>
                <span>{project.bedrooms}</span>
              </div>
            )}
            {project.bathrooms !== 'N/A' && (
              <div className="flex items-center">
                <span className="mr-1">🚿</span>
                <span>{project.bathrooms}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-primary-600">
            {formatPrice(project.price)}
          </div>
          
          <Link
            href={`/projects/${project.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
}
