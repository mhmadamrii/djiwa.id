// import { ModelViewer } from '@/components/3D/model-viewer';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_mainLayout/_main/dashboard')({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  return (
    <section className='flex flex-col gap-2 h-screen w-full border items-center justify-center'>
      <div className='flex flex-wrap gap-2'>
        {/* {Array.from({ length: 10 }).map((_, i) => (
          <ModelViewer key={i} src='/jewelry.glb' />
        ))} */}
      </div>
    </section>
  );
}
