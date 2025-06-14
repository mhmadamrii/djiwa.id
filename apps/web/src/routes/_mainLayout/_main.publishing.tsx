import { JewerlyForm } from '@/components/forms/jewerly-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_mainLayout/_main/publishing')({
  component: RouteComponent,
});

function RouteComponent() {
  return <JewerlyForm />;
}
