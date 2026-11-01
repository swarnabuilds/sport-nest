"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Calendar, Clock, MapPin, DollarSign, Users, Trash2, BookmarkCheck } from "lucide-react";
import { toast } from "@/components/ui/toast";

export default function MyBookingsPage() {
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ইউজারের ইমেইল দিয়ে বুকিং ডেটা ফেচ করা
  useEffect(() => {
    async function fetchMyBookings() {
      if (session?.user?.email) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/facilities/bookings/${session.user.email}`);
          if (res.ok) {
            const data = await res.json();
            setBookings(data);
          }
        } catch (err) {
          console.error("Failed to fetch bookings:", err);
        } finally {
          setLoading(false);
        }
      } else if (!isPending) {
        setLoading(false);
      }
    }

    fetchMyBookings();
  }, [session, isPending]);

  // বুকিং ক্যানসেল করার হ্যান্ডলার (Toast সহ)
  const handleCancelBooking = async (id: string, facilityName: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setBookings((prev) => prev.filter((item) => item._id !== id));
        toast.add({ title: `Booking for "${facilityName || 'Facility'}" cancelled successfully!`, type: "success" });
      } else {
        toast.add({ title: data?.message || "Failed to cancel booking", type: "error" });
      }
    } catch (error) {
      console.error("Cancel error:", error);
      toast.add({ title: "Something went wrong!", type: "error" });
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* পেজ হেডার */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
        <p className="text-sm text-slate-500 mt-1">
          View and manage your reserved sports facilities ({bookings.length} bookings found)
        </p>
      </div>

      {/* বুকিং না থাকলে খালি স্টেট */}
      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <BookmarkCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">No Bookings Found</h3>
          <p className="text-sm text-slate-500 mt-1">You haven't reserved any sports venues yet.</p>
        </div>
      ) : (
        /* বুকিং কার্ড গ্রিড */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* কার্ড টপ স্ট্যাটাস ও নাম */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start">
                  <div>
                    <span className="inline-block bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                      Confirmed
                    </span>
                    <h3 className="font-bold text-lg text-slate-900 truncate">
                      {booking.facilityName || "Sports Facility"}
                    </h3>
                  </div>
                </div>

                {/* বুকিং ডিটেইলস */}
                <div className="p-5 space-y-3 text-sm text-slate-600">
                  <p className="flex items-center gap-2 text-xs">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium text-slate-700">Date:</span> {booking.bookingDate}
                  </p>

                  <p className="flex items-center gap-2 text-xs">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium text-slate-700">Time Slot:</span> {booking.timeSlot} ({booking.duration} hr)
                  </p>

                  <p className="flex items-center gap-2 text-xs">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium text-slate-700">Players:</span> {booking.playersCount || 1} Persons
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4 text-sm font-semibold">
                    <span className="flex items-center text-emerald-600">
                      <DollarSign className="w-4 h-4" />
                      Total Paid: ${booking.totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* অ্যাকশন বাটন (Cancel Booking) */}
              <div className="px-5 pb-5 pt-0">
                <button
                  onClick={() => handleCancelBooking(booking._id, booking.facilityName)}
                  className="w-full flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl text-xs font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}