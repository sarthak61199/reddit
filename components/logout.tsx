"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Logout() {
  const router = useRouter();

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.replace("/sign-in");
        },
        onError: ({ error }) => {
          toast.error(error.message);
        },
      },
    });
  };

  return (
    <Button variant="ghost" onClick={onLogout} className="w-full justify-start">
      Logout
    </Button>
  );
}

export default Logout;
