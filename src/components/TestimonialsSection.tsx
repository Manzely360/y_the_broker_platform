"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause,
  User,
  Award,
  TrendingUp,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    role: "Property Investor",
    company: "Hassan Investments",
    image: "/media/img/testimonial-1.jpg",
    rating: 5,
    text: "Y The Brokers helped me find the perfect investment property in New Cairo. Their market knowledge and negotiation skills saved me over 200,000 EGP. The entire process was smooth and professional.",
    location: "New Cairo",
    propertyType: "Commercial",
    investment: "5.2M EGP"
  },
  {
    id: 2,
    name: "Sarah Mohamed",
    role: "First-time Buyer",
    company: "Tech Professional",
    image: "/media/img/testimonial-2.jpg",
    rating: 5,
    text: "As a first-time buyer, I was nervous about the process. The team at Y The Brokers guided me through every step and made it completely stress-free. I found my dream home in Maadi.",
    location: "Maadi",
    propertyType: "Residential",
    investment: "2.8M EGP"
  },
  {
    id: 3,
    name: "Khaled Ali",
    role: "Business Owner",
    company: "Ali Trading Co.",
    image: "/media/img/testimonial-3.jpg",
    rating: 5,
    text: "We needed a commercial space for our expanding business. Y The Brokers found us the perfect location in 6 October City with excellent terms. Highly recommended for commercial real estate.",
    location: "6 October City",
    propertyType: "Commercial",
    investment: "8.5M EGP"
  },
  {
    id: 4,
    name: "Nour El-Din",
    role: "Luxury Property Buyer",
    company: "Finance Director",
    image: "/media/img/testimonial-4.jpg",
    rating: 5,
    text: "The luxury properties they showed us on the North Coast were absolutely stunning. Their attention to detail and understanding of high-end properties is unmatched.",
    location: "North Coast",
    propertyType: "Coastal",
    investment: "12M EGP"
  },
  {
    id: 5,
    name: "Fatma Ibrahim",
    role: "Property Seller",
    company: "Retired Teacher",
    image: "/media/img/testimonial-5.jpg",
    rating: 5,
    text: "Selling my family home was emotional, but Y The Brokers handled everything with care and professionalism. They got me a great price and made the process easy.",
    location: "Heliopolis",
    propertyType: "Residential",
    investment: "3.5M EGP"
  },
  {
    id: 6,
    name: "Omar Mahmoud",
    role: "Real Estate Developer",
    company: "Mahmoud Developments",
    image: "/media/img/testimonial-6.jpg",
    rating: 5,
    text: "Working with Y The Brokers on our development project was excellent. Their market insights and client network helped us sell 80% of units before completion.",
    location: "Sheikh Zayed",
    propertyType: "Development",
    investment: "25M EGP"
  }
];

const stats = [
  { icon: User, value: "2,500+", label: "Happy Clients", color: "text-blue-600" },
  { icon: Star, value: "4.9/5", label: "Average Rating", color: "text-yellow-500" },
  { icon: TrendingUp, value: "95%", label: "Client Retention", color: "text-green-600" },
  { icon: Shield, value: "100%", label: "Secure Transactions", color: "text-purple-600" },
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.1 });

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff7b34' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-orange-600">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say 
            about their experience with Y The Brokers.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon size={28} className={stat.color} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Testimonial Content */}
                  <div>
                    <div className="flex items-center mb-6">
                      <Quote size={40} className="text-orange-500 mr-4" />
                      <div className="flex">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} size={24} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    
                    <blockquote className="text-2xl text-gray-700 leading-relaxed mb-8 italic">
                      &quot;{testimonials[currentTestimonial].text}&quot;
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-orange-600 font-bold text-lg">
                          {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</div>
                        <div className="text-orange-600 font-medium">{testimonials[currentTestimonial].role}</div>
                        <div className="text-gray-500 text-sm">{testimonials[currentTestimonial].company}</div>
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Property Details</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-semibold text-gray-900">{testimonials[currentTestimonial].location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-semibold text-gray-900">{testimonials[currentTestimonial].propertyType}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Investment:</span>
                        <span className="font-bold text-orange-600 text-lg">{testimonials[currentTestimonial].investment}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Client Rating</span>
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                              <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {testimonials[currentTestimonial].rating}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute top-6 right-6 flex items-center space-x-2">
              <button
                onClick={toggleAutoPlay}
                className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300"
              >
                {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>

            <div className="absolute bottom-6 right-6 flex items-center space-x-2">
              <button
                onClick={prevTestimonial}
                className="p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? "bg-orange-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">More Client Stories</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read more testimonials from our satisfied clients across different property types and locations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setCurrentTestimonial(index)}
              >
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                  &quot;{testimonial.text}&quot;
                </p>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-orange-600 font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                    <div className="text-orange-600 text-xs">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{testimonial.location}</span>
                    <span className="font-semibold text-orange-600">{testimonial.investment}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Join Our Happy Clients</h3>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Experience the same level of service and satisfaction. Let us help you find your dream property 
              or sell your current one with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Start Your Journey
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                Read More Reviews
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}