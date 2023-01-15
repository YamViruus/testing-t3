import z from 'zod';
/* 
  id           Int                    @id @default(autoincrement())
  date         DateTime               @default(now())
  produits     BonCommandeOnProduit[]
  facture      Facture[]
  bonLivraison BonLivraison[]
*/

export const createBonCommandeSchema = z.object(
    {
        date : z.date().optional(),
        produits: z.array(z.object({
            code : z.string(),
            qte: z.number()
        })),
    }
);

export const updateBonCommandeSchema = z.object(
    {
        date: z.date().optional(),
        produits: z.array(z.object({
            code: z.string(),
            qte: z.number()
        }))
    }
);

export const getBonCommandeSchema = z.object({
    id : z.number().optional(),
    date: z.date().optional(),
    produits: z.array(z.object({
        code:z.string(),
        designation: z.string().optional(),
        qte: z.number().optional()
    }))
})

export const deleteBonCommandeSchema = z.object({
    id: z.number()
});

