/*
  Warnings:

  - A unique constraint covering the columns `[id_secu]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_id_secu_key" ON "User"("id_secu");
