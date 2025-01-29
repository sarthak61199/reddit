"use client";

import { addModerator } from "@/features/subreddits/action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { AddModeratorInput } from "@/features/subreddits/schema";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AddModerator() {
  const [isAddModeratorOpen, setIsAddModeratorOpen] = useState(false);
  const { subreddit } = useParams<{ subreddit: string }>();

  const form = useForm<AddModeratorInput>({
    defaultValues: {
      username: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: AddModeratorInput) => {
    const result = await addModerator(subreddit, data);
    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      setIsAddModeratorOpen(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant={"ghost"}
        onClick={() => setIsAddModeratorOpen(true)}
      >
        <Plus size={16} />
      </Button>
      <Dialog open={isAddModeratorOpen} onOpenChange={setIsAddModeratorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Moderator</DialogTitle>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                <Button type="submit">Add Moderator</Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddModerator;
