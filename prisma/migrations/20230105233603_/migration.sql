-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "address" TEXT,
    "phoneNumber" TEXT DEFAULT '',
    "credit" REAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Fournisseur" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "solde" REAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Produit" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "designation" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "prixHT" REAL NOT NULL DEFAULT 0,
    "prixVT" REAL NOT NULL DEFAULT 0,
    "qte" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Produit_type_fkey" FOREIGN KEY ("type") REFERENCES "typeProduit" ("designation") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "typeProduit" (
    "designation" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "BonCommande" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fournisseur" TEXT NOT NULL,
    CONSTRAINT "BonCommande_fournisseur_fkey" FOREIGN KEY ("fournisseur") REFERENCES "Fournisseur" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BonCommandeOnProduit" (
    "bonCommande" INTEGER NOT NULL,
    "codeProduit" TEXT NOT NULL,
    "qte" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("bonCommande", "codeProduit"),
    CONSTRAINT "BonCommandeOnProduit_bonCommande_fkey" FOREIGN KEY ("bonCommande") REFERENCES "BonCommande" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BonCommandeOnProduit_codeProduit_fkey" FOREIGN KEY ("codeProduit") REFERENCES "Produit" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Facture" (
    "num" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bonCommande" INTEGER NOT NULL,
    "paye" BOOLEAN NOT NULL DEFAULT false,
    "totalPaye" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "Facture_bonCommande_fkey" FOREIGN KEY ("bonCommande") REFERENCES "BonCommande" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BonLivraison" (
    "num" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bonCommande" INTEGER NOT NULL,
    "totalPaye" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "BonLivraison_bonCommande_fkey" FOREIGN KEY ("bonCommande") REFERENCES "BonCommande" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reglement" (
    "num" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "facture" INTEGER NOT NULL,
    CONSTRAINT "Reglement_facture_fkey" FOREIGN KEY ("facture") REFERENCES "Facture" ("num") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EntreeStock" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalHT" REAL NOT NULL DEFAULT 0,
    "totalTTC" REAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "EntreeStockOnProduit" (
    "EntreeStock" TEXT NOT NULL,
    "produit" TEXT NOT NULL,

    PRIMARY KEY ("EntreeStock", "produit"),
    CONSTRAINT "EntreeStockOnProduit_produit_fkey" FOREIGN KEY ("produit") REFERENCES "Produit" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EntreeStockOnProduit_EntreeStock_fkey" FOREIGN KEY ("EntreeStock") REFERENCES "EntreeStock" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SortieStock" (
    "num" TEXT NOT NULL PRIMARY KEY,
    "motif" TEXT NOT NULL,
    "produit" TEXT NOT NULL,
    "qte" REAL NOT NULL,
    CONSTRAINT "SortieStock_produit_fkey" FOREIGN KEY ("produit") REFERENCES "Produit" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EtatStock" (
    "code" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "EtatStock_code_fkey" FOREIGN KEY ("code") REFERENCES "Produit" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AchatClientComptoir" (
    "num" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client" TEXT NOT NULL,
    CONSTRAINT "AchatClientComptoir_client_fkey" FOREIGN KEY ("client") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AchatClientOnProduit" (
    "num_achat" TEXT NOT NULL,
    "produit" TEXT NOT NULL,
    "qte" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("produit", "num_achat"),
    CONSTRAINT "AchatClientOnProduit_num_achat_fkey" FOREIGN KEY ("num_achat") REFERENCES "AchatClientComptoir" ("num") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AchatClientOnProduit_produit_fkey" FOREIGN KEY ("produit") REFERENCES "Produit" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaiementCredit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client" TEXT NOT NULL,
    CONSTRAINT "PaiementCredit_client_fkey" FOREIGN KEY ("client") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
