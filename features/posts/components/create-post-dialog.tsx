"use client";

import { createPost } from "@/features/posts/action";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreatePostInput, createPostSchema } from "@/features/posts/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function CreatePostDialog({
  subreddits,
}: {
  subreddits: { label: string; value: string }[];
}) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const form = useForm<CreatePostInput>({
    defaultValues: {
      subreddit: "",
      title: "",
      content: "",
      image: undefined,
    },
    resolver: zodResolver(createPostSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: CreatePostInput) => {
    const result = await createPost(data);
    if (result?.error) {
      toast.error(result.message);
      return;
    }

    toast.success("Post created successfully");
    setIsCreatePostOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsCreatePostOpen(true)}>
        <Plus />
        Create Post
      </Button>
      <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Post</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="subreddit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subreddit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subreddit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subreddits.map((subreddit) => (
                          <SelectItem
                            key={subreddit.value}
                            value={subreddit.value}
                          >
                            r/{subreddit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  onClick={() => setIsCreatePostOpen(false)}
                  disabled={isSubmitting}
                  variant={"secondary"}
                >
                  Cancel
                </Button>
                <Button disabled={isSubmitting}>Post</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreatePostDialog;
