"use client";

import Link from "next/link";
import { Trophy, Calendar, PlusCircle, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { authClient, useSession} from "@/lib/auth-client";  
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-emerald-500 text-white p-1.5 rounded-full flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">
            Sport<span className="text-emerald-600">Nest</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/facilities"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            All Facilities
          </Link>
        </nav>

        {/* Action Button / User Dropdown */}
        <div className="flex items-center">
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
          ) : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center gap-2 border border-gray-200 rounded-full py-1.5 px-3 hover:bg-gray-50 transition-all shadow-sm">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name} />
                    <AvatarFallback className="bg-emerald-600 text-white text-xs font-bold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {session.user.name}
                  </span>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 bg-white shadow-xl border border-gray-200 z-50">
                {/* Signed in info */}
                <div className="px-3 py-2 text-xs text-gray-500">
                  <p className="font-normal">Signed in as</p>
                  <p className="font-semibold text-gray-900 truncate">{session.user.email}</p>
                </div>

                <DropdownMenuSeparator className="my-1 bg-gray-100" />

                {/* Dashboard Links with proper /dashboard prefix */}
                <DropdownMenuItem 
                  onClick={() => router.push("/dashboard")}
                  className="rounded-xl cursor-pointer flex items-center gap-2.5 py-2 text-gray-700 focus:bg-gray-100"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium">Dashboard</span>
                </DropdownMenuItem>

                <DropdownMenuItem 
                  onClick={() => router.push("/dashboard/my-bookings")}
                  className="rounded-xl cursor-pointer flex items-center gap-2.5 py-2 text-gray-700 focus:bg-gray-100"
                >
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">My Bookings</span>
                </DropdownMenuItem>

                <DropdownMenuItem 
                  onClick={() => router.push("/dashboard/add-facility")}
                  className="rounded-xl cursor-pointer flex items-center gap-2.5 py-2 text-gray-700 focus:bg-gray-100"
                >
                  <PlusCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Add Facility</span>
                </DropdownMenuItem>

                <DropdownMenuItem 
                  onClick={() => router.push("/dashboard/my-facilities")}
                  className="rounded-xl cursor-pointer flex items-center gap-2.5 py-2 text-gray-700 focus:bg-gray-100"
                >
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">My Facilities</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 bg-gray-100" />

                {/* Log Out Button */}
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="rounded-xl cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 flex items-center gap-2.5 py-2"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-semibold">Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/signin"
              className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6 py-2 text-sm font-medium shadow-sm transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}