-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "fidelity_admin" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "fidelity_company" BOOLEAN NOT NULL DEFAULT true;
