"use client";

import { createComment } from "@/actions/comment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@/hooks/use-mutation";
import { createCommentSchema, CreateCommentSchema } from "@/schema/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function CommentBox({
  postId,
  parentId,
  onSuccess,
}: {
  postId: string;
  parentId?: string;
  onSuccess?: () => void;
}) {
  const { isPending, mutate } = useMutation();
  const form = useForm<CreateCommentSchema>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(createCommentSchema),
  });

  const onSubmit = async (data: CreateCommentSchema) => {
    mutate(() => createComment(data, postId, parentId), {
      onSuccess: (response) => {
        toast.success(response.message);
        form.reset();
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Add a comment..."
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit self-end" disabled={isPending}>
          {isPending ? <Loader2 className="size-4 animate-spin" /> : "Comment"}
        </Button>
      </form>
    </Form>
  );
}

export default CommentBox;
