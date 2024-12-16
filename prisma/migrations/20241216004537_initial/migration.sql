-- CreateTable
CREATE TABLE "Vivienda" (
    "id" SERIAL NOT NULL,
    "direccion" VARCHAR(45) NOT NULL,
    "tamano" INTEGER NOT NULL,
    "pisos" INTEGER NOT NULL,

    CONSTRAINT "Vivienda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departamento" (
    "nombre" VARCHAR(30) NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "poblacion" INTEGER NOT NULL,
    "gobernador" VARCHAR(60) NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("nombre")
);

-- CreateTable
CREATE TABLE "Municipio" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "poblacion" INTEGER NOT NULL,
    "alcalde" VARCHAR(60) NOT NULL,
    "departamentoNombre" TEXT NOT NULL,

    CONSTRAINT "Municipio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Persona" (
    "id" INTEGER NOT NULL,
    "nombre" VARCHAR(60) NOT NULL,
    "telefono" VARCHAR(10) NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "genero" INTEGER,
    "viviendaId" INTEGER NOT NULL,
    "municipioId" INTEGER NOT NULL,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependientes" (
    "responsableId" INTEGER NOT NULL,
    "dependienteId" INTEGER NOT NULL,

    CONSTRAINT "Dependientes_pkey" PRIMARY KEY ("dependienteId","responsableId")
);

-- CreateTable
CREATE TABLE "Persona_has_Vivienda" (
    "personaId" INTEGER NOT NULL,
    "viviendaId" INTEGER NOT NULL,

    CONSTRAINT "Persona_has_Vivienda_pkey" PRIMARY KEY ("personaId","viviendaId")
);

-- AddForeignKey
ALTER TABLE "Municipio" ADD CONSTRAINT "Municipio_departamentoNombre_fkey" FOREIGN KEY ("departamentoNombre") REFERENCES "Departamento"("nombre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Persona" ADD CONSTRAINT "Persona_municipioId_fkey" FOREIGN KEY ("municipioId") REFERENCES "Municipio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Persona" ADD CONSTRAINT "Persona_viviendaId_fkey" FOREIGN KEY ("viviendaId") REFERENCES "Vivienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependientes" ADD CONSTRAINT "Dependientes_dependienteId_fkey" FOREIGN KEY ("dependienteId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependientes" ADD CONSTRAINT "Dependientes_responsableId_fkey" FOREIGN KEY ("responsableId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Persona_has_Vivienda" ADD CONSTRAINT "Persona_has_Vivienda_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Persona_has_Vivienda" ADD CONSTRAINT "Persona_has_Vivienda_viviendaId_fkey" FOREIGN KEY ("viviendaId") REFERENCES "Vivienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
