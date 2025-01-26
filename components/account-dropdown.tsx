"use client";

import { signOut } from "@/actions/auth";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiLogOut, BiUser } from "react-icons/bi";
import { toast } from "sonner";

function AccountDropdown() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await signOut();

      if (res.success) {
        router.replace("/sign-in");
        toast.success(res.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          size="sm"
          showFallback
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
          className="cursor-pointer"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile actions">
        <DropdownItem
          key="profile"
          startContent={<BiUser className="text-xl" />}
          href="/account"
          as={Link}
        >
          Profile
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          startContent={<BiLogOut className="text-xl" />}
          onPress={handleLogout}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default AccountDropdown;
