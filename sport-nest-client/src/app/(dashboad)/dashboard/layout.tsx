import React from "react";
import Sidebar from "./_components/Sidebar";

export default function Dashboardlayout({children} :{children: React.ReactElement}) {
  return (
    <div>
      <Sidebar />
      <div>
        {children}
        </div>
    </div>
  )
}
