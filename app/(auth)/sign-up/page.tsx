import SignUp from "@/features/auth/components/sign-up";
import { getSession } from "@/features/auth/session";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <SignUp />;
}

export default Page;
