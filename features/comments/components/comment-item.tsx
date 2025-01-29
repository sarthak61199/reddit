"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Pencil, Reply, Trash } from "lucide-react";
import { useState } from "react";

dayjs.extend(relativeTime);

export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    username: string;
    avatar?: string | null;
  };
  children?: Comment[];
};

type CommentProps = {
  comment: Comment;
};

function CommentItem({ comment }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState("");

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log("Edit comment:", editContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete comment:", comment.id);
  };

  const handleReply = () => {
    // TODO: Implement reply functionality
    console.log("Reply to comment:", replyContent);
    setIsReplying(false);
    setReplyContent("");
  };

  return (
    <div className="mb-4">
      <div className={`flex gap-4`}>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Avatar>
              <AvatarImage src={comment.author.avatar ?? undefined} />
              <AvatarFallback>
                {comment.author.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{comment.author.username}</span>
            <span className="text-default-500 text-sm">
              {dayjs(comment.createdAt).fromNow()}
            </span>
          </div>
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleEdit}
                  disabled={editContent === comment.content || !editContent}
                >
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <p className="text-default-700 mb-2">{comment.content}</p>
          )}
          <div className="flex gap-2">
            <Button
              onClick={() => setIsReplying(!isReplying)}
              variant={"ghost"}
              size={"sm"}
            >
              <Reply />
              Reply
            </Button>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={"ghost"}
              size={"sm"}
            >
              <Pencil />
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              variant={"ghost"}
              size={"sm"}
              className="text-red-500"
            >
              <Trash />
              Delete
            </Button>
          </div>
          {isReplying && (
            <div className="mt-4 ml-8 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={handleReply} disabled={!replyContent}>
                  Reply
                </Button>
                <Button onClick={() => setIsReplying(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {comment?.children && comment?.children?.length > 0 && (
        <div className="mt-4 ml-8">
          {comment?.children?.map((childComment) => (
            <CommentItem key={childComment.id} comment={childComment} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
