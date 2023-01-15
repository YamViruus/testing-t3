/* 
code        String      @id @default(cuid())
  designation String
  type        typeProduit @relation(fields: [typeID], references: [id])
  typeID      Int
*/

import z from 'zod';

export const createProduit = z.object({
    designation: z.string().trim(),
    typeID: z.number()
});

export const updateProduit = z.object({
    code : z.string(),
    designation: z.string().trim().optional(),
    typeID: z.number().optional()
});

export const getProduitById = z.object({
    code: z.string()
});


export const deleteProduitById = z.object({
    code: z.string()
});
