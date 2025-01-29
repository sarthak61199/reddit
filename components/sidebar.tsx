import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CreateSubredditDialog from "@/features/subreddits/components/create-subreddit-dialog";
import { getSubreddits } from "@/features/subreddits/query";
import { Home } from "lucide-react";
import Link from "next/link";

const Sidebar = async () => {
  const { subreddits } = await getSubreddits();

  return (
    <aside className="w-64 fixed top-18 left-0 h-[calc(100vh-4rem)] border-r border-default-200 px-4 py-6">
      <div className="space-y-2">
        <h2 className="font-semibold px-2 mb-2">Feeds</h2>
        <Button asChild variant={"ghost"} className="w-full justify-start">
          <Link href="/">
            <Home />
            Home
          </Link>
        </Button>
      </div>
      <div className="mt-6">
        <h2 className="font-semibold px-2 mb-2">Communities</h2>
        <div className="flex flex-col gap-2">
          <CreateSubredditDialog />
          {subreddits.map((subreddit) => (
            <Button
              asChild
              key={subreddit.value}
              variant={"ghost"}
              className="w-full justify-start"
            >
              <Link href={`/r/${subreddit.value}`}>
                <Avatar className="size-8">
                  <AvatarImage src={subreddit.image} />
                  <AvatarFallback>r/</AvatarFallback>
                </Avatar>
                r/{subreddit.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
