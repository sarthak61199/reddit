import SignIn from "@/components/sign-in";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <SignIn />;
}

export default Page;
