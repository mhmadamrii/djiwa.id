import { useFormStorage } from '@/lib/store';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { IKImage } from 'imagekitio-react';
import { Button } from '../ui/button';
import { useORPC } from '@/utils/orpc';
import { useMutation } from '@tanstack/react-query';
import { LoaderIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export function JewerlyPublishForm() {
  const orpc = useORPC();
  const navigate = useNavigate();

  const { jewerlyForm, resetJewerlyForm } = useFormStorage();

  const { mutateAsync, isPending } = useMutation(
    orpc.jewerly.createJewerlyAsset.mutationOptions(),
  );

  const handlePublish = async () => {
    try {
      const res = await mutateAsync({
        title: jewerlyForm.title,
        price: jewerlyForm.price,
        currency: jewerlyForm.currency,
        category_id: jewerlyForm.category,
        description: jewerlyForm.desc,
        image_url: jewerlyForm.image_url,
      });

      if (res.success) {
        toast.success('Asset published successfully');
        resetJewerlyForm();
        navigate({
          to: '/my-models',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='px-10 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <Label>Title</Label>
        <Input readOnly value={jewerlyForm.title} />
      </div>
      <div className='flex flex-col gap-2'>
        <Label>Price</Label>
        <Input readOnly value={jewerlyForm.price} />
      </div>
      <div className='flex flex-col gap-2'>
        <Label>Currency</Label>
        <Input readOnly value={jewerlyForm.currency} />
      </div>
      <div className='flex flex-col gap-2'>
        <Label>Description</Label>
        <Textarea readOnly value={jewerlyForm.desc} />
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='font-semibold text-xl'>Asset Attachment</h1>
        <IKImage
          src={jewerlyForm.image_url ?? ''}
          className='rounded-lg sm:w-[300px] sm:h-[200px] w-full h-full'
          alt='Asset Image'
        />
      </div>
      <div className='w-full flex items-center justify-end'>
        <Button
          disabled={isPending}
          onClick={handlePublish}
          className='w-full sm:w-1/4 bg-[#FF3B30] cursor-pointer hover:bg-[#FF3B30]/80'
        >
          {isPending ? <LoaderIcon className='animate-spin' /> : 'Publish'}
        </Button>
      </div>
    </section>
  );
}
