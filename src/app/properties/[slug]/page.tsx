"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useProjects } from "@/hooks/useProjects";
import { Property } from "@/types/property";
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  ArrowLeft, 
  Share2, 
  Phone, 
  MessageCircle,
  Building2,
  Car,
  TreePine,
  Shield,
  Wifi
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleFooter from "@/components/SimpleFooter";

export default function PropertyDetailPage() {
  const params = useParams();
  const { projects } = useProjects();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (projects.length > 0 && params.slug) {
      const foundProperty = projects.find(p => p.slug === params.slug);
      setProperty(foundProperty || null);
    }
  }, [projects, params.slug]);

  const toggleFavorite = () => {
    if (property) {
      setFavorites(prev => 
        prev.includes(property.id) 
          ? prev.filter(fav => fav !== property.id)
          : [...prev, property.id]
      );
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SimpleNavbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading property details...</p>
          </div>
        </div>
        <SimpleFooter />
      </div>
    );
  }

  const features = [
    { icon: Wifi, label: "High-Speed Internet" },
    { icon: Car, label: "Parking Space" },
    { icon: TreePine, label: "Garden" },
    { icon: Shield, label: "Security System" },
    { icon: Building2, label: "Modern Design" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNavbar />
      
      <main className="pt-16">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/properties"
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Properties
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="relative h-96">
                  <Image
                    src={property.gallery[selectedImage] || "/media/img/default-property.jpg"}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {property.gallery.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : property.gallery.length - 1)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => setSelectedImage(prev => prev < property.gallery.length - 1 ? prev + 1 : 0)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        →
                      </button>
                    </>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={toggleFavorite}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart 
                      size={20} 
                      className={`transition-colors ${
                        favorites.includes(property.id) ? "text-red-500 fill-red-500" : "text-gray-600"
                      }`} 
                    />
                  </button>

                  {/* Share Button */}
                  <button className="absolute top-4 right-16 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>

                {/* Thumbnail Gallery */}
                {property.gallery.length > 1 && (
                  <div className="p-4 flex gap-2 overflow-x-auto">
                    {property.gallery.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
                          selectedImage === index ? "ring-2 ring-orange-500" : ""
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${property.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
                    <div className="flex items-center gap-1 text-gray-600 mb-4">
                      <MapPin size={18} />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-orange-600 mb-2">{property.price}</div>
                    <div className="text-sm text-gray-500">{property.status}</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{property.description}</p>

                {/* Property Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {property.bedrooms && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Bed size={24} className="text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                      <div className="text-sm text-gray-600">Bedrooms</div>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Bath size={24} className="text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                      <div className="text-sm text-gray-600">Bathrooms</div>
                    </div>
                  )}
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square size={24} className="text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                    <div className="text-sm text-gray-600">Area</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Building2 size={24} className="text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.category}</div>
                    <div className="text-sm text-gray-600">Type</div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Features & Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <feature.icon size={20} className="text-orange-600" />
                        <span className="text-gray-700">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location Map */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Location</h3>
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive map will be displayed here</p>
                    <p className="text-sm text-gray-500">{property.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Agent</h3>
                
                <div className="space-y-4">
                  <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Phone size={20} />
                    Call Now
                  </button>
                  
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    <MessageCircle size={20} />
                    WhatsApp
                  </button>
                  
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2">
                    <MessageCircle size={20} />
                    Send Message
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Property ID</h4>
                  <p className="text-gray-600">#{property.id}</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2 mt-4">Developer</h4>
                  <p className="text-gray-600">{property.developer}</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2 mt-4">Listed</h4>
                  <p className="text-gray-600">{new Date(property.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Similar Properties */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Similar Properties</h3>
                <div className="space-y-4">
                  {projects.filter(p => p.category === property.category && p.id !== property.id).slice(0, 3).map((similar) => (
                    <Link key={similar.id} href={`/properties/${similar.slug}`} className="block">
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={similar.gallery[0] || "/media/img/default-property.jpg"}
                            alt={similar.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{similar.name}</h4>
                          <p className="text-gray-600 text-xs">{similar.location}</p>
                          <p className="text-orange-600 font-semibold text-sm">{similar.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SimpleFooter />
    </div>
  );
}
