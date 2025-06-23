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
import { tryCatch } from "@/hooks/try-catch";
import { createCommentSchema, CreateCommentSchema } from "@/schema/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function CommentBox({
  postId,
  parentId,
}: {
  postId: string;
  parentId?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CreateCommentSchema>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(createCommentSchema),
  });

  const onSubmit = async (data: CreateCommentSchema) => {
    startTransition(async () => {
      const { error, response } = await tryCatch(
        createComment(data, postId, parentId)
      );

      if (error || !response?.success) {
        toast.error(error?.message || response?.message);
        return;
      }

      toast.success(response.message);
      form.reset();
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
