import Header from '../components/header';
import Loader from '@/components/loader';
import appCss from '../index.css?url';

import { ThemeProvider } from '@/components/theme-provider';
import { NAV_LINKS } from '@/constants';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import type { QueryClient } from '@tanstack/react-query';
import type { orpc } from '@/utils/orpc';

import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router';
import { Sidebar } from '@/components/sidebar';

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
  const isFetching = useRouterState({ select: (s) => s.isLoading });

  return (
    <html lang='en' className='dark'>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <main className='flex min-h-screen'>
            <Sidebar />
            <section className='border flex-grow'>
              <Header />
              <Outlet />
            </section>
          </main>
        </ThemeProvider>
        <Toaster richColors />
        <TanStackRouterDevtools position='bottom-left' />
        <ReactQueryDevtools position='bottom' buttonPosition='bottom-right' />
        <Scripts />
      </body>
    </html>
  );
}
