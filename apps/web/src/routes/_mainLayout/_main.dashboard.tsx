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
    <section className='w-full h-full flex flex-col px-5'>
      <section className='flex gap-4 w-full h-full'>
        <div className='w-[70%] flex flex-col gap-4'>
          <img src='/banner.svg' className='border w-full' alt='Banner' />
          <div>
            <div className='flex w-full justify-between'>
              <h1 className='font-semibold text-xl'>Assets</h1>
              <div className='flex gap-3'>
                {data?.categories?.map((item) => (
                  <div key={item.id}>
                    <h1>{item.name}</h1>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-wrap gap-2'>
              {data?.jewerlies?.map((item) => {
                return (
                  <Card className='max-w-[250px] w-full' key={item.id}>
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
        </div>

        <div className='w-[30%] flex flex-col gap-4'>
          <div>
            <h1>Analytics</h1>
            <div className='grid grid-cols-2 gap-2'>
              <Card>
                <CardContent>Revenue</CardContent>
              </Card>
              <Card>
                <CardContent>Spending</CardContent>
              </Card>
              <Card>
                <CardContent>ROI</CardContent>
              </Card>
              <Card>
                <CardContent>Estimated</CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h1>Users</h1>
            <Card className='flex flex-wrap gap-2'>
              <CardContent>
                {data?.users?.map((item, idx) => {
                  return (
                    <div className='max-w-[300px] w-full' key={item.id}>
                      <div className='flex gap-2'>
                        <h1>{idx + 1}</h1>
                        <h1>{item.name}</h1>
                        <p>{item.email}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </section>
  );
}
