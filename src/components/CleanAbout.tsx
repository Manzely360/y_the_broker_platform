"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Building2, 
  Users, 
  Award, 
  Star,
  TrendingUp,
  Shield,
  Heart,
  Globe,
  Phone
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const stats = [
  { icon: Building2, value: "850+", label: "Properties Sold", color: "text-orange-600" },
  { icon: Users, value: "2,500+", label: "Happy Clients", color: "text-blue-600" },
  { icon: Award, value: "15+", label: "Awards Won", color: "text-yellow-500" },
  { icon: Star, value: "12+", label: "Years Experience", color: "text-green-600" },
];

const features = [
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Bank-level security for all your real estate transactions",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Real-time market data and investment opportunities",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "24/7 support and personalized service for every client",
    color: "bg-red-50 text-red-600"
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Access to international property markets and opportunities",
    color: "bg-purple-50 text-purple-600"
  }
];

const teamMembers = [
  {
    name: "Ahmed Kamal",
    title: "CEO & Founder",
    image: "/media/img/team-1.jpg",
    experience: "15+ Years"
  },
  {
    name: "Sara Mahmoud",
    title: "Head of Sales",
    image: "/media/img/team-2.jpg",
    experience: "12+ Years"
  },
  {
    name: "Khaled Mansour",
    title: "Lead Architect",
    image: "/media/img/team-3.jpg",
    experience: "10+ Years"
  },
  {
    name: "Nour El-Din",
    title: "Marketing Director",
    image: "/media/img/team-4.jpg",
    experience: "8+ Years"
  }
];

export default function CleanAbout() {
  const { ref, inView } = useInView({ threshold: 0.1 });

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
            About <span className="text-orange-600">Y The Brokers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in navigating Egypt&apos;s dynamic real estate market. 
            We connect you with premium properties and provide expert guidance every step of the way.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story & Mission</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Founded with a vision to redefine real estate experiences in Egypt, Y The Brokers has grown 
                into a leading agency known for its integrity, market expertise, and client-centric approach.
              </p>
              <p>
                Our mission is to empower individuals and families to make informed property decisions, 
                whether buying, selling, or investing. We strive to offer a curated selection of the finest 
                residential, commercial, and coastal properties.
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Learn More
              </Button>
              <Button variant="outline" className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                Our Services
              </Button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/media/img/about-office.jpg"
                alt="Our Office"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">15+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">850+</div>
                    <div className="text-sm text-gray-600">Properties Sold</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">2.5K+</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="text-center text-white"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={24} className="text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-orange-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive real estate services with a focus on excellence, 
              integrity, and customer satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon size={24} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced professionals are dedicated to helping you achieve your real estate goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-orange-600 font-medium mb-1">{member.title}</p>
                  <p className="text-sm text-gray-500">{member.experience} Experience</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-16 bg-gray-900 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Find Your Dream Property?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Let our expert team help you find the perfect property or sell your current one. 
            Contact us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Get Free Consultation
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
              <Phone size={18} className="mr-2" />
              Call Now: +20 123 456 7890
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
