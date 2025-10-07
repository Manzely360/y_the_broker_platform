"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, MapPin, Bed, Bath, Square, ArrowRight, Star, Eye } from "lucide-react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

const featuredProperties = [
  {
    id: 1,
    title: "Telal North Coast",
    location: "North Coast, Egypt",
    price: "Starting from $150,000",
    image: "/media/img/telal-north-coast-1.webp",
    category: "Coastal",
    bedrooms: "2-4",
    bathrooms: "2-3",
    area: "2,500",
    rating: 4.8,
    views: 1240,
    featured: true,
    description: "Luxury coastal resort with stunning sea views and world-class amenities."
  },
  {
    id: 2,
    title: "D-Bay Resort",
    location: "North Coast, Egypt", 
    price: "Starting from $180,000",
    image: "/media/img/d-bay-resort-1.webp",
    category: "Coastal",
    bedrooms: "3-5",
    bathrooms: "3-4",
    area: "3,200",
    rating: 4.9,
    views: 2150,
    featured: true,
    description: "Exclusive beachfront resort offering unparalleled luxury and privacy."
  },
  {
    id: 3,
    title: "Capital Tower 6 October",
    location: "6 October City, Egypt",
    price: "Starting from $200,000", 
    image: "/media/img/capital-tower-1.webp",
    category: "Commercial",
    bedrooms: "N/A",
    bathrooms: "N/A",
    area: "5,000",
    rating: 4.7,
    views: 1890,
    featured: false,
    description: "Premium commercial tower in the heart of 6 October City."
  },
  {
    id: 4,
    title: "Space 6 October",
    location: "6 October City, Egypt",
    price: "Starting from $120,000",
    image: "/media/img/space-october-1.webp", 
    category: "Residential",
    bedrooms: "2-3",
    bathrooms: "2",
    area: "1,800",
    rating: 4.6,
    views: 980,
    featured: false,
    description: "Modern residential compound with contemporary apartments."
  },
  {
    id: 5,
    title: "Azha North Coast",
    location: "North Coast, Egypt",
    price: "Starting from $165,000",
    image: "/media/img/azha-north-coast-1.webp",
    category: "Coastal", 
    bedrooms: "2-4",
    bathrooms: "2-3",
    area: "2,800",
    rating: 4.8,
    views: 1560,
    featured: true,
    description: "Modern coastal development with contemporary design."
  },
  {
    id: 6,
    title: "Win Plaza Mall",
    location: "6 October City, Egypt",
    price: "Starting from $300,000",
    image: "/media/img/win-plaza-1.webp",
    category: "Commercial",
    bedrooms: "N/A", 
    bathrooms: "N/A",
    area: "8,500",
    rating: 4.5,
    views: 2100,
    featured: false,
    description: "Large-scale commercial mall with retail spaces."
  }
];

const categoryColors = {
  Residential: "bg-blue-100 text-blue-800",
  Commercial: "bg-green-100 text-green-800", 
  Coastal: "bg-cyan-100 text-cyan-800"
};

export default function FeaturedProperties() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { ref, inView } = useInView({ threshold: 0.1 });

  const categories = ["All", "Residential", "Commercial", "Coastal"];
  
  const filteredProperties = selectedCategory === "All" 
    ? featuredProperties 
    : featuredProperties.filter(prop => prop.category === selectedCategory);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our premium real estate portfolio featuring the finest properties 
            across Egypt&apos;s most prestigious locations.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Properties Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {property.featured && (
                          <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                            Featured
                          </span>
                        )}
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[property.category as keyof typeof categoryColors]}`}>
                          {property.category}
                        </span>
                      </div>

                      {/* Favorite Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(property.id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                      >
                        <Heart 
                          size={18} 
                          className={`transition-colors duration-200 ${
                            favorites.includes(property.id) ? "text-red-500 fill-red-500" : "text-gray-600"
                          }`} 
                        />
                      </motion.button>

                      {/* Quick View */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <Eye size={18} className="text-gray-600" />
                      </motion.button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Star size={14} className="text-yellow-400 fill-yellow-400" />
                          <span>{property.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-gray-600 mb-4">
                        <MapPin size={16} />
                        <span className="text-sm">{property.location}</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {property.description}
                      </p>

                      {/* Property Details */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        {property.bedrooms !== "N/A" && (
                          <div className="flex items-center gap-1">
                            <Bed size={16} />
                            <span>{property.bedrooms}</span>
                          </div>
                        )}
                        {property.bathrooms !== "N/A" && (
                          <div className="flex items-center gap-1">
                            <Bath size={16} />
                            <span>{property.bathrooms}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Square size={16} />
                          <span>{property.area} sq ft</span>
                        </div>
                      </div>

                      {/* Price and Views */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-orange-600">
                          {property.price}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Eye size={14} />
                          <span>{property.views.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        View Details
                        <ArrowRight size={16} />
                      </motion.button>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Properties
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
