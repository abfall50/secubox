-- AlterTable
ALTER TABLE "Fidelity" ADD COLUMN     "connected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_connection" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
