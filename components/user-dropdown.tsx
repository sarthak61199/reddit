import Logout from "@/components/logout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PLACEHOLDER_AVATAR_URL } from "@/constants";
import { getUser } from "@/lib/get-user";
import Link from "next/link";
import { Button } from "./ui/button";

async function UserDropdown() {
  const user = await getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          <AvatarImage src={user.image || PLACEHOLDER_AVATAR_URL} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Button variant="ghost" className="w-full justify-start">
            <Link href={`/user/${user.username}`}>Profile</Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
