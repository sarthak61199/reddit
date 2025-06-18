-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateTable
CREATE TABLE "subreddit" (
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subreddit_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "subreddit_member" (
    "isFounder" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "subredditName" TEXT NOT NULL,

    CONSTRAINT "subreddit_member_pkey" PRIMARY KEY ("userId","subredditName")
);

-- CreateTable
CREATE TABLE "subreddit_moderator" (
    "userId" TEXT NOT NULL,
    "subredditName" TEXT NOT NULL,

    CONSTRAINT "subreddit_moderator_pkey" PRIMARY KEY ("userId","subredditName")
);

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "imageUrl" TEXT,
    "voteCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "subredditName" TEXT NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_vote" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "voteType" "VoteType" NOT NULL,

    CONSTRAINT "post_vote_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_vote" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "voteType" "VoteType" NOT NULL,

    CONSTRAINT "comment_vote_pkey" PRIMARY KEY ("userId","commentId")
);

-- CreateIndex
CREATE INDEX "user_username_idx" ON "user"("username");

-- AddForeignKey
ALTER TABLE "subreddit_member" ADD CONSTRAINT "subreddit_member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subreddit_member" ADD CONSTRAINT "subreddit_member_subredditName_fkey" FOREIGN KEY ("subredditName") REFERENCES "subreddit"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subreddit_moderator" ADD CONSTRAINT "subreddit_moderator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subreddit_moderator" ADD CONSTRAINT "subreddit_moderator_subredditName_fkey" FOREIGN KEY ("subredditName") REFERENCES "subreddit"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_subredditName_fkey" FOREIGN KEY ("subredditName") REFERENCES "subreddit"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_vote" ADD CONSTRAINT "post_vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_vote" ADD CONSTRAINT "post_vote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_vote" ADD CONSTRAINT "comment_vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_vote" ADD CONSTRAINT "comment_vote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
