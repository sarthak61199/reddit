/*
  Warnings:

  - You are about to drop the column `isFounder` on the `subreddit_member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subreddit_member" DROP COLUMN "isFounder";

-- AlterTable
ALTER TABLE "subreddit_moderator" ADD COLUMN     "isFounder" BOOLEAN NOT NULL DEFAULT false;
