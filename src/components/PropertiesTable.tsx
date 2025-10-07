"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Bed, Bath, Square, Eye, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

const filterOptions = ["all", "villa", "apartment", "townhouse", "coastal", "commercial", "penthouse"] as const;

interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  description: string;
}

export default function PropertiesTable() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    // Simulate API call - in real app, this would fetch from your backend
    const mockProperties: Property[] = [
      {
        id: "sun-capital",
        name: "Sun Capital Signature Villas",
        location: "6th of October City, Giza",
        price: 6300000,
        type: "Villa",
        bedrooms: 5,
        bathrooms: 4,
        area: 365,
        image: "/media/img/sun-capital.jpg",
        description: "A gated enclave of contemporary villas overlooking lush landscaping and private club facilities."
      },
      {
        id: "midtown-sky",
        name: "Midtown Sky Residences",
        location: "New Cairo, Cairo",
        price: 2250000,
        type: "Apartment",
        bedrooms: 3,
        bathrooms: 3,
        area: 165,
        image: "/media/img/mid_town_new_cairo.jpg",
        description: "Elegant apartments with floor-to-ceiling views, smart home integration, and concierge services."
      },
      {
        id: "park-yard",
        name: "Park Yard Townhomes",
        location: "Sheikh Zayed City, Giza",
        price: 4100000,
        type: "Townhouse",
        bedrooms: 4,
        bathrooms: 4,
        area: 280,
        image: "/media/img/park-yard2.jpg",
        description: "Premium townhomes connected to landscaped parks, boutique retail, and international schools."
      },
      {
        id: "north-coast-chalet",
        name: "Azure North Coast Chalet",
        location: "North Coast, Alexandria",
        price: 3200000,
        type: "Coastal",
        bedrooms: 3,
        bathrooms: 3,
        area: 210,
        image: "/media/img/nmq-600x400-1.jpg",
        description: "Direct beachfront living with expansive terraces, infinity pools, and private beach club access."
      },
      {
        id: "new-cairo-business",
        name: "Prive Mall Commercial Hub",
        location: "New Capital, Cairo",
        price: 5400000,
        type: "Commercial",
        bedrooms: 0,
        bathrooms: 2,
        area: 420,
        image: "/media/img/prive-mall.jpg",
        description: "A vibrant mixed-use business address crafted for flagship retail and premium office operators."
      },
      {
        id: "solana-penthouse",
        name: "Solana Sky Penthouse",
        location: "New Giza, Giza",
        price: 7200000,
        type: "Penthouse",
        bedrooms: 5,
        bathrooms: 5,
        area: 340,
        image: "/media/img/solana-by-ora-web-2.jpg",
        description: "A panoramic penthouse with rooftop plunge pool, outdoor kitchen, and uninterrupted skyline vistas."
      }
    ];

    setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProperties = properties.filter(property => 
    filter === "all" || property.type.toLowerCase() === filter.toLowerCase()
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated selection of premium properties across Egypt
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="mb-10 flex justify-center px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 rounded-full bg-white/80 p-2 shadow-inner shadow-orange-100/70 lg:px-6">
            {filterOptions.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                  filter === type
                    ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-200"
                    : "bg-white/70 text-gray-600 hover:text-orange-600 hover:shadow-sm"
                }`}
                aria-pressed={filter === type}
              >
                {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-orange-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm">
                    {property.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="rounded-full bg-black/75 px-4 py-1 text-sm font-semibold text-white shadow-lg">
                    {formatPrice(property.price)}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm text-white/90">
                  <div className="flex min-w-0 items-center gap-2">
                    <MapPin size={16} className="text-white" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square size={16} className="text-white" />
                    <span>{property.area} m²</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{property.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {property.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <Bed size={16} className="text-orange-500" />
                      <span>{property.bedrooms} Bedrooms</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Bath size={16} className="text-orange-500" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square size={16} className="text-orange-500" />
                    <span>{property.area} m²</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link href={`/properties/${property.id}`} className="flex-1">
                    <Button className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 py-2 text-white transition-all duration-300 hover:bg-orange-700">
                      <Eye size={16} />
                      View Details
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    asChild
                    className="rounded-lg border-orange-200 px-4 py-2 text-orange-600 transition-all duration-300 hover:bg-orange-50 hover:text-orange-700"
                  >
                    <a href="tel:+201234567890" className="flex items-center gap-2">
                      <Phone size={16} />
                      Call
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No properties found for the selected filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
