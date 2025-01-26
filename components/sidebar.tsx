import { getSubreddits } from "@/actions/subreddit";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import CreateSubredditDialog from "./create-subreddit-dialog";

const Sidebar = async () => {
  const { subreddits } = await getSubreddits();

  return (
    <aside className="w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] border-r border-default-200 px-4 py-6">
      <div className="space-y-2">
        <h2 className="font-semibold px-2 mb-2">Feeds</h2>
        <Button
          variant="light"
          className="w-full justify-start"
          startContent={<IoHomeOutline className="text-xl" />}
          as={Link}
          href="/"
        >
          Home
        </Button>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold px-2 mb-2">Communities</h2>
        <div className="flex flex-col gap-2">
          <CreateSubredditDialog />
          {subreddits.map((subreddit) => (
            <Button
              key={subreddit.name}
              variant="light"
              className="w-full justify-start py-6"
              as={Link}
              href={`/r/${subreddit.name}`}
              startContent={
                <Avatar
                  src={subreddit.image ?? undefined}
                  size="sm"
                  radius="sm"
                  showFallback
                  fallback={
                    <div className="bg-default-200 w-full h-full rounded-sm flex items-center justify-center">
                      r/
                    </div>
                  }
                />
              }
            >
              r/{subreddit.name}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
