"use client";

import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-emerald-950 text-white overflow-hidden py-20 lg:py-28">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000')`
        }}
      />
      
      {/* Top Green Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-emerald-950/80 via-emerald-950/70 to-emerald-950/90" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Floating Side Badges */}
        <div className="hidden lg:flex absolute left-8 top-1/4 items-center gap-2 bg-emerald-900/60 backdrop-blur-md border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs text-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          500+ Active Facilities
        </div>

        <div className="hidden lg:flex absolute right-8 bottom-1/3 items-center gap-2 bg-emerald-900/60 backdrop-blur-md border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs text-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          10,000+ Bookings Made
        </div>

        {/* Center Pill Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-500/40 rounded-full px-4 py-1.5 mb-8 text-emerald-300 text-xs sm:text-sm font-medium backdrop-blur-sm">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>#1 Sports Booking Platform</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6">
          Book Your <br />
          <span className="text-emerald-400">Perfect Court</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl font-normal leading-relaxed mb-10">
          Discover and reserve premium sports facilities — football turfs, 
          badminton courts, swimming lanes, and more. Instant booking, zero hassle.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full px-8 py-6 text-base gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            Explore Facilities
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-emerald-500/50 bg-emerald-900/30 hover:bg-emerald-900/50 text-white font-semibold rounded-full px-8 py-6 text-base backdrop-blur-sm transition-all"
          >
            Get Started Free
          </Button>
        </div>

        {/* Bottom Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-8 border-t border-emerald-800/40 w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">500+</span>
            <span className="text-xs sm:text-sm text-gray-400 mt-1">Facilities</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">10K+</span>
            <span className="text-xs sm:text-sm text-gray-400 mt-1">Bookings</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">6</span>
            <span className="text-xs sm:text-sm text-gray-400 mt-1">Sports</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">4.9★</span>
            <span className="text-xs sm:text-sm text-gray-400 mt-1">Rating</span>
          </div>
        </div>

      </div>
    </section>
  );
}