import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";

const Sidebar = () => {
  const subreddits = [
    {
      name: "MechanicalKeyboards",
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212",
    },
    {
      name: "todayilearned",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d",
    },
    {
      name: "photographs",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    },
    {
      name: "CozyPlaces",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
    },
    {
      name: "programming",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    },
    {
      name: "cats",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    },
    {
      name: "hiking",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    },
  ];

  return (
    <aside className="w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] border-r border-default-200 px-4 py-6">
      <div className="space-y-2">
        <h2 className="font-semibold px-2 mb-2">Feeds</h2>
        <Link href="/">
          <Button
            variant="light"
            className="w-full justify-start"
            startContent={<IoHomeOutline className="text-xl" />}
          >
            Home
          </Button>
        </Link>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold px-2 mb-2">Communities</h2>
        <div className="flex flex-col gap-2">
          {subreddits.map((subreddit) => (
            <Link key={subreddit.name} href={`/r/${subreddit.name}`}>
              <Button
                variant="light"
                className="w-full justify-start"
                startContent={
                  <Image
                    src={subreddit.image}
                    alt={subreddit.name}
                    width={32}
                    height={32}
                    className="rounded-full aspect-square"
                  />
                }
              >
                r/{subreddit.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
