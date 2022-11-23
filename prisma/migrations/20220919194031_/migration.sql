/*
  Warnings:

  - A unique constraint covering the columns `[id_secubox]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Company_id_secubox_key" ON "Company"("id_secubox");
