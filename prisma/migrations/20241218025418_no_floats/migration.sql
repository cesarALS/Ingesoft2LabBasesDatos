/*
  Warnings:

  - You are about to alter the column `area` on the `Departamento` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `area` on the `Municipio` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Departamento" ALTER COLUMN "area" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Municipio" ALTER COLUMN "area" SET DATA TYPE INTEGER;
