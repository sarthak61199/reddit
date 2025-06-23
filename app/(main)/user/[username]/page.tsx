import PostList from "@/components/post-list";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PLACEHOLDER_AVATAR_URL } from "@/constants";
import { getUserComments } from "@/dal/comment";
import { getPosts } from "@/dal/post";
import { dayjs } from "@/lib/dayjs";
import { getUser } from "@/lib/get-user";
import { CalendarDays, ThumbsUp } from "lucide-react";

async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const user = await getUser();
  const [posts, comments] = await Promise.all([
    getPosts(1, 10, undefined, username),
    getUserComments(username),
  ]);

  return (
    <div className="container mx-auto space-y-6">
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
            Posts (1)
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="data-[state=active]:bg-background"
          >
            Comments (1)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="space-y-4 mt-6">
          <PostList posts={posts.posts} hasMore={posts.hasMore} />
        </TabsContent>
        <TabsContent value="comments" className="space-y-4 mt-6">
          {comments.map((comment) => (
            <Card key={comment.id} className="border-border bg-card pt-0">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Commented on</span>
                    <Badge
                      variant="secondary"
                      className="bg-muted text-muted-foreground"
                    >
                      r/{comment.post.subredditName}
                    </Badge>
                    <span>•</span>
                    <span>{dayjs(comment.createdAt).fromNow()}</span>
                  </div>
                  <h4 className="text-sm font-medium text-foreground">
                    {comment.post.title}
                  </h4>

                  <div className="pl-4 border-l-2 border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 pt-2">
                    <ThumbsUp className="size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {comment.voteCount}
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
