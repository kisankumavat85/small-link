import Sidebar from "@/components/shared/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fluid-container grid grid-cols-[250px_minmax(0,_1fr)] gap-10">
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
