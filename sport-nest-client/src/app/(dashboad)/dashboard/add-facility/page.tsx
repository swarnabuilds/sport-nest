"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";

export default function AddFacilityPage() {

    const { data: session, isPending} = useSession();
    if(isPending) return <div className="flex justify-center items-center h-[85vh]">
      <Spinner />
    </div>
    const user = session?.user
    console.log(user)


  

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Current Target (Form element) থেকে FormData তৈরি
    const form = e.currentTarget;
    const formData = new FormData(form);

    // 2. Data Extract (Object-এ রূপান্তর)
    const facilityData = Object.fromEntries(formData.entries());

    const finalData = {
      ...facilityData,
      price: Number(facilityData.price),
      capacity: Number(facilityData.capacity),
      creatorEmail: session?.user?.email,  
    };


    //api call
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/facilities`,{
      method:"POST",
      headers:{
        'Content-Type': "application/json"
      },
      body:JSON.stringify(finalData)
    })
    const data = await res.json();

   if (res.ok) {
        // Success Toast
        toast.add({
          title: "Facility Added Successfully!",
          description: "Your sports venue has been listed and is now available for booking.",
          type: "success",  
        });
        
        form.reset();
      } else {
        // Error Toast
        toast.add({
          title: "Failed to Add Facility",
          description: data.message || "Something went wrong. Please try again.",
          type: "error",
        });
      }

    console.log("Server Response:", data);
    console.log(res)
  };

  return (
    <div className="max-w-4xl mx-auto sm:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Add New Facility</h1>
        <p className="text-sm text-slate-500 mt-1">
          List your sports venue for others to book
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Facility Name & Sport Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="facilityName" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Facility Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="facilityName"
                name="facilityName"
                placeholder="e.g. Green Turf Football Ground"
                className="h-11 rounded-xl border-slate-200 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sportType" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Sport Type <span className="text-red-500">*</span>
              </Label>
              <select
                id="sportType"
                name="sportType"
                className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <option value="">Select Sport Type</option>
                <option value="football">Football</option>
                <option value="badminton">Badminton</option>
                <option value="tennis">Tennis</option>
                <option value="cricket">Cricket</option>
                <option value="swimming">Swimming</option>
              </select>
            </div>
          </div>

          {/* Row 2: Image URL & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Image URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                className="h-11 rounded-xl border-slate-200 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. Gulshan, Dhaka"
                className="h-11 rounded-xl border-slate-200 focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          {/* Row 3: Price Per Hour & Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Price Per Hour ($) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="50"
                className="h-11 rounded-xl border-slate-200 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Capacity (Players) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                placeholder="22"
                className="h-11 rounded-xl border-slate-200 focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          {/* Row 5: Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your facility..."
              className="min-h-[120px] rounded-xl border-slate-200 focus-visible:ring-emerald-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 h-11 rounded-xl transition-all shadow-sm"
            >
              Add Facility
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}