"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";
import { toast } from "@/components/ui/toast";

interface EditFacilityModalProps {
  facility: any;
  onClose: () => void;
  onUpdateSuccess: (updatedFacility: any) => void;
}

export default function EditFacilityModal({
  facility,
  onClose,
  onUpdateSuccess,
}: EditFacilityModalProps) {
  const [formData, setFormData] = useState({
    facilityName: facility.facilityName || "",
    sportType: facility.sportType || "",
    imageUrl: facility.imageUrl || "",
    location: facility.location || "",
    price: facility.price || "",
    capacity: facility.capacity || "",
    description: facility.description || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updatedPayload = {
      ...formData,
      price: Number(formData.price),
      capacity: Number(formData.capacity),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/facilities/${facility._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload),
      });

      if (res.ok) {
        toast.add({ title: "Facility updated successfully!", type: "success" });
        onUpdateSuccess({ ...facility, ...updatedPayload });
        onClose();
      } else {
        toast.add({ title: "Failed to update facility", type: "error" });
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.add({ title: "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-bold text-slate-800">Edit Facility</h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase">Facility Name</label>
            <input
              name="facilityName"
              value={formData.facilityName}
              onChange={handleChange}
              className="w-full mt-1 p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase">Sport Type</label>
              <select
                name="sportType"
                value={formData.sportType}
                onChange={handleChange}
                className="w-full mt-1 p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-emerald-500"
                required
              >
                <option value="football">Football</option>
                <option value="badminton">Badminton</option>
                <option value="tennis">Tennis</option>
                <option value="cricket">Cricket</option>
                <option value="swimming">Swimming</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full mt-1 p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-emerald-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase">Price ($/hr)</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full mt-1 p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-emerald-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase">Capacity</label>
              <input
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full mt-1 p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase">Image URL</label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full mt-1 p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-emerald-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-emerald-500"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}