"use client";

import CommentBox from "@/components/comment-box";
import CommentSection from "@/components/comment-section";
import { Card, CardBody } from "@heroui/react";

const DUMMY_COMMENTS = [
  {
    id: "1",
    content:
      "This is amazing! I've been thinking about building a custom keyboard too. What switches would you recommend for someone who does a lot of typing?",
    createdAt: new Date("2024-03-10T16:00:00"),
    author: {
      username: "keyboard_newbie",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    },
    _count: {
      CommentLike: 24,
    },
    children: [
      {
        id: "2",
        content:
          "For typing, I'd highly recommend either Gateron Browns or Cherry MX Browns. They have a nice tactile bump without being too loud.",
        createdAt: new Date("2024-03-10T16:15:00"),
        author: {
          username: "keeb_enthusiast",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        },
        _count: {
          CommentLike: 18,
        },
        children: [
          {
            id: "3",
            content:
              "Just want to add that Boba U4s are also fantastic for typing. Super tactile and very quiet!",
            createdAt: new Date("2024-03-10T16:30:00"),
            author: {
              username: "switch_master",
              avatar:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
            },
            _count: {
              CommentLike: 12,
            },
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    content:
      "Great build! What keycaps are those? The color scheme is perfect.",
    createdAt: new Date("2024-03-10T16:45:00"),
    author: {
      username: "design_lover",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    },
    _count: {
      CommentLike: 8,
    },
    children: [],
  },
  {
    id: "5",
    content:
      "How long did the whole build process take? I'm planning my first build and trying to set aside enough time.",
    createdAt: new Date("2024-03-10T17:00:00"),
    author: {
      username: "time_manager",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    },
    _count: {
      CommentLike: 5,
    },
    children: [
      {
        id: "6",
        content:
          "Not OP, but my first build took about 3-4 hours. Take your time with lubing switches and stabilizers!",
        createdAt: new Date("2024-03-10T17:15:00"),
        author: {
          username: "keyboard_veteran",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        },
        _count: {
          CommentLike: 15,
        },
        children: [],
      },
    ],
  },
];

function CommentSectionWrapper() {
  return (
    <Card>
      <CardBody className="space-y-6">
        <CommentBox
          onSubmit={(content) => {
            // TODO: Implement comment submission
            console.log("New comment:", content);
          }}
        />
        <CommentSection comments={DUMMY_COMMENTS} />
      </CardBody>
    </Card>
  );
}

export default CommentSectionWrapper;
