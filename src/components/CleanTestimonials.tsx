"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    role: "Property Investor",
    image: "/media/img/testimonial-1.jpg",
    rating: 5,
    text: "Y The Brokers helped me find the perfect investment property. Their market knowledge and negotiation skills saved me thousands of EGP.",
    property: "Luxury Villa in New Cairo",
    price: "3.2M EGP"
  },
  {
    id: 2,
    name: "Sarah Mohamed",
    role: "First-time Buyer",
    image: "/media/img/testimonial-2.jpg", 
    rating: 5,
    text: "As a first-time buyer, I was nervous about the process. The team guided me through every step and made it stress-free.",
    property: "Modern Apartment in Maadi",
    price: "1.8M EGP"
  },
  {
    id: 3,
    name: "Khaled Ali",
    role: "Business Owner",
    image: "/media/img/testimonial-3.jpg",
    rating: 5,
    text: "We needed a commercial space for our business. Y The Brokers found us the perfect location with great terms.",
    property: "Office Space in Downtown",
    price: "2.5M EGP"
  },
  {
    id: 4,
    name: "Fatma El-Sayed",
    role: "Real Estate Investor",
    image: "/media/img/testimonial-4.jpg",
    rating: 5,
    text: "Excellent service and professional team. They helped me build a diverse property portfolio across Egypt.",
    property: "Beachfront Villa in North Coast",
    price: "4.1M EGP"
  },
  {
    id: 5,
    name: "Omar Mahmoud",
    role: "Family Buyer",
    image: "/media/img/testimonial-5.jpg",
    rating: 5,
    text: "The team understood our family needs perfectly. We found our dream home in a great neighborhood.",
    property: "Family Villa in Sheikh Zayed",
    price: "2.8M EGP"
  }
];

export default function CleanTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1 });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-orange-600">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about our services.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="space-y-6">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Quote size={24} className="text-orange-600" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                  &quot;{currentTestimonial.text}&quot;
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-lg">
                      {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">{currentTestimonial.name}</div>
                    <div className="text-gray-600">{currentTestimonial.role}</div>
                  </div>
                </div>

                {/* Property Info */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Property Purchased:</div>
                  <div className="font-semibold text-gray-900">{currentTestimonial.property}</div>
                  <div className="text-orange-600 font-bold">{currentTestimonial.price}</div>
                </div>
              </div>

              {/* Client Image */}
              <div className="relative">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                {/* Navigation Arrows */}
                <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 flex space-x-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-50 transition-colors duration-300"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={20} className="text-gray-600" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-50 transition-colors duration-300"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-orange-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-gray-600">Client Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">2,500+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
