"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-emerald-500 text-white p-1.5 rounded-full flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">
            Sport<span className="text-emerald-600">Nest</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/facilities"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            All Facilities
          </Link>
        </nav>

        {/* Action Button */}
        <div>
          <Button
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6 text-sm font-medium shadow-sm transition-all"
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}