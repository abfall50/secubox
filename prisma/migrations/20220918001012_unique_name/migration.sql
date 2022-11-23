/*
  Warnings:

  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "id_secu" TEXT,
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Secubox" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Secubox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_secubox" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "welcome_msg" TEXT NOT NULL DEFAULT 'Test default message db',
    "image" TEXT NOT NULL DEFAULT '',
    "menu" TEXT,
    "reviews" TEXT,
    "other" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fidelity" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_coompany" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "claim" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Fidelity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");
