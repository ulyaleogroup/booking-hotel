-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('PRIA', 'WANITA');

-- CreateEnum
CREATE TYPE "Room" AS ENUM ('STANDARD', 'DELUXE', 'FAMILY');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "namaPemesan" TEXT NOT NULL,
    "nomorIdentitas" INTEGER NOT NULL,
    "jenisKelamin" "Gender" NOT NULL,
    "tipeKamar" "Room" NOT NULL,
    "harga" INTEGER NOT NULL,
    "tanggalPesan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "durasiMenginap" INTEGER NOT NULL,
    "sarapan" BOOLEAN NOT NULL,
    "total" BIGINT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_nomorIdentitas_key" ON "Book"("nomorIdentitas");
