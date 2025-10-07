"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, DollarSign, Home, Building2, Waves, ArrowRight, Play } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";

const heroVideos = [
  "/media/video/Y-The-Brokers-Video-Website-1.mp4",
  "/media/video/Project-Name.mov",
];

const heroImages = [
  "/media/img/hero-1.webp",
  "/media/img/hero-2.webp", 
  "/media/img/hero-3.webp",
];

const propertyTypes = [
  {
    icon: Home,
    title: "Residential",
    subtitle: "Find Your Dream Home",
    description: "Luxury apartments, villas, and townhouses",
    color: "from-blue-500 to-blue-600",
    href: "/residential"
  },
  {
    icon: Building2,
    title: "Commercial", 
    subtitle: "Business Spaces",
    description: "Office buildings, retail spaces, and warehouses",
    color: "from-green-500 to-green-600",
    href: "/commercial"
  },
  {
    icon: Waves,
    title: "Coastal",
    subtitle: "Beachfront Living",
    description: "Resorts, beach houses, and coastal properties",
    color: "from-cyan-500 to-cyan-600",
    href: "/coastal"
  }
];

const services = [
  { label: "Buy a Home", icon: Home },
  { label: "Sell a Home", icon: DollarSign },
  { label: "Lease Property", icon: Building2 },
];

export default function HeroSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("Buy a Home");
  const [selectedType, setSelectedType] = useState("Residential");
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideoIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {heroVideos[currentVideoIndex] ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster={heroImages[currentVideoIndex] || "/media/img/hero-1.webp"}
              >
                <source src={heroVideos[currentVideoIndex]} type="video/mp4" />
                <source src={heroVideos[currentVideoIndex]} type="video/quicktime" />
              </video>
            ) : (
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${heroImages[currentVideoIndex] || "/media/img/hero-1.webp"})`,
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl lg:text-7xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Certified
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Projects
                </span>
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-2xl lg:text-3xl font-semibold text-gray-200"
              >
                By Y The Brokers
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg"
            >
              Discover exceptional properties across Egypt&apos;s most prestigious locations. 
              From luxury coastal resorts to prime commercial spaces, we bring you the finest real estate opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Explore Properties
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300"
              >
                <Play size={20} />
                Watch Video
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Search & Property Types */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}>
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Your Perfect Property</h3>
                
                {/* Service Selection */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {services.map((service) => (
                    <motion.button
                      key={service.label}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedService(service.label)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedService === service.label
                          ? "bg-orange-500 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <service.icon size={16} />
                      {service.label}
                    </motion.button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter location, project name, or keywords..."
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>

                {/* Property Type Selection */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Property Type</p>
                  <div className="grid grid-cols-3 gap-3">
                    {propertyTypes.map((type) => (
                      <motion.button
                        key={type.title}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedType(type.title)}
                        className={`p-4 rounded-xl text-left transition-all duration-200 ${
                          selectedType === type.title
                            ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <type.icon size={24} className="mb-2" />
                        <div className="text-sm font-semibold">{type.title}</div>
                        <div className="text-xs opacity-75">{type.subtitle}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Search Properties
                </motion.button>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {heroVideos.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentVideoIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentVideoIndex === index
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
