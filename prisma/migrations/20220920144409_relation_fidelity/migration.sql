-- AddForeignKey
ALTER TABLE "Fidelity" ADD CONSTRAINT "Fidelity_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
