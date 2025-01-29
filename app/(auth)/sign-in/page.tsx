import SignIn from "@/features/auth/components/sign-in";
import { getSession } from "@/features/auth/session";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <SignIn />;
}

export default Page;
