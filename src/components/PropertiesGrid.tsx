"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import { Heart, MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PropertiesGrid() {
  const { projects, isLoading } = useProjects();
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.slice(0, 6).map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.gallery[0] || "/media/img/default-property.jpg"}
              alt={project.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(project.id)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <Heart 
                size={16} 
                className={`transition-colors ${
                  favorites.includes(project.id) ? "text-red-500 fill-red-500" : "text-gray-600"
                }`} 
              />
            </button>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
                {project.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
              {project.name}
            </h3>
            
            <div className="flex items-center gap-1 text-gray-600 mb-3">
              <MapPin size={14} />
              <span className="text-sm">{project.location}</span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Property Details */}
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
              {project.bedrooms && (
                <div className="flex items-center gap-1">
                  <Bed size={14} />
                  <span>{project.bedrooms}</span>
                </div>
              )}
              {project.bathrooms && (
                <div className="flex items-center gap-1">
                  <Bath size={14} />
                  <span>{project.bathrooms}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Square size={14} />
                <span>{project.area}</span>
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-orange-600">
                {project.price}
              </div>
              <Link
                href={`/properties/${project.slug}`}
                className="flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                View Details
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
