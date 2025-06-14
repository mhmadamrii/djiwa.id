import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_mainLayout/_main')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  if (!session && !isPending) {
    navigate({
      to: '/auth',
    });
  }
  return (
    <main className='flex min-h-screen'>
      <Sidebar />
      <section className={cn('flex flex-col gap-7 flex-grow')}>
        <Header />
        <Outlet />
      </section>
    </main>
  );
}
