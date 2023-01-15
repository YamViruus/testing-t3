import z from 'zod';

export const createTypeProduitSchema = z.object({
    designation: z.string()
});

export const updateTypeProduitSchema = z.object({
    id: z.number(),
    designation: z.string().optional()
});

export const getTypeSchema = z.object({
    produitTypeId: z.number()
});

export const getProductsByTypeSchema = z.object({
    designation: z.string()
});

