import prisma from '../../prisma';
import { betterAuth } from 'better-auth';
import { oneTap } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { oneTapClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/client';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || ''],
  plugins: [
    oneTap(), // Add the One Tap server plugin
  ],
  emailAndPassword: {
    enabled: true,
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
