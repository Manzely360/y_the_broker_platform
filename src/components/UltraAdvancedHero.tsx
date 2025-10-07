"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Home, 
  Building2, 
  Waves, 
  ChevronDown,
  Star,
  TrendingUp,
  Shield,
  Play,
  ArrowRight,
  Filter,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const heroSlides = [
  {
    id: 1,
    image: "/media/img/hero-1.jpg",
    title: "Luxury Living in New Cairo",
    subtitle: "Discover premium residential properties in Egypt's most prestigious district",
    price: "Starting from 2.5M EGP",
    features: ["3-4 Bedrooms", "Modern Design", "Premium Location"]
  },
  {
    id: 2,
    image: "/media/img/hero-2.jpg", 
    title: "Coastal Paradise",
    subtitle: "Exclusive beachfront properties on the North Coast",
    price: "Starting from 1.8M EGP",
    features: ["Beach Access", "Resort Amenities", "Investment Ready"]
  },
  {
    id: 3,
    image: "/media/img/hero-3.jpg",
    title: "Commercial Excellence",
    subtitle: "Prime commercial spaces in Cairo's business districts",
    price: "Starting from 5M EGP", 
    features: ["Prime Location", "High ROI", "Business Ready"]
  },
  {
    id: 4,
    image: "/media/img/hero-4.jpg",
    title: "Modern Apartments",
    subtitle: "Contemporary living spaces with world-class amenities",
    price: "Starting from 1.2M EGP",
    features: ["Smart Home", "Gym & Pool", "24/7 Security"]
  }
];

const propertyTypes = [
  { id: "residential", label: "Residential", icon: Home, color: "text-blue-600", bg: "bg-blue-50", count: "500+" },
  { id: "commercial", label: "Commercial", icon: Building2, color: "text-green-600", bg: "bg-green-50", count: "150+" },
  { id: "coastal", label: "Coastal", icon: Waves, color: "text-cyan-600", bg: "bg-cyan-50", count: "200+" },
];

const locations = [
  "New Cairo", "6 October City", "North Coast", "Sharm El Sheikh", 
  "Hurghada", "Alexandria", "Cairo", "Giza", "Maadi", "Heliopolis"
];

const stats = [
  { icon: Home, value: "850+", label: "Properties Sold", color: "text-orange-600" },
  { icon: Star, value: "4.9", label: "Customer Rating", color: "text-yellow-500" },
  { icon: TrendingUp, value: "25%", label: "ROI Growth", color: "text-green-600" },
  { icon: Shield, value: "100%", label: "Secure Deals", color: "text-blue-600" },
];

export default function UltraAdvancedHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const { ref, inView } = useInView({ threshold: 0.1 });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append("q", searchQuery);
    if (selectedType) params.append("type", selectedType);
    
    window.location.href = `/properties?${params.toString()}`;
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${heroSlides[currentSlide].image})`
              }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="text-center mb-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {heroSlides[currentSlide].features.map((feature, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30"
                >
                  {feature}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-3xl font-bold text-orange-400 mb-8"
            >
              {heroSlides[currentSlide].price}
            </motion.div>
          </motion.div>
        </div>

        {/* Ultra Advanced Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="w-full max-w-6xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <form onSubmit={handleSearch} className="p-8">
              {/* Property Type Tabs */}
              <div className="flex justify-center mb-8">
                <div className="flex bg-gray-100 rounded-2xl p-2">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(selectedType === type.id ? "" : type.id)}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedType === type.id
                          ? "bg-white text-orange-600 shadow-lg"
                          : "text-gray-600 hover:text-orange-600"
                      }`}
                    >
                      <type.icon size={20} className={selectedType === type.id ? "text-orange-600" : "text-gray-500"} />
                      <span>{type.label}</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{type.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Search Input */}
                <div className="lg:col-span-2 relative">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(e.target.value.length > 2);
                      }}
                      onFocus={() => setShowSuggestions(searchQuery.length > 2)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      placeholder="Search by project name, location, or keywords..."
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                    />
                  </div>
                  
                  {/* Suggestions Dropdown */}
                  <AnimatePresence>
                    {showSuggestions && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
                      >
                        {locations.filter(loc => 
                          loc.toLowerCase().includes(searchQuery.toLowerCase())
                        ).slice(0, 5).map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setSearchQuery(suggestion);
                              setShowSuggestions(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-orange-50 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                          >
                            <MapPin size={16} className="text-orange-500" />
                            <span className="text-gray-700">{suggestion}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Location Filter */}
                <div className="relative">
                  <select className="w-full pl-4 pr-10 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900">
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>

                {/* Price Range */}
                <div className="relative">
                  <select className="w-full pl-4 pr-10 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900">
                    <option value="">Any Price</option>
                    <option value="0-1000000">Under 1M EGP</option>
                    <option value="1000000-3000000">1M - 3M EGP</option>
                    <option value="3000000-5000000">3M - 5M EGP</option>
                    <option value="5000000+">5M+ EGP</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <SlidersHorizontal size={18} />
                  <span>Advanced Filters</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <Filter size={18} />
                  <span>Save Search</span>
                </button>
              </div>

              {/* Search Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Search size={20} />
                  Search Properties
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-orange-600 rounded-xl font-semibold transition-all duration-300"
                  onClick={toggleVideo}
                >
                  <Play size={20} />
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <div className={`w-20 h-20 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={28} className={stat.color} />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-orange-500 scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={toggleVideo}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                className="w-full rounded-2xl"
                controls
                autoPlay
                onEnded={() => setIsVideoPlaying(false)}
              >
                <source src="/media/video/property-tour.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
