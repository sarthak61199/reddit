import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getUser() {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user) {
    return redirect("/sign-in");
  }

  return user.user;
}
