"use client";

import { ReactNode, useTransition } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type ActionButtonProps = {
  children: ReactNode;
  action: () => Promise<{ error: boolean; message: string } | void>;
} & Omit<ButtonProps, "onClick">;

function ActionButton({ children, action, ...props }: ActionButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleAction = () => {
    startTransition(async () => {
      const result = await action();
      if (result?.error) {
        toast.error(result.message);
      } else {
        toast.success(result?.message);
      }
    });
  };

  return (
    <Button
      type="submit"
      disabled={isPending}
      onClick={handleAction}
      {...props}
    >
      {isPending && <Loader2 className="w-4 h-4 mr-2" />}
      {children}
    </Button>
  );
}

export default ActionButton;
