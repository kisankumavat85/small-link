import React from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import Dashboard from "@/components/pages/Dashboard";

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user?.id) return redirect("/");

  return <Dashboard />;
};

export default DashboardPage;
