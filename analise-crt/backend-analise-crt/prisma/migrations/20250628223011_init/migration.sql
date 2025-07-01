-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aula" (
    "id" SERIAL NOT NULL,
    "renach" TEXT NOT NULL,
    "numeroAula" TEXT NOT NULL,
    "dataAula" TIMESTAMP(3) NOT NULL,
    "numeroChamado" TEXT NOT NULL,
    "mesReferencia" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Aguardando',
    "motivoRejeicao" TEXT,
    "dataAtualizacao" TIMESTAMP(3) NOT NULL,
    "criadoPorId" INTEGER NOT NULL,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
