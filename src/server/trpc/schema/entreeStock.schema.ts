/*

model EntreeStock {
  code     String                 @id @default(uuid())
  date     DateTime               @default(now())
  totalHT  Float                  @default(0)
  totalTTC Float                  @default(0)
  produits EntreeStockOnProduit[]
}

*/
import z from 'zod';

export const createEntreeStock = z.object({
    date: z.date().optional(),
    // totalHT: z.number(),
    // totalTTC: z.number(),
    produits: z.array(z.object({
        code: z.string(),
        designation: z.string().optional(),
        prix_vente: z.number().optional(),
        prix_ht: z.number().optional(),
        qte: z.number()
    }))
})

export const deleteEntreeStock = z.object({
    code: z.string(),
    date: z.date().optional()
});

export const updateEntreeStock = z.object({
    code : z.string(),
    date: z.date().optional(),
    produits: z.array(z.object({
        code: z.string(),
        designation: z.string().optional(),
        prix_vente: z.number().optional(),
        prix_ht: z.number().optional(),
        qte: z.number().optional(),
    }))
});

export const getEntreeStock = z.object({
    code : z.string()
});
