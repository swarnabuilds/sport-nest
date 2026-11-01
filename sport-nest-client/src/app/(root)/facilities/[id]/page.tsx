import Link from 'next/link';
import { ArrowLeft, MapPin, Users, DollarSign, Clock } from 'lucide-react';
import BookingForm from '@/components/BookingForm';

export default async function FacilityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    let facility = null;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/facilities/${id}`, {
        cache: "no-store"  
      });
      if (res.ok) {
        facility = await res.json();
      }
    } catch (error) {
      console.error("Error fetching facility details:", error);
    }

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

    //  fallback
    const facilityImage = facility.imageUrl || "https://images.unsplash.com/photo-1574629810360-7effbe195018";

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
                src={facilityImage}
                alt={facility.facilityName || "Sports Facility"}
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

          {/* Right Column: Reusable Client Booking Form Component */}
          <BookingForm facility={facility} />

        </div>
      </div>
    );
}