"use client";

import React, { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client"; // Better Auth Hook
import { getTokenFromServer } from "@/lib/getTokenFromServer";

interface BookingFormProps {
  facility: {
    _id?: string;
    facilityName: string;
    price: number | string;
    [key: string]: any;
  };
}

export default function BookingForm({ facility }: BookingFormProps) {
  // ১. লগ ইন করা ইউজারের সেশন ফেচ করা
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // ডাইনামিক প্রাইস এবং ডিউরেশন হিসাব করার স্টেট
  const [duration, setDuration] = useState<number>(1);
  const facilityPrice = Number(facility?.price || 0);

  const handleConfirmBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // টাইপ এরর সমাধানের জন্য Record<string, any> ব্যবহার করা হয়েছে
    const bookingData: Record<string, any> = Object.fromEntries(
      formData.entries(),
    );

    // প্লেয়ার্স সংখ্যাকে নাম্বারে রূপান্তর এবং মোট মূল্য হিসাব করা
    bookingData.playersCount = Number(bookingData.playersCount);
    bookingData.totalPrice = facilityPrice * duration;

    // ইউজারের ইমেজ যদি থাকে তা পাঠানো
    if (user?.image) {
      bookingData.userImage = user.image;
    }

    //access token fom server
    const token = await getTokenFromServer();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/facilities/booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.add({
          title: "Booking Confirmed! 🎉",
          description: `Your slot for ${facility?.facilityName || "the facility"} has been successfully booked.`,
        });
        form.reset();
        setDuration(1);
      } else {
        toast.add({
          title: "Booking Failed",
          description:
            data?.message ||
            "Could not confirm your booking. Please try again.",
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.add({
        title: "Error",
        description: "Something went wrong. Please check your connection.",
      });
    }
  };

  return (
    <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Book This Facility</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Fill in your details to reserve this spot
        </p>
      </div>

      {/* লগ ইন করা ইউজারের Profile Preview & Avatar */}
      {user && (
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-emerald-200 bg-emerald-100 justify-center items-center font-bold text-emerald-700">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{user.name?.charAt(0)?.toUpperCase() || "U"}</span>
            )}
          </div>
          <div className="text-xs">
            <p className="font-semibold text-slate-800">
              {user.name || "Logged in User"}
            </p>
            <p className="text-slate-500">{user.email}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleConfirmBooking} className="space-y-4">
        {/* Hidden Facility ID */}
        <input type="hidden" name="facilityId" value={facility?._id || ""} />

        {/* Facility Name (Readonly) */}
        <div className="space-y-1.5">
          <label
            htmlFor="facilityName"
            className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
          >
            Facility
          </label>
          <input
            id="facilityName"
            name="facilityName"
            type="text"
            readOnly
            value={facility?.facilityName || ""}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none"
          />
        </div>

        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="fullName"
            className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            defaultValue={user?.name || ""}
            placeholder="Enter your full name"
            required
            readOnly={!!user?.name}
            className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              user?.name ? "bg-slate-50" : "bg-white"
            }`}
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={user?.email || ""}
            placeholder="name@example.com"
            required
            readOnly={!!user?.email}
            className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              user?.email ? "bg-slate-50" : "bg-white"
            }`}
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="01XXXXXXXXX"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>

        {/* Number of Players Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="playersCount"
            className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
          >
            Number of Players
          </label>
          <input
            id="playersCount"
            name="playersCount"
            type="number"
            min="1"
            defaultValue="1"
            placeholder="Enter total players"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>

        {/* Booking Date & Start Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label
              htmlFor="bookingDate"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
            >
              Booking Date
            </label>
            <input
              id="bookingDate"
              name="bookingDate"
              type="date"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="startTime"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
            >
              Start Time
            </label>
            <input
              id="startTime"
              name="startTime"
              type="time"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>
        </div>

        {/* Time Slot */}
        <div className="space-y-1.5">
          <label
            htmlFor="timeSlot"
            className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
          >
            Time Slot
          </label>
          <select
            id="timeSlot"
            name="timeSlot"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="">Select a time slot</option>
            <option value="08:00 AM - 09:00 AM">08:00 AM - 09:00 AM</option>
            <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
            <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
          </select>
        </div>

        {/* Duration */}
        <div className="space-y-1.5">
          <label
            htmlFor="duration"
            className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
          >
            Duration (Hours)
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>

        {/* Price Calculation Box */}
        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1 text-sm">
          <div className="flex justify-between text-slate-600 text-xs">
            <span>
              ${facilityPrice}/hr × {duration} hr
            </span>
            <span>${facilityPrice * duration}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-900 text-base pt-1 border-t border-emerald-200/60">
            <span>Total Price</span>
            <span className="text-emerald-700">
              ${facilityPrice * duration}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition-all shadow-sm text-sm disabled:opacity-50"
        >
          {isPending ? "Loading User Details..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
