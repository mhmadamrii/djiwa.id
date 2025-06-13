import { Button } from '@/components/ui/button';
import { useORPC } from '@/utils/orpc';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/testing')({
  component: RouteComponent,
});

function RouteComponent() {
  const orpc = useORPC();
  const sendEmailVerification = useMutation(orpc.email.mutationOptions({}));

  async function onSubmit() {
    const res = await sendEmailVerification.mutateAsync({
      email: 'amri.s.amri@gmail.com',
    });
    console.log('res', res);
  }
  return (
    <div className='container mx-auto max-w-3xl px-4 py-2'>
      <h1>Testing NODEMAILER</h1>
      <Button onClick={onSubmit}>Send Email Verification</Button>
    </div>
  );
}
