'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  const heroVideos = [
    '/media/video/Y-The-Brokers-Video-Website-1.mp4',
    '/media/video/Project-Name.mov',
  ];

  const heroImages = [
    '/media/img/hero-1.webp',
    '/media/img/hero-2.webp',
    '/media/img/hero-3.webp',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
    }, 10000); // Change video every 10 seconds

    return () => clearInterval(interval);
  }, [heroVideos.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        {heroVideos[currentVideoIndex] ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={heroImages[currentVideoIndex] || '/media/img/hero-1.webp'}
          >
            <source src={heroVideos[currentVideoIndex]} type="video/mp4" />
            <source src={heroVideos[currentVideoIndex]} type="video/quicktime" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroImages[currentVideoIndex] || '/media/img/hero-1.webp'})`,
            }}
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Certified Projects
            </span>
          </h1>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8">
            By Y The Brokers
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Discover exceptional properties across Egypt&apos;s most prestigious locations. 
            From luxury coastal resorts to prime commercial spaces, we bring you the finest real estate opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/projects"
              className="btn btn-primary text-lg px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
            >
              Explore Properties
            </Link>
            
            <Link
              href="/contact"
              className="btn btn-outline text-lg px-8 py-4 rounded-lg font-semibold border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex space-x-2">
        {heroVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideoIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              currentVideoIndex === index
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Switch to video ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
