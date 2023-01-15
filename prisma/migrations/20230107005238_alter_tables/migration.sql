/*
  Warnings:

  - You are about to drop the column `fournisseur` on the `BonCommande` table. All the data in the column will be lost.
  - Added the required column `prix_ht` to the `EntreeStockOnProduit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prix_vente` to the `EntreeStockOnProduit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qte` to the `EntreeStockOnProduit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fournisseurId` to the `BonCommande` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EntreeStockOnProduit" (
    "EntreeStock" TEXT NOT NULL,
    "produit" TEXT NOT NULL,
    "prix_ht" REAL NOT NULL,
    "prix_vente" REAL NOT NULL,
    "qte" INTEGER NOT NULL,

    PRIMARY KEY ("EntreeStock", "produit"),
    CONSTRAINT "EntreeStockOnProduit_produit_fkey" FOREIGN KEY ("produit") REFERENCES "Produit" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EntreeStockOnProduit_EntreeStock_fkey" FOREIGN KEY ("EntreeStock") REFERENCES "EntreeStock" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EntreeStockOnProduit" ("EntreeStock", "produit") SELECT "EntreeStock", "produit" FROM "EntreeStockOnProduit";
DROP TABLE "EntreeStockOnProduit";
ALTER TABLE "new_EntreeStockOnProduit" RENAME TO "EntreeStockOnProduit";
CREATE TABLE "new_BonCommande" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fournisseurId" TEXT NOT NULL,
    CONSTRAINT "BonCommande_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BonCommande" ("date", "id") SELECT "date", "id" FROM "BonCommande";
DROP TABLE "BonCommande";
ALTER TABLE "new_BonCommande" RENAME TO "BonCommande";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
