-- CreateTable
CREATE TABLE "Personaje" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fuerza" INTEGER NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "objeto" TEXT,

    CONSTRAINT "Personaje_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personaje_nombre_key" ON "Personaje"("nombre");
