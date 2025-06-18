/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId]` on the table `comment_vote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,postId]` on the table `post_vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "comment_vote_userId_commentId_key" ON "comment_vote"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "post_vote_userId_postId_key" ON "post_vote"("userId", "postId");
