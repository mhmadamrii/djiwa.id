import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useORPC } from '@/utils/orpc';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  const orpc = useORPC();
  const healthCheck = useQuery(orpc.healthCheck.queryOptions());

  return (
    <div className='container mx-auto max-w-3xl px-4 py-2'>
      <div className='grid gap-6'>
        <section className='rounded-lg border p-4'>
          <h2 className='mb-2 font-medium'>API Status</h2>
          <div className='flex items-center gap-2'>
            <div
              className={`h-2 w-2 rounded-full ${healthCheck.data ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span className='text-muted-foreground text-sm'>
              {healthCheck.isLoading
                ? 'Checking...'
                : healthCheck.data
                  ? 'Connected'
                  : 'Disconnected'}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
