/*
  Warnings:

  - Changed the type of `nomorIdentitas` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "nomorIdentitas",
ADD COLUMN     "nomorIdentitas" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Book_nomorIdentitas_key" ON "Book"("nomorIdentitas");
