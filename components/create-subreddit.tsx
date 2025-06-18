"use client";

import { createSubreddit } from "@/actions/subreddit";
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
import InputIcon from "@/components/ui/input-icon";
import { Textarea } from "@/components/ui/textarea";
import { tryCatch } from "@/hooks/try-catch";
import { useDisclosure } from "@/hooks/use-disclosure";
import {
  CreateSubredditSchema,
  createSubredditSchema,
} from "@/schema/subreddit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function CreateSubreddit() {
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();
  const router = useRouter();

  const form = useForm<CreateSubredditSchema>({
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
    resolver: zodResolver(createSubredditSchema),
  });

  const onSubmit = (data: CreateSubredditSchema) => {
    startTransition(async () => {
      const { error, response } = await tryCatch(createSubreddit(data));

      if (error) {
        toast.error(error.message);
        return;
      }

      if (response?.success) {
        toast.success(response.message);
        onClose();
        form.reset();
        router.push(`/r/${response.data?.name}`);
      }
    });
  };

  return (
    <>
      <Button
        variant={"outline"}
        className="w-full"
        size={"lg"}
        onClick={onOpen}
      >
        <Plus />
        Create Subreddit
      </Button>
      <Dialog open={isOpen} onOpenChange={onToggle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Subreddit</DialogTitle>
            <DialogDescription>
              Create a new subreddit to share with the community
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <InputIcon {...field} icon="r/" />
                    </FormControl>
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
                className="w-full"
                size={"lg"}
                disabled={isPending}
              >
                {isPending ? <Loader2 className="animate-spin" /> : <Plus />}
                Create Subreddit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateSubreddit;
