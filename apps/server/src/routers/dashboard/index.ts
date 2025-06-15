import prisma from 'prisma';

import { protectedProcedure } from '@/lib/orpc';

export const dashboardRouter = {
  getDashboardDatas: protectedProcedure.handler(async ({ context }) => {
    const users = await prisma.user.findMany();
    const jewerlies = await prisma.jewerlyAsset.findMany({
      include: {
        User: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    const categories = await prisma.category.findMany();

    return {
      success: true,
      users,
      jewerlies,
      categories,
    };
  }),
};
