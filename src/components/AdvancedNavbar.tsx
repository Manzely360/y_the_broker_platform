"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, User, Heart, Bell } from "lucide-react";
import { useInView } from "react-intersection-observer";

const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Properties",
    items: [
      { label: "Residential", href: "/residential", icon: "🏠" },
      { label: "Commercial", href: "/commercial", icon: "🏢" },
      { label: "Coastal", href: "/coastal", icon: "🏖️" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Careers", href: "/careers" },
];

export default function AdvancedNavbar() {
  const [open, setOpen] = useState(false);
  const [projOpen, setProjOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      ref={ref}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3"
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">Y</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  The Brokers
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Premium Real Estate</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => item.items && setProjOpen(true)}
                onMouseLeave={() => item.items && setProjOpen(false)}
              >
                {item.items ? (
                  <>
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200 group">
                      {item.label}
                      <motion.div
                        animate={{ rotate: projOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {projOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-3 w-64 rounded-2xl border border-gray-200/50 bg-white/95 backdrop-blur-xl shadow-2xl p-3"
                        >
                          {item.items.map((subItem, subIndex) => (
                            <motion.div
                              key={subItem.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: subIndex * 0.05 }}
                            >
                              <Link
                                href={subItem.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors duration-200 group"
                              >
                                <span className="text-lg">{subItem.icon}</span>
                                <span className="font-medium text-gray-700 group-hover:text-orange-600">
                                  {subItem.label}
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200 relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <Search size={18} className="text-gray-600" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 relative"
            >
              <Bell size={18} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
            </motion.button>

            {/* Favorites */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <Heart size={18} className="text-gray-600" />
            </motion.button>

            {/* User Menu */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2"
            >
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
              >
                <User size={16} />
                <span className="text-sm font-medium">Login</span>
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Register
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              onClick={() => setOpen(!open)}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl"
          >
            <div className="px-4 py-6 space-y-4">
              {nav.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.items ? (
                    <details className="group">
                      <summary className="cursor-pointer list-none text-sm font-medium flex items-center justify-between py-2">
                        {item.label}
                        <ChevronDown size={16} className="group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="mt-2 pl-4 space-y-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="flex items-center gap-2 text-sm py-2 text-gray-600 hover:text-orange-600"
                          >
                            <span>{subItem.icon}</span>
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-sm font-medium py-2 text-gray-700 hover:text-orange-600"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <div className="pt-4 flex items-center gap-3">
                <Link
                  href="/login"
                  className="flex-1 text-center py-2 px-4 rounded-full border border-gray-200 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex-1 text-center py-2 px-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
