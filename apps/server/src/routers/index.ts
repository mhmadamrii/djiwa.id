import { protectedProcedure, publicProcedure } from '../lib/orpc';
import { sendVerificationEmail } from './email';
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
};
export type AppRouter = typeof appRouter;
