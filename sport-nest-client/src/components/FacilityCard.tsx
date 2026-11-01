import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Clock } from "lucide-react";

interface Facility {
  _id?: string;
  facilityName: string;
  sportType: string;
  imageUrl: string;
  location: string;
  price: string | number;
  capacity: string | number;
  timeSlot?: string;
}

export default function FacilityCard({ facility }: { facility: Facility }) {
  // ইমেজ ইউআরএল ভ্যালিড কি না চেক করার লজিক
  const validImageUrl =
    facility.imageUrl && facility.imageUrl.startsWith("http")
      ? facility.imageUrl
      : "https://images.unsplash.com/photo-1574629810360-7effbe195018";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 w-full bg-slate-100">
        <Image
          src={validImageUrl}
          alt={facility.facilityName || "Sports Facility"}
          fill
          className="object-cover"
        />
        {/* Sport Type Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {facility.sportType}
        </span>
        {/* Price Badge */}
        <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white font-semibold text-xs px-2.5 py-1 rounded-full shadow-sm">
          ${facility.price}/hr
        </span>
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-1">
            {facility.facilityName}
          </h3>

          <div className="space-y-1.5 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{facility.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Up to {facility.capacity} players</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{facility.timeSlot || "Available slots"}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/facilities/${facility._id || ""}`}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm py-2.5 rounded-xl transition-all text-center shadow-sm block"
        >
          Book Now &rarr;
        </Link>
      </div>
    </div>
  );
}