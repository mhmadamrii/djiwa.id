import { JewerlyCategoryForm } from '@/components/forms/jewerly-category-form';
import { JewerlyForm } from '@/components/forms/jewerly-form';
import { useORPC } from '@/utils/orpc';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/jewerly')({
  component: RouteComponent,
});

function RouteComponent() {
  const orpc = useORPC();
  const jewerlyAssets = useQuery(
    orpc.jewerly.getAllJewerlyAssets.queryOptions(),
  );

  // console.log(jewerlyAssets.data);
  return (
    <div>
      <h1>Jewerly</h1>
      <section>
        <JewerlyForm />
      </section>
      <section>
        <JewerlyCategoryForm />
      </section>
    </div>
  );
}
