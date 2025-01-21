import { Button } from "@heroui/react";
import Link from "next/link";
import { IoHomeOutline, IoPersonOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <aside className="w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] border-r border-default-200 px-4 py-6">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-default-600 px-3 mb-2">
          FEEDS
        </h2>

        <Button
          as={Link}
          href="/"
          variant="light"
          className="w-full justify-start"
          startContent={<IoHomeOutline className="text-xl" />}
        >
          Home
        </Button>

        <div className="pt-4">
          <h2 className="text-sm font-semibold text-default-600 px-3 mb-2">
            OTHERS
          </h2>

          <Button
            as={Link}
            href="/profile"
            variant="light"
            className="w-full justify-start"
            startContent={<IoPersonOutline className="text-xl" />}
          >
            Profile
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
