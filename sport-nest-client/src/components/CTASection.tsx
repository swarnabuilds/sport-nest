"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-emerald-700 py-20 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Ready to Book Your Next Game?
        </h2>
        <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto mb-8">
          Join thousands of sports enthusiasts who trust SportNest for their bookings.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-white hover:bg-emerald-50 text-emerald-800 font-semibold rounded-full px-8 py-6 text-base gap-2 shadow-sm transition-all"
          >
            Browse Facilities
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-emerald-600 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-full px-8 py-6 text-base shadow-sm transition-all"
          >
            Create Free Account
          </Button>
        </div>
      </div>
    </section>
  );
}