import Link from 'next/link'
import { ArrowLeft, MapPin, Users, DollarSign, Clock } from 'lucide-react'

export default async function FacilityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    // Backend data fetch (apnar dewa structure onujayi)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/facilities/${id}`, {
      cache: "no-store"  
    });
    const facility = await res.json();

    if (!facility) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-xl font-bold text-slate-800">Facility not found</h2>
          <Link href="/facilities" className="text-emerald-600 hover:underline mt-4 inline-block">
            &larr; Back to Facilities
          </Link>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Back Button */}
        <Link
          href="/facilities"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Facilities</span>
        </Link>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image & Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative h-[320px] sm:h-[380px] w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-slate-100">
              <img
                src={facility.imageUrl || "https://images.unsplash.com/photo-1574629810360-7effbe195018"}
                alt={facility.facilityName}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                {facility.sportType}
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {facility.facilityName}
              </h1>
            </div>

            {/* Info Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-50 text-emerald-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Location</p>
                  <p className="text-sm font-semibold text-slate-800">{facility.location}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-50 text-emerald-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Capacity</p>
                  <p className="text-sm font-semibold text-slate-800">Up to {facility.capacity} players</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-50 text-emerald-600">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Price</p>
                  <p className="text-sm font-semibold text-slate-800">${facility.price}/hour</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-50 text-emerald-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Slots</p>
                  <p className="text-sm font-semibold text-slate-800">{facility.timeSlot || "Available slots"}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-base">About this facility</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {facility.description || "Professional sports venue equipped with top-tier modern facilities."}
              </p>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Book This Facility</h2>
              <p className="text-xs text-slate-500 mt-0.5">Fill in your details to reserve this spot</p>
            </div>

            <form className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Facility</label>
                <input
                  type="text"
                  readOnly
                  value={facility.facilityName || ""}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Booking Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Time Slot</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                  <option value="">Select a time slot</option>
                  <option value="08:00 AM - 09:00 AM">08:00 AM - 09:00 AM</option>
                  <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                  <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Duration (Hours)</label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1 text-sm">
                <div className="flex justify-between text-slate-600 text-xs">
                  <span>${facility.price}/hr × 1 hr</span>
                  <span>${facility.price}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 text-base pt-1 border-t border-emerald-200/60">
                  <span>Total Price</span>
                  <span className="text-emerald-700">${facility.price}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition-all shadow-sm text-sm"
              >
                Confirm Booking
              </button>
            </form>
          </div>

        </div>
      </div>
    );
}