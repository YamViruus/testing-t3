import {publicProcedure, router} from '../trpc';
import {createFournisseurSchema, getSingleFournisseurSchema, updateFournisseurSchema} from '../schema/fournisseur.schema';

export const fournisseurRouter = router({
    createFournisseur: publicProcedure.input(createFournisseurSchema).mutation(async ({ctx, input}) => {
        try{
        return await ctx.prisma.fournisseur.create({data: {...input}})
        }
        catch(e) {
            console.log(e);
        }
    }),
    getAll: publicProcedure.query(async ({ctx}) => {
        return await ctx.prisma.fournisseur.findMany();
    }),
    getOne: publicProcedure.input(getSingleFournisseurSchema).query(async ({ctx,input}) => {
        return await ctx.prisma.fournisseur.findUnique({where:{id: input.fournisseurId}});
    }),
    remove: publicProcedure.input(getSingleFournisseurSchema).mutation(async ({ctx, input}) => {
        try{
            return await ctx.prisma.fournisseur.delete({where: {id : input.fournisseurId}});
        }
        catch(e) {
            console.log(e);
        }
    }),
    update: publicProcedure.input(updateFournisseurSchema).mutation(async({ctx, input}) => {
        try{
            return await ctx.prisma.fournisseur.update({where: {id: input.fournisseurId},data: { ...input } });
        }   
        catch(e) {
            console.log(e);
        }
    })
});
