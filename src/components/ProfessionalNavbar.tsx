"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Search, 
  User, 
  Heart, 
  Bell, 
  ChevronDown,
  Building2,
  Home,
  Waves
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";

const navigation = [
  { name: "Home", href: "/" },
  { 
    name: "Properties", 
    href: "/properties",
    children: [
      { name: "Residential", href: "/properties?type=residential", icon: Home },
      { name: "Commercial", href: "/properties?type=commercial", icon: Building2 },
      { name: "Coastal", href: "/properties?type=coastal", icon: Waves },
    ]
  },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "/careers" },
];

export default function ProfessionalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Image
                  src="/logo.png"
                  alt="Y The Brokers"
                  width={140}
                  height={45}
                  className="h-10 w-auto transition-all duration-300"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.children ? (
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="flex items-center gap-1 text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 group">
                          {item.name}
                          <ChevronDown size={16} className="group-data-[state=open]:rotate-180 transition-transform duration-200" />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          className="min-w-[200px] bg-white rounded-xl shadow-xl border border-gray-200/50 p-2 mt-2 backdrop-blur-xl"
                          sideOffset={5}
                        >
                          {item.children.map((child) => (
                            <DropdownMenu.Item key={child.name} asChild>
                              <Link
                                href={child.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 cursor-pointer"
                              >
                                <child.icon size={18} className="text-orange-500" />
                                {child.name}
                              </Link>
                            </DropdownMenu.Item>
                          ))}
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex hover:bg-orange-50 hover:text-orange-600"
              >
                <Search size={20} />
              </Button>
              
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex hover:bg-orange-50 hover:text-orange-600 relative"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>

              {/* Favorites */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex hover:bg-orange-50 hover:text-orange-600"
              >
                <Heart size={20} />
              </Button>

              {/* User Menu */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden md:flex items-center gap-2 hover:bg-orange-50 hover:text-orange-600"
                  >
                    <User size={20} />
                    <span className="text-sm font-medium">Account</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[200px] bg-white rounded-xl shadow-xl border border-gray-200/50 p-2 mt-2 backdrop-blur-xl"
                    sideOffset={5}
                  >
                    <DropdownMenu.Item asChild>
                      <Link
                        href="/login"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 cursor-pointer"
                      >
                        <User size={18} />
                        Login
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                      <Link
                        href="/register"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 cursor-pointer"
                      >
                        <User size={18} />
                        Register
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="h-px bg-gray-200 my-2" />
                    <DropdownMenu.Item asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 cursor-pointer"
                      >
                        <User size={18} />
                        My Profile
                      </Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              {/* CTA Button */}
              <Button
                asChild
                className="hidden md:flex bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/contact">
                  Get Started
                </Link>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl"
            >
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-gray-900 mb-2">
                          {item.name}
                        </div>
                        <div className="pl-4 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="flex items-center gap-3 text-gray-600 hover:text-orange-600 transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <child.icon size={16} className="text-orange-500" />
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                  >
                    <Link href="/register">Get Started</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Dialog */}
      <Dialog.Root open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 p-6">
            <div className="flex items-center gap-4 mb-6">
              <Search size={24} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search properties, locations, or keywords..."
                className="flex-1 text-lg border-none outline-none placeholder-gray-400"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500 mb-3">Quick Search</div>
              <div className="grid grid-cols-2 gap-2">
                {["New Cairo", "North Coast", "Commercial", "Residential"].map((term) => (
                  <button
                    key={term}
                    className="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
