import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="p-4">{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default Layout;
