"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Projects",
    items: [
      { label: "Residential", href: "/residential-projects" },
      { label: "Coastal", href: "/coastal" },
      { label: "Commercial", href: "/commercial" },
    ],
  },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [projOpen, setProjOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Y The Brokers" className="h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) =>
            item.items ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setProjOpen(true)}
                onMouseLeave={() => setProjOpen(false)}
              >
                <button className="inline-flex items-center gap-1 text-sm font-medium hover:text-orange-600">
                  {item.label} <ChevronDown size={16} />
                </button>
                {projOpen && (
                  <div className="absolute left-0 mt-3 w-56 rounded-lg border bg-white shadow-lg p-2">
                    {item.items.map((i) => (
                      <Link key={i.label} href={i.href} className="block px-3 py-2 rounded-md text-sm hover:bg-slate-50">
                        {i.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.label} href={item.href} className="text-sm font-medium hover:text-orange-600">
                {item.label}
              </Link>
            )
          )}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm hover:text-orange-600">Login</Link>
            <Link href="/register" className="text-sm rounded-full bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">Register</Link>
          </div>
        </nav>

        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-2">
            {nav.map((item) =>
              item.items ? (
                <details key={item.label} className="group">
                  <summary className="cursor-pointer list-none text-sm font-medium flex items-center justify-between">
                    {item.label} <ChevronDown size={16} className="group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-2 pl-3 space-y-1">
                    {item.items.map((i) => (
                      <Link key={i.label} href={i.href} className="block text-sm py-1.5">
                        {i.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link key={item.label} href={item.href} className="block text-sm py-1.5">
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-2 flex items-center gap-3">
              <Link href="/login" className="text-sm">Login</Link>
              <Link href="/register" className="text-sm rounded-full bg-orange-600 px-3 py-1.5 text-white">Register</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
