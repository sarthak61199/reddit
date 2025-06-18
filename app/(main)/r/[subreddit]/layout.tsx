import SubredditSidebar from "@/components/subreddit-sidebar";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-1">{children}</div>
      <SubredditSidebar />
    </div>
  );
}

export default Layout;
