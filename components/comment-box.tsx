"use client";

import { Button, Textarea } from "@heroui/react";
import React, { useState } from "react";

type CommentBoxProps = {
  onSubmit: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
};

function CommentBox({
  onSubmit,
  placeholder = "What are your thoughts?",
  buttonText = "Comment",
}: CommentBoxProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        minRows={4}
        classNames={{
          input: "resize-y",
        }}
      />
      <div className="flex justify-end">
        <Button color="primary" type="submit" isDisabled={!content.trim()}>
          {buttonText}
        </Button>
      </div>
    </form>
  );
}

export default CommentBox;
