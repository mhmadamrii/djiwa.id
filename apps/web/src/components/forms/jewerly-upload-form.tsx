import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useMutation } from '@tanstack/react-query';
import { useORPC } from '@/utils/orpc';

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/ui/file-upload';

interface IProps {
  onStepClick: (stepNumber: number) => void;
}

export function JewerlyUploadForm({ onStepClick }: IProps) {
  const orpc = useORPC();
  const { mutateAsync } = useMutation(
    orpc.imageKit.authenticator.mutationOptions(),
  );
  const [files, setFiles] = React.useState<File[]>([]);

  const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;
  const urlEndpoint = 'https://ik.imagekit.io/mhmadamrii';

  const onFileValidate = React.useCallback(
    (file: File): string | null => {
      if (files.length >= 2) {
        return 'You can only upload up to 2 files';
      }

      if (!file.type.startsWith('image/')) {
        return 'Only image files are allowed';
      }

      const MAX_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_SIZE) {
        return `File size must be less than ${MAX_SIZE / (1024 * 1024)}MB`;
      }

      return null;
    },
    [files],
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

  return (
    <section className='flex flex-col items-center gap-4 mx-10'>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={async (r: any) => {
          return await mutateAsync(r);
        }}
      >
        <FileUpload
          value={files}
          onValueChange={setFiles}
          onFileValidate={onFileValidate}
          onFileReject={onFileReject}
          accept='image/*'
          maxFiles={2}
          className='w-full px-10'
          multiple
        >
          <FileUploadDropzone>
            <div className='flex flex-col items-center gap-1'>
              <div className='flex items-center justify-center rounded-full border p-2.5'>
                <Upload className='size-6 text-muted-foreground' />
              </div>
              <p className='font-medium text-sm'>Drag & drop files here</p>
              <p className='text-muted-foreground text-xs'>
                Or click to browse (max 2 files)
              </p>
              <IKUpload
                fileName='test-upload.png'
                onError={(err: any) => console.log('error', err)}
                onSuccess={(res: any) => console.log('success', res)}
                onUploadProgress={(progress: any) =>
                  console.log('progress', progress)
                }
                className='border border-red-500 absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center'
              />
            </div>
            <FileUploadTrigger asChild>
              <Button variant='outline' size='sm' className='mt-2 w-fit'>
                Browse files
              </Button>
            </FileUploadTrigger>
          </FileUploadDropzone>
          <FileUploadList>
            {files.map((file) => (
              <FileUploadItem key={file.name} value={file}>
                <FileUploadItemPreview />
                <FileUploadItemMetadata />
                <FileUploadItemDelete asChild>
                  <Button variant='ghost' size='icon' className='size-7'>
                    <X />
                  </Button>
                </FileUploadItemDelete>
              </FileUploadItem>
            ))}
          </FileUploadList>
        </FileUpload>
      </IKContext>
      <Button
        disabled={files.length < 1}
        onClick={() => {
          // onStepClick(3);
          console.log('files', files);
        }}
        className='w-full sm:w-1/4 bg-[#FF3B30] cursor-pointer hover:bg-[#FF3B30]/80'
        type='submit'
      >
        Next Step
      </Button>
    </section>
  );
}
