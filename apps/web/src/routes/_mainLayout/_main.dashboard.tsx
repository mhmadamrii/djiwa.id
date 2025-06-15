// import { ModelViewer } from '@/components/3D/model-viewer';
import { Card, CardContent } from '@/components/ui/card';
import { useORPC } from '@/utils/orpc';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { IKImage } from 'imagekitio-react';

export const Route = createFileRoute('/_mainLayout/_main/dashboard')({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  const orpc = useORPC();
  const { data } = useQuery(orpc.dashboard.getDashboardDatas.queryOptions());

  return (
    <section className='flex gap-2 min-h-screen w-full border'>
      <div className='w-full'>
        <h1>Assets</h1>
        <div className='flex flex-wrap gap-2'>
          {data?.jewerlies?.map((item) => {
            return (
              <Card className='max-w-[300px] w-full' key={item.id}>
                <CardContent>
                  <IKImage
                    src={item.image_url ?? ''}
                    className='rounded-lg sm:w-[300px] sm:h-[200px] w-full h-full'
                    alt='Asset Image'
                  />
                  <h1 className='font-semibold text-xl'>{item.title}</h1>
                  <p>{item.description}</p>
                  <div className='flex gap-2 items-center'>
                    <span className='uppercase'>{item.currency}</span>
                    <span className='font-bold'>{item.price}</span>
                  </div>
                  <span className='italic'>By: {item?.User?.name}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <div className='w-1/2'>
        <h1>Users</h1>
        <div className='flex flex-wrap gap-2'>
          {data?.users?.map((item) => {
            return (
              <Card className='max-w-[300px] w-full' key={item.id}>
                <CardContent>
                  <h1>{item.name}</h1>
                  <p>{item.email}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <div className='flex flex-wrap gap-2'>
        {/* {Array.from({ length: 10 }).map((_, i) => (
          <ModelViewer key={i} src='/jewelry.glb' />
        ))} */}
      </div>
    </section>
  );
}
