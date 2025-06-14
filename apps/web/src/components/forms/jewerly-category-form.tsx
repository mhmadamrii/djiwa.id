import * as z from 'zod';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useORPC } from '@/utils/orpc';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(1),
  desc: z.string(),
});

export function JewerlyCategoryForm() {
  const orpc = useORPC();
  const { mutateAsync, isPending } = useMutation(
    orpc.jewerly.createJewerlyCategory.mutationOptions(),
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      desc: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      mutateAsync({
        name: values.name,
        description: values.desc,
      }).then((res) => {
        console.log('response', res);
        if (res.status === 'success') {
          toast.success('Successfully created category');
          form.reset();
        }
      });
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 max-w-3xl mx-auto py-10'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder='Ring' type='' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='desc'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Good assets to store'
                  className='resize-none'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' type='submit'>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
