import z from 'zod';

export const createClientSchema = z.object({
    nom: z.string(),
    prenom: z.string(),
    address: z.string().optional(),
    phoneNumber: z.string().optional(),
    credit: z.number().default(0).optional()
});

export type  createClientSchema = z.TypeOf<typeof createClientSchema>;

export const getSingleClientSchema = z.object({
    clientId : z.string(),
});

export const updateClientSchema = z.object({
    id: z.string(),
    nom: z.string().optional(),
    prenom: z.string().optional(),
    address: z.string().optional(),
    phoneNumber: z.string().optional(),
    credit: z.number().optional()
});
