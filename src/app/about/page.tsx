"use client";

import { motion } from "framer-motion";
import { Building2, Users, Award, Target, CheckCircle, Star } from "lucide-react";
import Image from "next/image";
import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleFooter from "@/components/SimpleFooter";

const stats = [
  { icon: Building2, value: "500+", label: "Projects Completed" },
  { icon: Users, value: "10,000+", label: "Happy Clients" },
  { icon: Award, value: "25+", label: "Awards Won" },
  { icon: Star, value: "4.9/5", label: "Client Rating" },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To provide exceptional real estate services and help our clients find their perfect property in Egypt's most prestigious locations."
  },
  {
    icon: Users,
    title: "Our Vision",
    description: "To be Egypt's leading real estate platform, known for our integrity, expertise, and commitment to client satisfaction."
  },
  {
    icon: Award,
    title: "Our Values",
    description: "We uphold the highest standards of professionalism, transparency, and customer service in everything we do."
  }
];

const team = [
  {
    name: "Ahmed Hassan",
    role: "CEO & Founder",
    image: "/media/img/team-1.jpg",
    description: "15+ years in real estate with expertise in luxury properties and commercial developments."
  },
  {
    name: "Sarah Mohamed",
    role: "Head of Sales",
    image: "/media/img/team-2.jpg",
    description: "Specialized in residential properties and client relations with a proven track record."
  },
  {
    name: "Omar El-Sayed",
    role: "Commercial Director",
    image: "/media/img/team-3.jpg",
    description: "Expert in commercial real estate and investment properties across Egypt."
  },
  {
    name: "Fatima Ali",
    role: "Marketing Director",
    image: "/media/img/team-4.jpg",
    description: "Leading our marketing efforts and brand development in the Egyptian market."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNavbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 to-orange-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">About Y The Brokers</h1>
              <p className="text-xl text-orange-100 max-w-3xl mx-auto">
                Your trusted partner in real estate, offering premium properties and expert advice 
                across Egypt&apos;s most prestigious locations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon size={32} className="text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Founded in 2010, Y The Brokers has grown from a small local real estate agency 
                  to become one of Egypt&apos;s most trusted property platforms. We specialize in 
                  premium residential, commercial, and coastal properties across the country.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our team of experienced professionals is dedicated to providing exceptional 
                  service and helping our clients make informed decisions about their real estate 
                  investments. We pride ourselves on our deep market knowledge and commitment to 
                  transparency and integrity.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-600" />
                    <span className="text-gray-700">Licensed & Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-600" />
                    <span className="text-gray-700">Award Winning</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <Image
                    src="/media/img/about-office.jpg"
                    alt="Y The Brokers Office"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do and shape our commitment to excellence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon size={32} className="text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our experienced professionals are here to help you find your perfect property.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Work With Us?</h2>
              <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
                Let us help you find your perfect property or sell your current one. 
                Contact our team today for a consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-3 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Contact Us
                </a>
                <a
                  href="/properties"
                  className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-orange-600 transition-colors font-semibold"
                >
                  Browse Properties
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <SimpleFooter />
    </div>
  );
}
