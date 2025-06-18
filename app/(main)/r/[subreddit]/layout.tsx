import SubredditSidebar from "@/components/subreddit-sidebar";
import { ReactNode } from "react";

async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ subreddit: string }>;
}) {
  const { subreddit } = await params;

  return (
    <div className="flex gap-4 max-w-7xl mx-auto">
      {children}
      <SubredditSidebar subredditName={subreddit} />
    </div>
  );
}

export default Layout;
