import { getSubreddits } from "@/actions/subreddit";
import AccountDropdown from "@/components/account-dropdown";
import CreatePostDialog from "@/components/create-post-dialog";
import { Input, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";

const NavigationBar = async () => {
  const { subreddits } = await getSubreddits();

  return (
    <Navbar isBordered maxWidth="full">
      {/* Logo */}
      <NavbarBrand>
        <Link href="/" className="font-bold text-2xl text-orange-500">
          reddit
        </Link>
      </NavbarBrand>

      {/* Search Bar */}
      <NavbarContent justify="center" className="flex-grow">
        <Input
          classNames={{
            base: "max-w-2xl h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-100",
          }}
          placeholder="Search Reddit"
          size="sm"
          startContent={<IoMdSearch size={18} />}
          type="search"
        />
      </NavbarContent>

      {/* Right Side */}
      <NavbarContent justify="end" className="gap-4">
        <CreatePostDialog subreddits={subreddits} />
        <AccountDropdown />
      </NavbarContent>
    </Navbar>
  );
};

export default NavigationBar;
