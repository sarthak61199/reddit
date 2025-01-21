import React from "react";
import NavigationBar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[inherit]">
      <NavigationBar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-4">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
