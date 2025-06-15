import { protectedProcedure, publicProcedure } from '../lib/orpc';
import { dashboardRouter } from './dashboard';
import { sendVerificationEmail } from './email';
import { imageKitRouter } from './image-kit';
import { jewerlyRouter } from './jewerly';

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return 'OK';
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: 'This is private',
      user: context.session?.user,
    };
  }),
  jewerly: jewerlyRouter,
  email: sendVerificationEmail,
  imageKit: imageKitRouter,
  dashboard: dashboardRouter,
};
export type AppRouter = typeof appRouter;
