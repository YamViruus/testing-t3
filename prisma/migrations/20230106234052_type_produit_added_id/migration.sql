/*
  Warnings:

  - The primary key for the `typeProduit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `typeID` on the `Produit` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `id` to the `typeProduit` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_typeProduit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "designation" TEXT NOT NULL
);
INSERT INTO "new_typeProduit" ("designation") SELECT "designation" FROM "typeProduit";
DROP TABLE "typeProduit";
ALTER TABLE "new_typeProduit" RENAME TO "typeProduit";
CREATE UNIQUE INDEX "typeProduit_designation_key" ON "typeProduit"("designation");
CREATE TABLE "new_Produit" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "designation" TEXT NOT NULL,
    "typeID" INTEGER NOT NULL,
    CONSTRAINT "Produit_typeID_fkey" FOREIGN KEY ("typeID") REFERENCES "typeProduit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produit" ("code", "designation", "typeID") SELECT "code", "designation", "typeID" FROM "Produit";
DROP TABLE "Produit";
ALTER TABLE "new_Produit" RENAME TO "Produit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
