import PostList from "@/components/post-list";
import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import { notFound } from "next/navigation";

async function Page({ params }: { params: Promise<{ subreddit: string }> }) {
  return <div>{/* <PostList /> */}</div>;
}

export default Page;
