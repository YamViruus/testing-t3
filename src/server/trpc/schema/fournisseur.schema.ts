import z from 'zod';

export const createFournisseurSchema = z.object({
    nom: z.string(),
    prenom: z.string(),
    address: z.string().optional(),
    phoneNumber: z.string().optional(),
    solde: z.number().default(0).optional()
});

export type  createFournisseurSchema = z.TypeOf<typeof createFournisseurSchema>;

export const getSingleFournisseurSchema = z.object({
    fournisseurId : z.string(),
});

export const updateFournisseurSchema = z.object({
    fournisseurId: z.string(),
    nom: z.string().optional(),
    prenom: z.string().optional(),
    address: z.string().optional(),
    phoneNumber: z.string().optional(),
    solde: z.number().optional()
});
