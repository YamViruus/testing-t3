/*
  Warnings:

  - You are about to drop the column `adresse` on the `Fournisseur` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fournisseur" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "address" TEXT,
    "phoneNumber" TEXT,
    "solde" REAL NOT NULL DEFAULT 0
);
INSERT INTO "new_Fournisseur" ("id", "nom", "phoneNumber", "prenom", "solde") SELECT "id", "nom", "phoneNumber", "prenom", "solde" FROM "Fournisseur";
DROP TABLE "Fournisseur";
ALTER TABLE "new_Fournisseur" RENAME TO "Fournisseur";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
