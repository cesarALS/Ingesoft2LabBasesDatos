/*
  Warnings:

  - The primary key for the `Dependientes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Persona` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fechaNacimiento` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `municipioId` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `viviendaId` on the `Persona` table. All the data in the column will be lost.
  - The primary key for the `Persona_has_Vivienda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `fecha_nacimiento` to the `Persona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vivienda_id` to the `Persona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `Persona` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "genero" AS ENUM ('masculino', 'femenino', 'otro');

-- DropForeignKey
ALTER TABLE "Dependientes" DROP CONSTRAINT "Dependientes_dependienteId_fkey";

-- DropForeignKey
ALTER TABLE "Dependientes" DROP CONSTRAINT "Dependientes_responsableId_fkey";

-- DropForeignKey
ALTER TABLE "Persona" DROP CONSTRAINT "Persona_municipioId_fkey";

-- DropForeignKey
ALTER TABLE "Persona" DROP CONSTRAINT "Persona_viviendaId_fkey";

-- DropForeignKey
ALTER TABLE "Persona_has_Vivienda" DROP CONSTRAINT "Persona_has_Vivienda_personaId_fkey";

-- AlterTable
ALTER TABLE "Dependientes" DROP CONSTRAINT "Dependientes_pkey",
ALTER COLUMN "responsableId" SET DATA TYPE BIGINT,
ALTER COLUMN "dependienteId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Dependientes_pkey" PRIMARY KEY ("dependienteId", "responsableId");

-- AlterTable
ALTER TABLE "Persona" DROP CONSTRAINT "Persona_pkey",
DROP COLUMN "fechaNacimiento",
DROP COLUMN "municipioId",
DROP COLUMN "viviendaId",
ADD COLUMN     "fecha_nacimiento" DATE NOT NULL,
ADD COLUMN     "vivienda_id" INTEGER NOT NULL,
ALTER COLUMN "id" SET DATA TYPE BIGINT,
DROP COLUMN "genero",
ADD COLUMN     "genero" "genero" NOT NULL,
ADD CONSTRAINT "Persona_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Persona_has_Vivienda" DROP CONSTRAINT "Persona_has_Vivienda_pkey",
ALTER COLUMN "personaId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Persona_has_Vivienda_pkey" PRIMARY KEY ("personaId", "viviendaId");

-- AddForeignKey
ALTER TABLE "Persona" ADD CONSTRAINT "Persona_viviendaId_fkey" FOREIGN KEY ("vivienda_id") REFERENCES "Vivienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependientes" ADD CONSTRAINT "Dependientes_dependienteId_fkey" FOREIGN KEY ("dependienteId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependientes" ADD CONSTRAINT "Dependientes_responsableId_fkey" FOREIGN KEY ("responsableId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Persona_has_Vivienda" ADD CONSTRAINT "Persona_has_Vivienda_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
