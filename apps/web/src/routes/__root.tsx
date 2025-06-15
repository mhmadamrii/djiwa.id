import appCss from '../index.css?url';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { IKContext } from 'imagekitio-react';

import { useMutation, type QueryClient } from '@tanstack/react-query';
import { useORPC, type orpc } from '@/utils/orpc';

import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router';

export interface RouterAppContext {
  orpc: typeof orpc;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'My App',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  const orpc = useORPC();
  const isFetching = useRouterState({ select: (s) => s.isLoading });

  const { mutateAsync } = useMutation(
    orpc.imageKit.authenticator.mutationOptions(),
  );

  const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;
  const urlEndpoint = 'https://ik.imagekit.io/mhmadamrii';

  return (
    <html lang='en' className='dark'>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <IKContext
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={async (r: any) => {
              return await mutateAsync(r);
            }}
          >
            <Outlet />
          </IKContext>
        </ThemeProvider>
        <Toaster richColors />
        <TanStackRouterDevtools position='bottom-left' />
        <ReactQueryDevtools position='bottom' buttonPosition='bottom-right' />
        <Scripts />
      </body>
    </html>
  );
}
