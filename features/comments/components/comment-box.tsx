"use client";

import { createComment } from "@/features/comments/action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CreateCommentInput } from "@/features/comments/schema";
import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type CommentBoxProps = {
  placeholder?: string;
  buttonText?: string;
  postId: string;
  parentId?: string;
} & ComponentProps<"textarea">;

function CommentBox({
  buttonText = "Comment",
  postId,
  placeholder = "Write a comment",
  parentId,
  ...props
}: CommentBoxProps) {
  const form = useForm<CreateCommentInput>({
    defaultValues: {
      content: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: CreateCommentInput) => {
    const result = await createComment(postId, data, parentId);
    if (result?.error) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} {...props} placeholder={placeholder} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting} type="submit">
          {buttonText}
        </Button>
      </form>
    </Form>
  );
}

export default CommentBox;
