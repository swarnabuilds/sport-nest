"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Home, Calendar, PlusSquare, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "My Bookings",
      href: "/dashboard/my-bookings",
      icon: Calendar,
    },
    {
      name: "Add Facility",
      href: "/dashboard/add-facility",
      icon: PlusSquare,
    },
    {
      name: "Manage Facilities",
      href: "/dashboard/my-facilities",  
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-100 flex flex-col shrink-0">
      {/* Top Brand Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-emerald-500 text-white p-1.5 rounded-xl flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">
            Sport<span className="text-emerald-600">Nest</span>
          </span>
        </Link>
      </div>

      {/* Navigation Content */}
      <div className="p-4 space-y-6">
        {/* Back to Home Link */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <Home className="w-4 h-4 text-slate-400" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Section Label */}
        <div>
          <h4 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Management
          </h4>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}