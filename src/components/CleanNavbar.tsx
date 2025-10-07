"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CleanNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-gray-950/95 backdrop-blur-xl shadow-2xl shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-white/10 bg-white/10 p-2 backdrop-blur">
              <Image
                src="/logo.png"
                alt="Y The Brokers"
                fill
                sizes="44px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
                Y The Brokers
              </span>
              <span className="text-lg font-bold text-white">Real Estate Advisory</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative text-sm font-semibold uppercase tracking-[0.3em] text-white/70 transition-colors duration-300 hover:text-white"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-6 lg:flex">
            <a
              href="tel:+201234567890"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/75 transition-colors duration-300 hover:text-white"
            >
              <Phone size={16} />
              <span>+20 123 456 7890</span>
            </a>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700"
            >
              <Link href="/contact">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden bg-gray-950/95 backdrop-blur-xl md:hidden"
        >
          <div className="space-y-1 px-4 pb-6 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-xl px-3 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/80 transition-colors duration-300 hover:bg-white/5 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-4 space-y-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <div className="flex items-center gap-3 text-white/80">
                <Phone size={16} />
                <span>+20 123 456 7890</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail size={16} />
                <span>info@ythebrokers.com</span>
              </div>
              <Button
                asChild
                className="mt-2 w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
