"use client";

import { Avatar, Button, Textarea } from "@heroui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { BiDownvote, BiEdit, BiReply, BiTrash, BiUpvote } from "react-icons/bi";

dayjs.extend(relativeTime);

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    username: string;
    avatar?: string | null;
  };
  _count: {
    CommentLike: number;
  };
  children: Comment[];
};

type CommentProps = {
  comment: Comment;
  level?: number;
};

function CommentComponent({ comment, level = 0 }: CommentProps) {
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
      <div className={`flex gap-4 ${level > 0 ? "ml-8" : ""}`}>
        {/* Vote buttons */}
        <div className="flex flex-col items-center">
          <Button isIconOnly variant="light" size="sm">
            <BiUpvote className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium">
            {comment._count.CommentLike}
          </span>
          <Button isIconOnly variant="light" size="sm">
            <BiDownvote className="w-4 h-4" />
          </Button>
        </div>

        {/* Comment content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Avatar
              src={comment.author.avatar ?? undefined}
              size="sm"
              showFallback
            />
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
                minRows={2}
              />
              <div className="flex gap-2">
                <Button size="sm" color="primary" onPress={handleEdit}>
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-default-700 mb-2">{comment.content}</p>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="light"
              startContent={<BiReply />}
              onPress={() => setIsReplying(!isReplying)}
            >
              Reply
            </Button>
            <Button
              size="sm"
              variant="light"
              startContent={<BiEdit />}
              onPress={() => setIsEditing(!isEditing)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="light"
              color="danger"
              startContent={<BiTrash />}
              onPress={handleDelete}
            >
              Delete
            </Button>
          </div>

          {/* Reply form */}
          {isReplying && (
            <div className="mt-4 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                minRows={2}
              />
              <div className="flex gap-2">
                <Button size="sm" color="primary" onPress={handleReply}>
                  Reply
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => setIsReplying(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nested comments */}
      {comment.children.length > 0 && (
        <div className="mt-4">
          {comment.children.map((childComment) => (
            <CommentComponent
              key={childComment.id}
              comment={childComment}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type CommentSectionProps = {
  comments: Comment[];
};

function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentComponent key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentSection;
