/*

model Facture {
  num           Int         @id @default(autoincrement())
  date          DateTime    @default(now())
  bonCommandeID BonCommande @relation(fields: [bonCommande], references: [id])
  bonCommande   Int
  reglements    Reglement[]
  paye          Boolean     @default(false)
  totalPaye     Float       @default(0)
}
*/

import z from 'zod';


export const  createFactureSchema = z.object({
    date: z.date().optional(),
    totalPaye: z.number(),
    bonCommandeID: z.number(),
});