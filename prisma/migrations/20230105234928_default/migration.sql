-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "address" TEXT DEFAULT '',
    "phoneNumber" TEXT DEFAULT '',
    "credit" REAL NOT NULL DEFAULT 0
);
INSERT INTO "new_Client" ("address", "credit", "id", "nom", "phoneNumber", "prenom") SELECT "address", "credit", "id", "nom", "phoneNumber", "prenom" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
