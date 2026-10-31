"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  {
    quote:
      '"SportNest made booking our weekly matches incredibly easy. The slots are always available and the UI is super clean!"',
    name: "Rafiq Ahmed",
    role: "Football Player",
    initials: "RA",
    avatarBg: "bg-emerald-600 text-white",
  },
  {
    quote:
      '"I love how I can filter by sport type and find exactly the court I need. No more calling venues manually!"',
    name: "Priya Sharma",
    role: "Badminton Enthusiast",
    initials: "PS",
    avatarBg: "bg-orange-600 text-white",
  },
  {
    quote:
      '"As a facility owner, managing bookings through SportNest has saved me hours every week. Highly recommended."',
    name: "Karim Hassan",
    role: "Swimming Coach",
    initials: "KH",
    avatarBg: "bg-cyan-600 text-white",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-emerald-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">What Athletes Say</h2>
        <p className="text-slate-500 mb-12">
          Trusted by thousands of sports enthusiasts across the country
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {/* Review Quote */}
                <p className="text-slate-600 text-sm italic leading-relaxed mb-8">
                  {review.quote}
                </p>
              </div>

              {/* User Details */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={`font-semibold text-xs ${review.avatarBg}`}>
                    {review.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                  <p className="text-slate-400 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}