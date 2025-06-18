"use client";

import { createPost } from "@/actions/post";
import ImageUploader from "@/components/image-uploader";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PLACEHOLDER_AVATAR_URL } from "@/constants";
import { Subreddits } from "@/dal/subreddit";
import { tryCatch } from "@/hooks/try-catch";
import { useDisclosure } from "@/hooks/use-disclosure";
import { createPostSchema, CreatePostSchema } from "@/schema/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function CreatePost({
  subredditsPromise,
}: {
  subredditsPromise: Promise<Subreddits>;
}) {
  const router = useRouter();
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();
  const [isPending, startTransition] = useTransition();

  const subreddits = use(subredditsPromise);

  const form = useForm<CreatePostSchema>({
    defaultValues: {
      title: "",
      content: "",
      subreddit: "",
      imageUrl: "",
    },
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = async (data: CreatePostSchema) => {
    startTransition(async () => {
      const { error, response } = await tryCatch(createPost(data));

      if (error) {
        toast.error(error.message);
        return;
      }

      if (response?.success) {
        toast.success(response.message);
        onClose();
        form.reset();
        router.push(`/r/${response.data?.subreddit}/post/${response.data?.id}`);
      }
    });
  };

  return (
    <>
      <Button onClick={onOpen}>
        <Plus />
        Create Post
      </Button>
      <Dialog open={isOpen} onOpenChange={onToggle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription>
              Create a new post to share with the community
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <SelectTrigger className="h-auto ps-2 text-left [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0">
                          <SelectValue placeholder="Select a subreddit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                        {subreddits.map((subreddit) => (
                          <SelectItem
                            value={subreddit.name}
                            key={subreddit.name}
                          >
                            <span className="flex items-center gap-2">
                              <img
                                className="rounded-full"
                                src={
                                  subreddit.imageUrl || PLACEHOLDER_AVATAR_URL
                                }
                                alt={subreddit.name}
                                width={24}
                                height={24}
                              />
                              <span>
                                <span className="block font-medium">
                                  r/{subreddit.name}
                                </span>
                              </span>
                            </span>
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
                      <Input placeholder="shadcn" {...field} />
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
                      <Textarea placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageUploader
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? <Loader2 className="animate-spin" /> : <Plus />}
                Create Post
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreatePost;
