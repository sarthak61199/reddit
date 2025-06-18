"use client";

import PostList from "@/components/post-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, ThumbsUp } from "lucide-react";

interface UserPost {
  id: string;
  title: string;
  content: string;
  subreddit: string;
  upvotes: number;
  comments: number;
  timeAgo: string;
}

interface UserComment {
  id: string;
  content: string;
  postTitle: string;
  subreddit: string;
  upvotes: number;
  timeAgo: string;
}

interface UserProfile {
  username: string;
  displayName: string;
  avatar: string;
  joinDate: string;
  postKarma: number;
  commentKarma: number;
  totalPosts: number;
  totalComments: number;
}

function Page() {
  // Hardcoded user data
  const userProfile: UserProfile = {
    username: "techguru_2024",
    displayName: "Tech Guru",
    avatar: "https://github.com/shadcn.png",
    joinDate: "January 2024",
    postKarma: 12540,
    commentKarma: 8920,
    totalPosts: 156,
    totalComments: 892,
  };

  const userPosts: UserPost[] = [
    {
      id: "1",
      title: "Building a modern web app with Next.js 15 and React 19",
      content:
        "Just finished building an amazing project using the latest Next.js features. The new app router is incredible and the developer experience has improved significantly...",
      subreddit: "nextjs",
      upvotes: 324,
      comments: 47,
      timeAgo: "2 hours",
    },
    {
      id: "2",
      title: "Best practices for TypeScript in large scale applications",
      content:
        "After working on several enterprise projects, I've compiled a list of TypeScript best practices that have helped our team maintain code quality...",
      subreddit: "typescript",
      upvotes: 189,
      comments: 23,
      timeAgo: "1 day",
    },
    {
      id: "3",
      title: "Why shadcn/ui is the future of React component libraries",
      content:
        "I've been using shadcn/ui for the past 6 months and it has completely changed how I approach building UIs. The flexibility and customization options are unmatched...",
      subreddit: "reactjs",
      upvotes: 567,
      comments: 89,
      timeAgo: "3 days",
    },
  ];

  const userComments: UserComment[] = [
    {
      id: "1",
      content:
        "This is exactly what I needed! I've been struggling with state management in my Next.js app and your solution is perfect. Thanks for sharing the detailed implementation.",
      postTitle: "State Management in Next.js: A Complete Guide",
      subreddit: "nextjs",
      upvotes: 45,
      timeAgo: "1 hour",
    },
    {
      id: "2",
      content:
        "Great article! One thing I'd add is that you should also consider using React.memo for components that render frequently. It can significantly improve performance in larger applications.",
      postTitle: "React Performance Optimization Tips",
      subreddit: "reactjs",
      upvotes: 23,
      timeAgo: "4 hours",
    },
    {
      id: "3",
      content:
        "I disagree with your approach on the database design. While it works for small applications, it doesn't scale well. Consider using a more normalized structure for better performance.",
      postTitle: "Database Design Patterns for SaaS Applications",
      subreddit: "programming",
      upvotes: 12,
      timeAgo: "6 hours",
    },
    {
      id: "4",
      content:
        "This is a common mistake I see in many codebases. The solution you provided is clean and follows SOLID principles. Would love to see more content like this!",
      postTitle: "Clean Code Practices in JavaScript",
      subreddit: "javascript",
      upvotes: 67,
      timeAgo: "1 day",
    },
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">
      {/* User Profile Header */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-6">
            <Avatar className="size-24">
              <AvatarImage
                src={userProfile.avatar}
                alt={userProfile.username}
              />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                {userProfile.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  u/{userProfile.username}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {userProfile.displayName}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="size-4" />
                <span>Joined {userProfile.joinDate}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">
                    {formatNumber(userProfile.postKarma)}
                  </p>
                  <p className="text-xs text-muted-foreground">Post Karma</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">
                    {formatNumber(userProfile.commentKarma)}
                  </p>
                  <p className="text-xs text-muted-foreground">Comment Karma</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">
                    {userProfile.totalPosts}
                  </p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">
                    {userProfile.totalComments}
                  </p>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Posts and Comments Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger
            value="posts"
            className="data-[state=active]:bg-background"
          >
            Posts ({userProfile.totalPosts})
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="data-[state=active]:bg-background"
          >
            Comments ({userProfile.totalComments})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4 mt-6">
          {/* {userPosts.map((post) => (
            <Card key={post.id} className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge
                      variant="secondary"
                      className="bg-muted text-muted-foreground"
                    >
                      r/{post.subreddit}
                    </Badge>
                    <span>•</span>
                    <span>{post.timeAgo} ago</span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {post.content}
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ThumbsUp className="size-4" />
                      <span>{post.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageCircle className="size-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))} */}

          <PostList />
        </TabsContent>

        <TabsContent value="comments" className="space-y-4 mt-6">
          {userComments.map((comment) => (
            <Card key={comment.id} className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Commented on</span>
                    <Badge
                      variant="secondary"
                      className="bg-muted text-muted-foreground"
                    >
                      r/{comment.subreddit}
                    </Badge>
                    <span>•</span>
                    <span>{comment.timeAgo} ago</span>
                  </div>

                  <h4 className="text-sm font-medium text-foreground">
                    {comment.postTitle}
                  </h4>

                  <div className="pl-4 border-l-2 border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {comment.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 pt-2">
                    <ThumbsUp className="size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {comment.upvotes}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
