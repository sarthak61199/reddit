import PostList from "@/components/post-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PLACEHOLDER_AVATAR_URL } from "@/constants";
import { getPosts } from "@/dal/post";
import { dayjs } from "@/lib/dayjs";
import { getUser } from "@/lib/get-user";
import { CalendarDays, ThumbsUp } from "lucide-react";

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

async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const user = await getUser();
  const posts = await getPosts(1, 10, undefined, username);

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
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="size-24">
              <AvatarImage
                src={user.image || PLACEHOLDER_AVATAR_URL}
                alt={user.username || ""}
              />
            </Avatar>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-foreground">
                u/{user.username}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="size-4" />
                <span>Joined {dayjs(user.createdAt).format("MMMM YYYY")}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
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
          <PostList posts={posts.posts} hasMore={posts.hasMore} />
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
