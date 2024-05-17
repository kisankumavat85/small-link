import React from "react";
import { redirect } from "next/navigation";

import Dashboard from "@/components/pages/Dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return redirect("/");

  return <Dashboard session={session} />;
};

export default DashboardPage;
