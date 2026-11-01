"use client";

import { useState } from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/toast";

interface DeleteConfirmationModalProps {
  facility: { _id: string; facilityName: string };
  onClose: () => void;
  onDeleteSuccess: (deletedId: string) => void;
}

export default function DeleteConfirmationModal({
  facility,
  onClose,
  onDeleteSuccess,
}: DeleteConfirmationModalProps) {
  const [loading, setLoading] = useState(false);

  // Delete API call korar logic
  const handleDeleteConfirm = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/facilities/${facility._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        toast.add({ title: "Facility deleted successfully!", type: "success" });
        onDeleteSuccess(facility._id); // Parent component theke item bad dewa
        onClose(); // Modal bondho kora
      } else {
        toast.add({ title: data.message || "Failed to delete facility", type: "error" });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.add({ title: "Something went wrong while deleting!", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon & Message */}
        <div className="text-center mt-2 mb-6">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Are you sure?</h3>
          <p className="text-sm text-slate-500 mt-1">
            You are about to delete <span className="font-semibold text-slate-700">"{facility.facilityName}"</span>. This action cannot be undone.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDeleteConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>

      </div>
    </div>
  );
}