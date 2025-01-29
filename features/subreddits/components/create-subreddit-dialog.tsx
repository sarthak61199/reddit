"use client";

import { createSubreddit } from "@/features/subreddits/action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateSubredditInput,
  createSubredditSchema,
} from "@/features/subreddits/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function CreateSubredditDialog() {
  const [isCreateSubredditOpen, setIsCreateSubredditOpen] = useState(false);

  const form = useForm<CreateSubredditInput>({
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
    },
    resolver: zodResolver(createSubredditSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: CreateSubredditInput) => {
    const result = await createSubreddit(data);

    if (result.error) {
      toast.error(result.message);
      return;
    }

    toast.success("Subreddit created successfully");
    reset();
    setIsCreateSubredditOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsCreateSubredditOpen(true)}
        variant={"ghost"}
        className="w-full justify-start"
      >
        <Plus />
        Create Community
      </Button>
      <Dialog
        open={isCreateSubredditOpen}
        onOpenChange={setIsCreateSubredditOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Community</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Community Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. r/programming" />
                    </FormControl>
                    <FormDescription>
                      It must be unique and can only contain letters, numbers,
                      and underscores. It cannot be changed later.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  onClick={() => setIsCreateSubredditOpen(false)}
                  variant={"secondary"}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateSubredditDialog;
