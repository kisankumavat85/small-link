import React from "react";

import Sidebar from "@/components/shared/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fluid-container grid lg:grid-cols-[250px_minmax(0,_1fr)] grid-cols-1 gap-6">
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
