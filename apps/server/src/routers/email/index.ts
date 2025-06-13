import * as z from 'zod';
import crypto from 'crypto';

import { publicProcedure } from '@/lib/orpc';
import { sendEmail } from '@/lib/email'; // assuming email.ts is in lib/

const tokenStore = new Map<string, { email: string; expiresAt: number }>();

export const sendVerificationEmail = publicProcedure
  .input(z.object({ email: z.string().email() }))
  .handler(async ({ input }) => {
    const { email } = input;

    try {
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = Date.now() + 1000 * 60 * 15; // 15 mins
      console.log('token', token);

      tokenStore.set(token, { email, expiresAt });

      const url = `https://yourdomain.com/verify-email?token=${token}`;

      const res = await sendEmail({
        to: email,
        subject: 'Verify your email address',
        text: `Click this link to verify your email: ${url}`,
      }).then((r) => console.log('res', r));

      return { success: true };
    } catch (error) {
      console.log('error', error);
    }
  });
