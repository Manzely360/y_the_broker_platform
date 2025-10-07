"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Bed, Bath, Square, Eye, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

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
        id: "1",
        name: "Luxury Villa in New Cairo",
        location: "New Cairo, Cairo",
        price: 3200000,
        type: "Villa",
        bedrooms: 4,
        bathrooms: 3,
        area: 250,
        image: "/media/img/hero-1.jpg",
        description: "Beautiful modern villa with garden and pool"
      },
      {
        id: "2",
        name: "Beachfront Apartment",
        location: "North Coast, Alexandria",
        price: 1800000,
        type: "Apartment",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        image: "/media/img/hero-2.jpg",
        description: "Stunning beachfront apartment with sea views"
      },
      {
        id: "3",
        name: "Commercial Office Space",
        location: "Downtown Cairo",
        price: 2500000,
        type: "Commercial",
        bedrooms: 0,
        bathrooms: 2,
        area: 180,
        image: "/media/img/hero-3.jpg",
        description: "Prime commercial space in business district"
      },
      {
        id: "4",
        name: "Modern Apartment Complex",
        location: "Maadi, Cairo",
        price: 1200000,
        type: "Apartment",
        bedrooms: 2,
        bathrooms: 2,
        area: 90,
        image: "/media/img/hero-4.jpg",
        description: "Contemporary apartment with modern amenities"
      },
      {
        id: "5",
        name: "Penthouse with City Views",
        location: "Zamalek, Cairo",
        price: 4500000,
        type: "Penthouse",
        bedrooms: 5,
        bathrooms: 4,
        area: 300,
        image: "/media/img/hero-1.jpg",
        description: "Exclusive penthouse with panoramic city views"
      },
      {
        id: "6",
        name: "Family Villa in Sheikh Zayed",
        location: "Sheikh Zayed, Giza",
        price: 2800000,
        type: "Villa",
        bedrooms: 4,
        bathrooms: 3,
        area: 220,
        image: "/media/img/hero-2.jpg",
        description: "Spacious family villa with private garden"
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
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-full p-1">
            {["all", "villa", "apartment", "commercial", "penthouse"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === type
                    ? "bg-orange-600 text-white shadow-md"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
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
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {formatPrice(property.price)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{property.name}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{property.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed size={16} className="mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath size={16} className="mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square size={16} className="mr-1" />
                      <span>{property.area}m²</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link href={`/properties/${property.id}`} className="flex-1">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                      <Eye size={16} />
                      View Details
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-4 py-2 rounded-lg transition-all duration-300">
                    <Phone size={16} />
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
