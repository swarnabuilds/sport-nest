import React from "react";
import Sidebar from "./_components/Sidebar";

export default function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Page Content Container */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}