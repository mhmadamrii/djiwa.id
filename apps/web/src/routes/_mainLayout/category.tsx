import { JewerlyCategoryForm } from '@/components/forms/jewerly-category-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_mainLayout/category')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <JewerlyCategoryForm />
    </section>
  );
}
