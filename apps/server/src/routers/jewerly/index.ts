import { protectedProcedure } from '@/lib/orpc';
import prisma from 'prisma';
import z from 'zod';

export const jewerlyRouter = {
  jewerlyAsset: protectedProcedure.handler(({ input, context }) => {
    return {
      message: 'This is jewerlyAsset',
      user: context.session?.user,
      input,
    };
  }),
  getAllJewerlyAssets: protectedProcedure.handler(async ({ context }) => {
    const jewerlies = await prisma.jewerlyAsset.findMany();
    return {
      message: 'This is getAllJewerlyAssets',
      user: context.session?.user,
      jewerlies,
    };
  }),
  createJewerlyCategory: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string(),
      }),
    )
    .handler(async ({ input, context }) => {
      const jewerlyCategory = await prisma.category.create({
        data: input,
      });
      return {
        status: 'success',
        jewerlyCategory,
      };
    }),
  createJewerlyAsset: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        price: z.number().min(1).max(10000),
        currency: z.string(),
        category_id: z.string(),
        description: z.string(),
        image_url: z.string().optional(),
      }),
    )
    .handler(async ({ input, context }) => {
      const jewerly = await prisma.jewerlyAsset.create({
        data: input,
      });
      return {
        status: 'success',
        jewerly,
      };
    }),
};
