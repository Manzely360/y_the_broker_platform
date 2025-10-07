"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import { Property } from "@/types/property";
import { Heart, MapPin, Bed, Bath, Square, ArrowRight, Filter, Grid, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleFooter from "@/components/SimpleFooter";

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const { projects, isLoading } = useProjects();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "",
    location: searchParams.get("location") || "",
    price: searchParams.get("price") || "",
    search: searchParams.get("q") || "",
  });

  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    let filtered = projects;

    if (filters.search) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(project =>
        project.category.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.location) {
      filtered = filtered.filter(project =>
        project.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [projects, filters]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const PropertyCard = ({ project, index }: { project: Property; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${viewMode === "list" ? "w-1/3 h-48" : "h-48"}`}>
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
      <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
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
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNavbar />
      
      <main className="pt-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Properties for Sale
            </h1>
            <p className="text-gray-600">
              {filteredProjects.length} properties found
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </h3>
                
                <div className="space-y-4">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search
                    </label>
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      placeholder="Search properties..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">All Types</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="coastal">Coastal</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <select
                      value={filters.location}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">All Locations</option>
                      <option value="New Cairo">New Cairo</option>
                      <option value="6 October City">6 October City</option>
                      <option value="North Coast">North Coast</option>
                      <option value="Sharm El Sheikh">Sharm El Sheikh</option>
                      <option value="Hurghada">Hurghada</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="lg:w-3/4">
              {/* View Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-gray-600">
                  Showing {filteredProjects.length} properties
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid" ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list" ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              {/* Properties */}
              {isLoading ? (
                <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
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
              ) : (
                <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                  {filteredProjects.map((project, index) => (
                    <PropertyCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              )}

              {filteredProjects.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg mb-4">No properties found</div>
                  <p className="text-gray-400">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SimpleFooter />
    </div>
  );
}
