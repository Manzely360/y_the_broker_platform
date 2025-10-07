"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  ArrowRight, 
  Eye,
  Share2,
  Star,
  Calendar,
  Building2,
  Car,
  TreePine,
  Shield,
  Wifi,
  Maximize,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import Tilt from "react-parallax-tilt";

export default function ProfessionalPropertiesGrid() {
  const { projects, isLoading } = useProjects();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const openQuickView = (property: any) => {
    setSelectedProperty(property);
    setIsQuickViewOpen(true);
  };

  const features = [
    { icon: Wifi, label: "High-Speed Internet" },
    { icon: Car, label: "Parking Space" },
    { icon: TreePine, label: "Garden" },
    { icon: Shield, label: "Security System" },
    { icon: Building2, label: "Modern Design" },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
          >
            <div className="w-full h-64 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.slice(0, 6).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              transitionEasing="cubic-bezier(.03,.98,.52,.99)"
              transitionDuration={400}
              scale={1.02}
              className="h-full"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group h-full flex flex-col">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.gallery[0] || "/media/img/default-property.jpg"}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <Button
                            size="icon"
                            variant="secondary"
                            onClick={() => toggleFavorite(project.id)}
                            className="w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm"
                          >
                            <Heart 
                              size={18} 
                              className={`transition-colors ${
                                favorites.includes(project.id) ? "text-red-500 fill-red-500" : "text-gray-600"
                              }`} 
                            />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          <p>Add to favorites</p>
                        </Tooltip.Content>
                      </Tooltip.Root>
                    </Tooltip.Provider>

                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <Button
                            size="icon"
                            variant="secondary"
                            onClick={() => openQuickView(project)}
                            className="w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm"
                          >
                            <Eye size={18} className="text-gray-600" />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          <p>Quick view</p>
                        </Tooltip.Content>
                      </Tooltip.Root>
                    </Tooltip.Provider>

                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm"
                          >
                            <Share2 size={18} className="text-gray-600" />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          <p>Share</p>
                        </Tooltip.Content>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full shadow-lg">
                      {project.category}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full shadow-lg">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 flex-1">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-gray-600">4.8</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin size={16} className="text-orange-500 flex-shrink-0" />
                    <span className="text-sm">{project.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Property Details */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    {project.bedrooms && (
                      <div className="flex items-center gap-1">
                        <Bed size={16} className="text-orange-500" />
                        <span>{project.bedrooms}</span>
                      </div>
                    )}
                    {project.bathrooms && (
                      <div className="flex items-center gap-1">
                        <Bath size={16} className="text-orange-500" />
                        <span>{project.bathrooms}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Square size={16} className="text-orange-500" />
                      <span>{project.area}</span>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-2xl font-bold text-orange-600">
                        {project.price}
                      </div>
                      <div className="text-xs text-gray-500">Starting from</div>
                    </div>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link href={`/properties/${project.slug}`} className="flex items-center gap-2">
                        View Details
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/* Quick View Dialog */}
      <Dialog.Root open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
            {selectedProperty && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProperty.name}</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsQuickViewOpen(false)}
                  >
                    <X size={20} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image */}
                  <div className="relative h-64 rounded-xl overflow-hidden">
                    <Image
                      src={selectedProperty.gallery[0] || "/media/img/default-property.jpg"}
                      alt={selectedProperty.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={18} className="text-orange-500" />
                      <span>{selectedProperty.location}</span>
                    </div>

                    <p className="text-gray-600">{selectedProperty.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      {selectedProperty.bedrooms && (
                        <div className="flex items-center gap-2">
                          <Bed size={18} className="text-orange-500" />
                          <span className="text-sm">{selectedProperty.bedrooms} Bedrooms</span>
                        </div>
                      )}
                      {selectedProperty.bathrooms && (
                        <div className="flex items-center gap-2">
                          <Bath size={18} className="text-orange-500" />
                          <span className="text-sm">{selectedProperty.bathrooms} Bathrooms</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Square size={18} className="text-orange-500" />
                        <span className="text-sm">{selectedProperty.area}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 size={18} className="text-orange-500" />
                        <span className="text-sm">{selectedProperty.category}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-3xl font-bold text-orange-600 mb-4">
                        {selectedProperty.price}
                      </div>
                      <div className="flex gap-3">
                        <Button
                          asChild
                          className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                        >
                          <Link href={`/properties/${selectedProperty.slug}`}>
                            View Full Details
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="px-6"
                        >
                          Contact Agent
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
