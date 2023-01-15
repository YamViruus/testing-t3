/*
  Warnings:

  - You are about to drop the column `prixHT` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `prixVT` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `qte` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Produit` table. All the data in the column will be lost.
  - Added the required column `typeID` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "address" TEXT,
    "phoneNumber" TEXT,
    "credit" REAL NOT NULL DEFAULT 0
);
INSERT INTO "new_Client" ("address", "credit", "id", "nom", "phoneNumber", "prenom") SELECT "address", "credit", "id", "nom", "phoneNumber", "prenom" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE TABLE "new_Produit" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "designation" TEXT NOT NULL,
    "typeID" TEXT NOT NULL,
    CONSTRAINT "Produit_typeID_fkey" FOREIGN KEY ("typeID") REFERENCES "typeProduit" ("designation") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produit" ("code", "designation") SELECT "code", "designation" FROM "Produit";
DROP TABLE "Produit";
ALTER TABLE "new_Produit" RENAME TO "Produit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
