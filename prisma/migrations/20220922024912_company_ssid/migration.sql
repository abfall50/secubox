/*
  Warnings:

  - You are about to drop the column `wifi_client` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `wifi_company` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "wifi_client",
DROP COLUMN "wifi_company",
ADD COLUMN     "password_ssid1" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "password_ssid2" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "ssid_client" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "ssid_company" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "image" SET DEFAULT '/sx.png',
ALTER COLUMN "fidelity_msg" SET DEFAULT 'Profitez de l''offre au bout de 10 points!';
