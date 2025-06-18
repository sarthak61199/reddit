import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserDropdown from "@/components/user-dropdown";
import Image from "next/image";
import CreatePost from "./create-post";

function Navbar() {
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
            <h1 className="text-2xl font-bold">Reddit.</h1>
          </div>
          <div className="flex items-center gap-6">
            <CreatePost />
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
