import {publicProcedure, router} from '../trpc';
import {createClientSchema, getSingleClientSchema, updateClientSchema} from '../schema/client.schema';


export const clientRouter = router({
    createClient: publicProcedure.input(createClientSchema).mutation(async ({ctx, input}) => {
        try{
        return await ctx.prisma.client.create({data: {...input}})
        }
        catch(e) {
            console.log(e);
        }
    }),
    getAll: publicProcedure.query(async ({ctx}) => {
        return await ctx.prisma.client.findMany();
    }),
    getOne: publicProcedure.input(getSingleClientSchema).query(async ({ctx,input}) => {
        return await ctx.prisma.client.findUnique({where:{id: input.clientId}});
    }),
    removeClient: publicProcedure.input(getSingleClientSchema).mutation(async ({ctx, input}) => {
        try{
            return await ctx.prisma.client.delete({where: {id : input.clientId}});
        }
        catch(e) {
            console.log(e);
        }
    }),
    updateClient: publicProcedure.input(updateClientSchema).mutation(async({ctx, input}) => {
        try{
            return await ctx.prisma.client.update({where: {id: input.id},data: { ...input } });
        }   
        catch(e) {
            console.log(e);
        }
    })
});
