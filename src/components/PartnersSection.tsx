"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

const partners = [
  {
    id: 1,
    name: "Ora Developers",
    logo: "/media/img/ORA-1-150x150.png",
    description: "Leading real estate developer with premium projects across Egypt",
    category: "Developer"
  },
  {
    id: 2,
    name: "Palm Hills",
    logo: "/media/img/PALM-2-300x162.png",
    description: "Pioneer in integrated communities and luxury developments",
    category: "Developer"
  },
  {
    id: 3,
    name: "Sodic",
    logo: "/media/img/idvZy72JnlKaiTi3udvByoB5jmFL16sodic-1-592x400.png",
    description: "Creating exceptional living experiences in prime locations",
    category: "Developer"
  },
  {
    id: 4,
    name: "Aldar",
    logo: "/media/img/Aldar-150x150.png",
    description: "UAE-based developer expanding into Egyptian market",
    category: "Developer"
  },
  {
    id: 5,
    name: "Tatweer Misr",
    logo: "/media/img/Tat-Logo-white1-300x74.png",
    description: "Innovative real estate solutions and smart city development",
    category: "Developer"
  },
  {
    id: 6,
    name: "Upwyde",
    logo: "/media/img/Upwyde-150x150.jpg",
    description: "Modern residential and commercial developments",
    category: "Developer"
  }
];

export default function PartnersSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We work with Egypt&apos;s leading real estate developers to bring you 
            the finest properties and investment opportunities.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}>
                <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-orange-300 shadow-lg hover:shadow-2xl transition-all duration-500 group h-full">
                  {/* Logo */}
                  <div className="flex justify-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-50 transition-colors duration-300"
                    >
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={80}
                        height={80}
                        className="object-contain max-w-full max-h-full"
                      />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      {partner.name}
                    </h3>
                    
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full mb-4">
                      {partner.category}
                    </span>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {partner.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-3xl p-8 border border-orange-200">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Partner With Us
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Are you a developer looking to showcase your projects? Join our network 
              of trusted partners and reach thousands of potential buyers.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Become a Partner
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
