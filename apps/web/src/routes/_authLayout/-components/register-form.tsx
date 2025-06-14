'use client';

import * as z from 'zod';

import { useState } from 'react';
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

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await authClient.signUp.email(
        {
          email: values.email,
          password: values.password,
          name: 'something',
        },
        {
          onSuccess: (res) => {
            console.log('res', res);
            // navigate({
            //   to: '/dashboard',
            // });
            // toast.success('Sign up successful');
          },
          onError: (error) => {
            console.log('error', error);
            toast.error(error.error.message);
          },
        },
      );
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className='flex flex-col gap-2'>
      <h1>Register</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-[400px] mx-auto py-10'
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
            disabled={isLoading}
          >
            {isLoading ? 'Loading' : 'Submit'}
          </Button>
        </form>
      </Form>
    </section>
  );
}
