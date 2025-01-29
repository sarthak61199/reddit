import AccountDropdown from "@/components/account-dropdown";
import { Input } from "@/components/ui/input";
import CreatePostDialog from "@/features/posts/components/create-post-dialog";
import { getSubreddits } from "@/features/subreddits/query";
import Link from "next/link";

const NavigationBar = async () => {
  const { subreddits } = await getSubreddits();

  return (
    <header className="flex justify-between items-center sticky top-0 z-10 bg-background p-6 border-b">
      <Link href="/" className="font-bold text-2xl text-orange-500">
        reddit
      </Link>
      <Input placeholder="Search Reddit" className="w-full max-w-2xl" />
      <div className="flex items-center gap-6">
        <CreatePostDialog subreddits={subreddits} />
        <AccountDropdown />
      </div>
    </header>
  );
};

export default NavigationBar;
