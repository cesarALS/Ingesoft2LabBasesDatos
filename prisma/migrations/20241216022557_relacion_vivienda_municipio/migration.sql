/*
  Warnings:

  - Added the required column `municipioId` to the `Vivienda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vivienda" ADD COLUMN     "municipioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Vivienda" ADD CONSTRAINT "Vivienda_municipioId_fkey" FOREIGN KEY ("municipioId") REFERENCES "Municipio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
