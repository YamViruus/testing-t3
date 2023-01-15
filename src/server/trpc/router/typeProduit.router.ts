import { createTypeProduitSchema, getProductsByTypeSchema, getTypeSchema } from '../schema/typeProduit.schema';
import {publicProcedure, router} from '../trpc';

export const typeProduitRouter = router({
    getAll: publicProcedure.query(async ({ctx}) => {
        return await ctx.prisma.typeProduit.findMany();
    }),
    
    createType: publicProcedure.input(createTypeProduitSchema).mutation(async({ctx, input}) => {
        try{
            return await ctx.prisma.typeProduit.create({data: {...input}});
        }
        catch(e) {
            console.log(e);
        }
    }),

    getType: publicProcedure.input(getTypeSchema).query(async({ctx, input}) => {
        try {
            return await ctx.prisma.typeProduit.findUnique({where:{id: input.produitTypeId}});
        }
        catch(e) {
            console.log(e);
        }
    }),

    updateType: publicProcedure.input(getTypeSchema).query(async({ctx, input}) => {
        try {
            return await ctx.prisma.typeProduit.update({where:{id: input.produitTypeId}, data : {...input}})
        }
        catch(e) {
            console.log(e);
        }
    }),

    removeType: publicProcedure.input(getTypeSchema).query(async({ctx, input}) => {
        try {
            return await ctx.prisma.typeProduit.delete({where:{id: input.produitTypeId}})
        }
        catch(e) {
            console.log(e);
        }
    }),

    getProduitByType: publicProcedure.input(getProductsByTypeSchema).query(async({ctx, input}) => {
        try{
            return await ctx.prisma.typeProduit.findUnique({where: {},include: {produits: true}})
        }
        catch(e) {
            console.log(e);
        }
    }),
})