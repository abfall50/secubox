/*
  Warnings:

  - You are about to drop the column `other` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `id_coompany` on the `Fidelity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "other",
ADD COLUMN     "wifi_client" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "wifi_company" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Fidelity" DROP COLUMN "id_coompany",
ADD COLUMN     "id_company" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "connected" BOOLEAN NOT NULL DEFAULT false;
