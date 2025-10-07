"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Home, 
  Building2, 
  Waves, 
  ChevronDown,
  Play,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useInView } from "react-intersection-observer";

const heroSlides = [
  {
    id: 1,
    image: "/media/img/hero-1.jpg",
    title: "Find Your Dream Home",
    subtitle: "Discover premium properties across Egypt's most sought-after locations",
    cta: "Explore Properties"
  },
  {
    id: 2,
    image: "/media/img/hero-2.jpg", 
    title: "Luxury Living Awaits",
    subtitle: "From modern apartments to beachfront villas, we have it all",
    cta: "View Collection"
  },
  {
    id: 3,
    image: "/media/img/hero-3.jpg",
    title: "Investment Opportunities",
    subtitle: "Prime commercial and residential properties with excellent ROI",
    cta: "Invest Now"
  }
];

const propertyTypes = [
  { id: "residential", label: "Residential", icon: Home, count: "500+" },
  { id: "commercial", label: "Commercial", icon: Building2, count: "150+" },
  { id: "coastal", label: "Coastal", icon: Waves, count: "200+" },
];

const locations = [
  "New Cairo", "6 October City", "North Coast", "Sharm El Sheikh", 
  "Hurghada", "Alexandria", "Cairo", "Giza", "Maadi", "Heliopolis"
];

export default function CleanHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { ref, inView } = useInView({ threshold: 0.1 });

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append("q", searchQuery);
    if (selectedType) params.append("type", selectedType);
    
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="text-center mb-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                {heroSlides[currentSlide].cta}
                <ArrowRight size={20} />
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2">
                <Play size={20} />
                Watch Video
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Clean Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <form onSubmit={handleSearch} className="p-6">
              {/* Property Type Tabs */}
              <div className="flex justify-center mb-6">
                <div className="flex bg-gray-100 rounded-xl p-1">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(selectedType === type.id ? "" : type.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedType === type.id
                          ? "bg-white text-orange-600 shadow-sm"
                          : "text-gray-600 hover:text-orange-600"
                      }`}
                    >
                      <type.icon size={18} />
                      <span>{type.label}</span>
                      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">{type.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Search Input */}
                <div className="md:col-span-2 relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(e.target.value.length > 2);
                      }}
                      onFocus={() => setShowSuggestions(searchQuery.length > 2)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      placeholder="Search by location, project, or keyword..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                    />
                  </div>
                  
                  {/* Suggestions Dropdown */}
                  <AnimatePresence>
                    {showSuggestions && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto"
                      >
                        {locations.filter(loc => 
                          loc.toLowerCase().includes(searchQuery.toLowerCase())
                        ).slice(0, 5).map((suggestion, index) => (
                          <button
                            key={suggestion}
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
                  <select className="w-full pl-3 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900" aria-label="Select location">
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-3 px-12 rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Search size={20} />
                  Search Properties
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-orange-500 scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
