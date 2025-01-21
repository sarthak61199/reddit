import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[inherit] grid place-items-center">{children}</div>
  );
}

export default Layout;
