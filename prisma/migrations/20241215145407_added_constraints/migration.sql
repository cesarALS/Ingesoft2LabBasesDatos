/*
  Warnings:

  - You are about to alter the column `gobernador` on the `Departamento` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `nombre` on the `Municipio` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `alcalde` on the `Municipio` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `Nombre_completo` on the `Persona` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `Teléfono` on the `Persona` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `Dirección` on the `Vivienda` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.

*/
-- AlterTable
ALTER TABLE "Departamento" ALTER COLUMN "gobernador" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "Municipio" ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "alcalde" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "Persona" ALTER COLUMN "Nombre_completo" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "Teléfono" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "Vivienda" ALTER COLUMN "Dirección" SET DATA TYPE VARCHAR(45);
