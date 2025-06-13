'use client';

import * as z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export function LoginForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            navigate({
              to: '/dashboard',
            });
            toast.success('Sign in successful');
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      );
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <section className='flex flex-col gap-2'>
      <h1>Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 max-w-3xl mx-auto py-10'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='john@gmail.com' type='email' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='password' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className='w-full bg-[#FF3B30] cursor-pointer hover:bg-[#FF3B30]/80'
            type='submit'
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
