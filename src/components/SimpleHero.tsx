"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Building2, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import AdvancedSearchBar from "@/components/AdvancedSearchBar";

const highlights = [
  {
    title: "Premium Residences",
    description: "Handpicked villas, penthouses, and designer apartments tailored for modern living.",
    icon: Building2,
  },
  {
    title: "Strategic Locations",
    description: "Access vibrant communities across New Cairo, the North Coast, and Sheikh Zayed.",
    icon: MapPin,
  },
  {
    title: "Trusted Advisory",
    description: "Award-winning consultants delivering data-led guidance and bespoke investment plans.",
    icon: ShieldCheck,
  },
];

export default function SimpleHero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setIsVideoPlaying(false));
    }
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      video.pause();
    } else {
      video.play().catch(() => undefined);
    }

    setIsVideoPlaying((prev) => !prev);
  };

  return (
    <section className="relative min-h-screen flex items-center py-24 sm:py-32 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/img/hero-bg.jpg"
        >
          <source src="/media/video/Y-The-Brokers-Video-Website-1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 backdrop-blur">
            Y The Brokers
          </span>
          <h1 className="mt-6 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            Egypt&apos;s Premier Real Estate Advisory
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-3xl leading-relaxed">
            From signature waterfront retreats to investment-grade commercial opportunities, our specialists curate
            best-in-class properties that elevate your portfolio and lifestyle.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {highlights.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-7 text-left shadow-lg backdrop-blur"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10">
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-white/75">{description}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12"
        >
          <AdvancedSearchBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex justify-center"
        >
          <Button
            onClick={toggleVideo}
            variant="outline"
            className="flex items-center gap-2 rounded-full border-2 border-white/70 bg-white/10 px-8 py-3 text-white transition-all duration-300 hover:bg-white hover:text-gray-900"
          >
            {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isVideoPlaying ? "Pause Background Video" : "Play Background Video"}
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 transform text-white"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-[0.4em] text-white/70">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-14 w-8 items-center justify-center rounded-full border border-white/60"
          >
            <div className="h-2 w-2 rounded-full bg-white" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
