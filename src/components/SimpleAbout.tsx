"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building2, Users, Award, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const stats = [
  { icon: Building2, value: "850+", label: "Properties Sold" },
  { icon: Users, value: "2,500+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Awards Won" },
  { icon: Star, value: "12+", label: "Years Experience" },
];

const differentiators = [
  "Dedicated consultants across luxury, coastal, and commercial asset classes.",
  "Long-term partnerships with Egypt’s most trusted developers and operators.",
  "Seamless end-to-end guidance from property tours to contract finalisation.",
];

export default function SimpleAbout() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 -top-48 h-72 bg-gradient-to-b from-orange-100/60 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-orange-700">
              Who We Are
            </span>
            <h2 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl">
              About <span className="text-orange-600">Y The Brokers</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Founded to redefine the real estate advisory experience, Y The Brokers has become a trusted partner for
              discerning homeowners and investors across Egypt. We blend deep market knowledge with concierge-style
              service to ensure every transaction is effortless and rewarding.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Whether you are acquiring a signature residence, leasing a commercial flagship, or expanding an investment
              portfolio, our specialists bring clarity, insight, and judgement at every stage.
            </p>

            <ul className="mt-6 space-y-4 text-gray-700">
              {differentiators.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="mt-1 flex-shrink-0 text-orange-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button className="rounded-xl bg-orange-600 px-8 py-3 text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-xl">
                Discover Our Story
              </Button>
              <div className="text-sm text-gray-500">
                Trusted by leading developers and families nationwide.
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="rounded-2xl bg-white p-6 shadow-lg shadow-orange-100/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                      <stat.icon size={24} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <div className="relative col-span-2 overflow-hidden rounded-3xl">
                <Image
                  src="/media/img/sun-capital.jpg"
                  alt="Sun Capital Villas"
                  width={900}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">6th of October City</p>
                  <p className="mt-1 text-xl font-semibold">Sun Capital Villas</p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/media/img/mid_town_new_cairo.jpg"
                  alt="Midtown New Cairo"
                  width={450}
                  height={320}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs uppercase text-white/70">New Cairo</p>
                  <p className="text-lg font-semibold">Midtown Residences</p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/media/img/park-yard2.jpg"
                  alt="Park Yard Community"
                  width={450}
                  height={320}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800">
                  Family Living
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs uppercase text-white/70">Sheikh Zayed</p>
                  <p className="text-lg font-semibold">Park Yard Community</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 left-1/2 hidden -translate-x-1/2 lg:flex">
              <div className="rounded-2xl bg-white px-6 py-5 shadow-2xl shadow-orange-200/30">
                <p className="text-sm uppercase tracking-[0.4em] text-gray-400">Since 2012</p>
                <p className="mt-2 text-3xl font-bold text-orange-600">12+ Years</p>
                <p className="text-sm text-gray-500">Of award-winning market leadership</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
