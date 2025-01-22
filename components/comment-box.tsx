"use client";

import { Button, Textarea } from "@heroui/react";
import React, { useState } from "react";

type CommentBoxProps = {
  placeholder?: string;
  buttonText?: string;
};

function CommentBox({
  placeholder = "What are your thoughts?",
  buttonText = "Comment",
}: CommentBoxProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        minRows={4}
        variant="bordered"
        classNames={{
          input: "resize-none",
        }}
      />
      <div className="flex justify-start">
        <Button color="primary" type="submit" isDisabled={!content.trim()}>
          {buttonText}
        </Button>
      </div>
    </form>
  );
}

export default CommentBox;
