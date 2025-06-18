import Navbar from "@/components/navbar";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="[--header-height:calc(--spacing(14))] flex flex-col min-h-svh">
      <Navbar isAuthPage={true} />
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}

export default Layout;
