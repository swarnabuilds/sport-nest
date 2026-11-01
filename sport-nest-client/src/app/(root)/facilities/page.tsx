import React from "react";
import FacilityCard from "@/components/FacilityCard";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

export default async function FacilitiesPage() {

  // Backend data fetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/facilities`, {
    cache: "no-store"  
  });
  const allFacilitiesData = await res.json();
  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">All Facilities</h1>
        <p className="text-sm text-slate-500 mt-1">
          Browse {allFacilitiesData.length} sports venues available for booking
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by facility name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>All Sports</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span>Price</span>
          </button>
        </div>
      </div>

      {/* Facilities Grid */}
      {allFacilitiesData.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80">
          <p className="text-slate-500 text-sm">No facilities found. Add a new facility from your dashboard!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allFacilitiesData.map((facility: any) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>
      )}
    </div>
  );
}