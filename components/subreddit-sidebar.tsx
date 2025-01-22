import { Avatar, Button, Card, CardBody, CardHeader } from "@heroui/react";
import Link from "next/link";

// Dummy data
const SUBREDDIT_DATA = {
  name: "MechanicalKeyboards",
  description:
    "A community for keyboard enthusiasts. Share your builds, ask questions, and discuss everything related to mechanical keyboards!",
  createdAt: "2012-05-15",
  memberCount: 850432,
  moderators: [
    {
      username: "keeb_mod",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    },
    {
      username: "mechanical_master",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    },
    {
      username: "switch_guru",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    },
  ],
};

function SubredditSidebar() {
  return (
    <div className="w-80">
      <div className="sticky top-20">
        <Card>
          <CardHeader className="font-bold">
            About r/{SUBREDDIT_DATA.name}
          </CardHeader>
          <CardBody className="space-y-4">
            <p className="text-sm text-default-700">
              {SUBREDDIT_DATA.description}
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-default-500">Created</span>
                <span>{SUBREDDIT_DATA.createdAt}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-default-500">Members</span>
                <span>{SUBREDDIT_DATA.memberCount.toLocaleString()}</span>
              </div>
            </div>

            <Button color="primary" className="w-full">
              Join Community
            </Button>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Moderators</h3>
              <div className="space-y-2">
                {SUBREDDIT_DATA.moderators.map((mod) => (
                  <Link
                    key={mod.username}
                    href={`/u/${mod.username}`}
                    className="flex items-center gap-2 text-sm hover:bg-default-100 p-1 rounded-lg transition-colors"
                  >
                    <Avatar src={mod.avatar} size="sm" />
                    <span>u/{mod.username}</span>
                  </Link>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default SubredditSidebar;
