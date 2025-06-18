"use client";

import { addModerator } from "@/actions/subreddit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { useDisclosure } from "@/hooks/use-disclosure";
import { addModeratorSchema, AddModeratorSchema } from "@/schema/subreddit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AddModerator() {
  const { subreddit } = useParams<{ subreddit: string }>();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<AddModeratorSchema>({
    defaultValues: {
      username: "",
    },
    resolver: zodResolver(addModeratorSchema),
  });

  const onSubmit = (data: AddModeratorSchema) => {
    startTransition(async () => {
      const { response, error } = await tryCatch(addModerator(data, subreddit));

      if (error || !response?.success) {
        toast.error(error?.message || response?.message);
        return;
      }

      toast.success(response.message);
      onClose();
      form.reset();
    });
  };

  return (
    <>
      <Button variant="outline" size="icon" className="size-8" onClick={onOpen}>
        <Plus />
      </Button>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Moderator</DialogTitle>
            <DialogDescription>
              Add a moderator to the subreddit.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Add Moderator
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddModerator;
