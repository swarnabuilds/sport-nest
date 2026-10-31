"use client";

import Link from "next/link";
import { Trophy, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-emerald-500 text-white p-1.5 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Sport<span className="text-emerald-500">Nest</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Book your perfect sports facility in seconds. From football turfs to swimming lanes, we have it all.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {["f", "𝕏", "in", "📸"].map((icon, index) => (
                <div
                  key={index}
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white text-sm hover:bg-emerald-600 transition-colors cursor-pointer"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {["All Facilities", "My Bookings", "Add Facility", "Login", "Register"].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-emerald-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>support@sportnest.app</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>© 2026 SportNest. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <span className="text-red-500">❤</span> for sports lovers
          </p>
        </div>
      </div>
    </footer>
  );
}