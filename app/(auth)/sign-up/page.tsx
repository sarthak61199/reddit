import SignUp from "@/components/sign-up";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <SignUp />;
}

export default Page;
