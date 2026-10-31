"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const facilities = [
  {
    id: 1,
    title: "abdur rahim",
    category: "TENNIS",
    location: "dhaka",
    players: "Up to 12 players",
    slots: "0 slots available",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    title: "kdi",
    category: "TENNIS",
    location: "mars",
    players: "Up to 2 players",
    slots: "0 slots available",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    title: "Olympic Swimming Pool",
    category: "SWIMMING",
    location: "Sydney, Australia",
    players: "Up to 50 players",
    slots: "0 slots available",
    image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&q=80&w=600",
  },
];

export default function FeaturedFacilities() {
  return (
    <section className="py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Facilities</h2>
            <p className="text-slate-500 text-sm mt-1">
              Top-rated venues available for your next game
            </p>
          </div>
          <Link
            href="/facilities"
            className="flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Image & Badge Container */}
                <div className="relative h-48 w-full">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 font-semibold text-xs tracking-wide border-none px-2.5 py-1">
                      {facility.category}
                    </Badge>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 mb-3 capitalize">
                    {facility.title}
                  </h3>
                  
                  <div className="space-y-2 text-xs sm:text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{facility.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{facility.players}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{facility.slots}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-5 pt-0">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium gap-2">
                  Book Now <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}