import Header from '@/components/header';
import { Navbar } from '@/components/navbar';

import { Sidebar } from '@/components/sidebar';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_mainLayout/_main')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session, isPending } = authClient.useSession();
  console.log('session', session);

  if (!session && !isPending) {
    navigate({
      to: '/auth',
    });
  }
  return (
    <main className='flex min-h-screen'>
      <Sidebar location={location.pathname} />
      <section className={cn('border flex-grow')}>
        <Header location={location.pathname} />
        <Navbar />
        <Outlet />
      </section>
    </main>
  );
}
