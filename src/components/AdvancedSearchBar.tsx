"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Home, Building2, Waves, DollarSign, Filter, ChevronDown } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";

const propertyTypes = [
  { id: "residential", label: "Residential", icon: Home, color: "text-blue-600" },
  { id: "commercial", label: "Commercial", icon: Building2, color: "text-green-600" },
  { id: "coastal", label: "Coastal", icon: Waves, color: "text-cyan-600" },
];

const priceRanges = [
  { label: "Any Price", value: "" },
  { label: "Under 500K EGP", value: "0-500000" },
  { label: "500K - 1M EGP", value: "500000-1000000" },
  { label: "1M - 2M EGP", value: "1000000-2000000" },
  { label: "2M - 5M EGP", value: "2000000-5000000" },
  { label: "5M+ EGP", value: "5000000-999999999" },
];

const locations = [
  "New Cairo", "6 October City", "North Coast", "Sharm El Sheikh", 
  "Hurghada", "Alexandria", "Cairo", "Giza", "Maadi", "Heliopolis"
];

export default function AdvancedSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { projects } = useProjects();
  const premiumListingText =
    projects.length > 0 ? `${projects.length} premium listings available now` : "Explore our curated premium listings";

  // Generate suggestions based on projects
  useEffect(() => {
    if (searchQuery.length > 2) {
      const projectNames = projects.map(p => p.name);
      const projectLocations = projects.map(p => p.location);
      const allSuggestions = [...new Set([...projectNames, ...projectLocations, ...locations])]
        .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5);
      setSuggestions(allSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, projects]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append("q", searchQuery);
    if (selectedType) params.append("type", selectedType);
    if (selectedLocation) params.append("location", selectedLocation);
    if (selectedPrice) params.append("price", selectedPrice);
    
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 overflow-hidden"
      >
        {/* Main Search Row */}
        <form onSubmit={handleSearch} className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Search by project name, location, or keywords..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                />
              </div>
              
              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto"
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                      >
                        <MapPin size={16} className="text-gray-400" />
                        <span className="text-gray-700">{suggestion}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Property Type */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-4 pr-10 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900"
              >
                <option value="">All Types</option>
                {propertyTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4 px-6 rounded-xl hover:from-orange-700 hover:to-orange-800 transition-colors font-semibold flex items-center justify-center gap-2 shadow-lg"
            >
              <Search size={20} />
              Search
            </button>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors font-medium"
              aria-expanded={showFilters}
            >
              <Filter size={16} />
              <span>Advanced Filters</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} 
              />
            </button>
            
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
              {premiumListingText}
            </div>
          </div>
        </form>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 bg-white/90 backdrop-blur-lg p-6 lg:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">All Locations</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <select
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                    >
                      {priceRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>

                {/* Property Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Filters
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(selectedType === type.id ? "" : type.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                          selectedType === type.id
                            ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg"
                            : "bg-white/80 text-gray-700 border border-gray-200 hover:border-orange-200 hover:text-orange-600"
                        }`}
                      >
                        <type.icon
                          size={16}
                          className={selectedType === type.id ? "text-white" : type.color}
                        />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-3 bg-orange-50 border border-orange-100 rounded-xl px-5 py-4 text-sm text-orange-700">
                  Fine-tune your search to surface ideal matches faster. Need tailored support? Our advisors are available 24/7 on{" "}
                  <a
                    href="tel:+201234567890"
                    className="font-semibold underline decoration-orange-400 underline-offset-4 hover:text-orange-800"
                  >
                    +20 123 456 7890
                  </a>
                  .
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
