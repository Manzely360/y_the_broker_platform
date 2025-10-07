"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building2, Users, Award, TrendingUp, Home, Star } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "500+",
    label: "Projects Completed",
    description: "Successfully delivered premium real estate projects",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Users,
    value: "10,000+",
    label: "Happy Clients",
    description: "Satisfied customers across Egypt and beyond",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Award,
    value: "25+",
    label: "Awards Won",
    description: "Industry recognition and excellence awards",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Success Rate",
    description: "Client satisfaction and project success rate",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Home,
    value: "50+",
    label: "Cities Covered",
    description: "Nationwide presence across major Egyptian cities",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Client Rating",
    description: "Average rating from our valued clients",
    color: "from-yellow-500 to-yellow-600"
  }
];

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the scale of our success and the trust we&apos;ve built with clients 
            across Egypt&apos;s real estate landscape.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-500 h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <stat.icon size={32} className="text-white" />
                </motion.div>

                {/* Value */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
                  className="text-4xl lg:text-5xl font-bold text-white mb-2"
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Join Our Success Story?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Be part of our growing community of satisfied clients and discover 
              your perfect property with Egypt&apos;s leading real estate experts.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Start Your Journey Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
