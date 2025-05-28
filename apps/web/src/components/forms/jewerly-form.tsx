import * as z from 'zod';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useORPC } from '@/utils/orpc';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  title: z.string().min(1),
  price: z.coerce.number().min(1).max(10000),
  currency: z.string(),
  category: z.string(),
  desc: z.string(),
  image_url: z.string().optional(),
});

export function JewerlyForm() {
  const orpc = useORPC();

  const { mutateAsync, isPending } = useMutation(
    orpc.jewerly.createJewerlyAsset.mutationOptions(),
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      price: 0,
      currency: '',
      category: '',
      desc: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      mutateAsync({
        title: values.title,
        price: values.price,
        currency: values.currency,
        category_id: values.category,
        description: values.desc,
        image_url: values.image_url,
      }).then((res) => {
        console.log('response', res);
        if (res.status === 'success') {
          toast.success('Successfully created asset');
          form.reset();
        }
      });
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }
  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 container mx-auto py-10'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Asset Title</FormLabel>
              <FormControl>
                <Input placeholder='Ring' type='' {...field} />
              </FormControl>
              <FormDescription>Jewerly name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder='3000' type='number' {...field} />
              </FormControl>
              <FormDescription>Your Jewerly Price</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex w-full gap-4'>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='currency'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='USD' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='usd'>USD</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Your currency asset</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='w-full'>
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='2ec82c06-3e94-45b6-8cb0-4d54d4d9cd51'>
                        2ec82c06-3e94-45b6-8cb0-4d54d4d9cd51
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your email settings.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name='desc'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Placeholder'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can @mention other users and organizations.
              </FormDescription>
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
