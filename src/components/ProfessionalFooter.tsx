"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Shield,
  Award,
  Users
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Press", href: "/press" },
  ],
  services: [
    { label: "Buy Property", href: "/buy" },
    { label: "Sell Property", href: "/sell" },
    { label: "Rent Property", href: "/rent" },
    { label: "Property Management", href: "/management" },
    { label: "Investment Advisory", href: "/advisory" },
  ],
  properties: [
    { label: "Residential", href: "/properties?type=residential" },
    { label: "Commercial", href: "/properties?type=commercial" },
    { label: "Coastal", href: "/properties?type=coastal" },
    { label: "Luxury", href: "/properties?type=luxury" },
    { label: "New Developments", href: "/developments" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "FAQ", href: "/faq" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ]
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-600" },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-600" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-700" },
];

const features = [
  { icon: Shield, label: "Secure Transactions", description: "Bank-level security" },
  { icon: Award, label: "Award Winning", description: "Best real estate platform" },
  { icon: Users, label: "Expert Team", description: "Professional agents" },
  { icon: Heart, label: "Customer First", description: "24/7 support" },
];

export default function ProfessionalFooter() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="py-16 border-b border-gray-800"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get the latest property listings, market insights, and exclusive offers 
              delivered directly to your inbox.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <Button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 px-6">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <Image
                  src="/logo.png"
                  alt="Y The Brokers"
                  width={140}
                  height={45}
                  className="h-10 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner in real estate, offering premium properties and expert advice 
                across Egypt&apos;s most prestigious locations.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin size={16} className="text-orange-500 flex-shrink-0" />
                  <span className="text-sm">123 Real Estate St, Cairo, Egypt</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone size={16} className="text-orange-500 flex-shrink-0" />
                  <span className="text-sm">+20 123 456 7890</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail size={16} className="text-orange-500 flex-shrink-0" />
                  <span className="text-sm">info@ythebrokers.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Clock size={16} className="text-orange-500 flex-shrink-0" />
                  <span className="text-sm">Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-colors duration-300`}
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Properties Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Properties</h4>
              <ul className="space-y-3">
                {footerLinks.properties.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="py-12 border-t border-gray-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600/30 transition-colors duration-300">
                  <feature.icon size={24} className="text-orange-500" />
                </div>
                <h5 className="font-semibold text-white mb-2">{feature.label}</h5>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="py-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Y The Brokers. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-orange-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-orange-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="hover:text-orange-400 transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
