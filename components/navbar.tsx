import CreatePost from "@/components/create-post";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import UserDropdown from "@/components/user-dropdown";
import { getSubreddits } from "@/dal/subreddit";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

function Navbar({ isAuthPage = false }: { isAuthPage?: boolean }) {
  const subreddits = getSubreddits();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        {!isAuthPage && (
          <>
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </>
        )}
        <div className="flex items-center justify-between w-full">
          <Link
            href={isAuthPage ? "/sign-in" : "/"}
            className="flex items-center gap-2"
          >
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
            <h1 className="text-2xl font-bold">Reddit.</h1>
          </Link>
          {!isAuthPage && (
            <div className="flex items-center gap-6">
              <CreatePost subredditsPromise={subreddits} />
              <Suspense fallback={<Skeleton className="size-8 rounded-full" />}>
                <UserDropdown />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
