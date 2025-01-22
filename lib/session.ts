import { cookies } from "next/headers";
import { verifyJWT } from "./jwt";

type UserSession = {
  id: string;
  email: string;
  username: string;
  avatar?: string | null;
} | null;

export async function getSession(): Promise<UserSession> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return null;
    }

    const verifiedToken = verifyJWT<UserSession>(token);

    if (!verifiedToken) {
      return null;
    }

    return verifiedToken;
  } catch {
    return null;
  }
}
