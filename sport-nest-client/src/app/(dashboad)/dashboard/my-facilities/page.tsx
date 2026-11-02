"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import {
  PlusCircle,
  MapPin,
  DollarSign,
  Users,
  Trash2,
  Edit,
} from "lucide-react";
import EditFacilityModal from "@/components/EditFacilityModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal"; // Delete modal import
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export default function MyFacilitiesPage() {
  const { data: session, isPending } = useSession();
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // States for Edit and Delete Modals
  const [selectedFacilityForEdit, setSelectedFacilityForEdit] = useState<
    any | null
  >(null);
  const [selectedFacilityForDelete, setSelectedFacilityForDelete] = useState<
    any | null
  >(null);

  // Fetch facilities
  useEffect(() => {
    async function fetchFacilities() {
      if (isPending) return;
      //aaccess api server token fo secure
      const token = await getTokenFromServer();
      
      if (!session?.user?.email || !token) {
        console.error("No authorization token or user found!");
        setLoading(false);  
        return;
      }

       
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/my-facilities/${session.user.email}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          );
          if (res.ok) {
            const data = await res.json();
            setFacilities(data);
          }
        } catch (err) {
          console.error("Failed to fetch facilities:", err);
        } finally {
          setLoading(false);
        }
       
    }

    fetchFacilities();
  }, [session, isPending]);

  // Update success handler
  const handleUpdateSuccess = (updatedFacility: any) => {
    setFacilities((prev) =>
      prev.map((item) =>
        item._id === updatedFacility._id ? updatedFacility : item,
      ),
    );
  };

  // Delete success handler (Removes item from state instantly)
  const handleDeleteSuccess = (deletedId: string) => {
    setFacilities((prev) => prev.filter((item) => item._id !== deletedId));
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Facilities</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your listed sports venues ({facilities.length} found)
          </p>
        </div>
        <Link
          href="/dashboard/add-facility"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Facility
        </Link>
      </div>

      {facilities.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">
            No Facilities Found
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <div
              key={facility._id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100">
                  <img
                    src={
                      facility.imageUrl ||
                      "https://images.unsplash.com/photo-1526232761682-d26e03ac548e"
                    }
                    alt={facility.facilityName}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm capitalize">
                    {facility.sportType}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 truncate mb-1">
                    {facility.facilityName}
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {facility.location}
                  </p>

                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                    {facility.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold">
                    <span className="flex items-center text-emerald-600">
                      <DollarSign className="w-4 h-4" />
                      {facility.price} / hour
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 text-xs font-normal">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      Capacity: {facility.capacity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-5 pb-5 pt-0 flex items-center gap-3">
                <button
                  onClick={() => setSelectedFacilityForEdit(facility)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-xs font-medium transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>

                {/* Delete Button Triggers Delete Modal */}
                <button
                  onClick={() => setSelectedFacilityForDelete(facility)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-xl text-xs font-medium transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {selectedFacilityForEdit && (
        <EditFacilityModal
          facility={selectedFacilityForEdit}
          onClose={() => setSelectedFacilityForEdit(null)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      {selectedFacilityForDelete && (
        <DeleteConfirmationModal
          facility={selectedFacilityForDelete}
          onClose={() => setSelectedFacilityForDelete(null)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
