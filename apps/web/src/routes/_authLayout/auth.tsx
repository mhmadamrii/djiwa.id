import { Card } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { LoginForm } from './-components/login-form';
import { RegisterForm } from './-components/register-form';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_authLayout/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <section className='h-screen flex flex-col items-center justify-center'>
      <Card>
        {isLoginForm ? <LoginForm /> : <RegisterForm />}
        <Button onClick={() => setIsLoginForm((prev) => !prev)}>
          {isLoginForm ? 'Login' : 'Register'}
        </Button>
      </Card>
    </section>
  );
}
