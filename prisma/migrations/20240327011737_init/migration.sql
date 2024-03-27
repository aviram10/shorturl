/*
  Warnings:

  - You are about to drop the column `orginalUrl` on the `urls` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[originalUrl]` on the table `urls` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `originalUrl` to the `urls` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "urls_orginalUrl_key";

-- AlterTable
ALTER TABLE "urls" DROP COLUMN "orginalUrl",
ADD COLUMN     "originalUrl" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "urls_originalUrl_key" ON "urls"("originalUrl");
