import prisma from '../../prisma';
import { betterAuth } from 'better-auth';
import { oneTap } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { oneTapClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/client';

export const auth = betterAuth({
  user: {
    additionalFields: {
      role: true as any,
    },
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});

export const authClient = createAuthClient({
  plugins: [
    oneTapClient({
      clientId: 'YOUR_CLIENT_ID',
      // Optional client configuration:
      autoSelect: false,
      cancelOnTapOutside: true,
      context: 'signin',
      additionalOptions: {
        // Any extra options for the Google initialize method
      },
      // Configure prompt behavior and exponential backoff:
      promptOptions: {
        baseDelay: 1000, // Base delay in ms (default: 1000)
        maxAttempts: 5, // Maximum number of attempts before triggering onPromptNotification (default: 5)
      },
    }),
  ],
});
