"use client";

import { Calendar, Shield, Award } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Instant Booking",
    desc: "Reserve your favourite sports facility in under 60 seconds, anytime, anywhere.",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "JWT-protected accounts and encrypted transactions keep your data safe.",
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    icon: Award,
    title: "Premium Venues",
    desc: "Hand-curated, top-quality sports facilities across the city.",
    iconBg: "bg-amber-50 text-amber-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Why Choose SportNest?</h2>
        <p className="text-slate-500 mb-12">
          Everything you need for a seamless sports booking experience
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-slate-50/60 rounded-2xl p-8 border border-slate-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1"
              >
                <div className={`p-3.5 rounded-xl mb-5 ${item.iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}