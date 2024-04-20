import React from "react";
import Header from "../header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid col-span-1 gap-4">
      <Header />
      {children}
    </main>
  );
};

export default Layout;
