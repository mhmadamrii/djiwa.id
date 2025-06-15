import ImageKit from 'imagekit';
import { protectedProcedure } from '@/lib/orpc';

export const imageKitRouter = {
  authenticator: protectedProcedure.handler(async ({ context }) => {
    try {
      const imagekit = new ImageKit({
        publicKey: process.env.IMAGE_KIT_PUBLIC_KEY as string,
        privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
        urlEndpoint: 'https://ik.imagekit.io/mhmadamrii',
      });
      const res = imagekit.getAuthenticationParameters();
      console.log('res', res);
      return res;
    } catch (error) {
      console.log('error', error);
    }
  }),
};
