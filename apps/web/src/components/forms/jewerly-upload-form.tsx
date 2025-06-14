import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

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
  const [files, setFiles] = React.useState<File[]>([]);

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
      <div className='w-full flex justify-end items-center'>
        <Button
          disabled={files.length < 1}
          onClick={() => {
            // onStepClick(3);
            console.log('files', files);
          }}
          className='w-full sm:w-1/4 bg-[#FF3B30] cursor-pointer hover:bg-[#FF3B30]/80'
          type='submit'
        >
          Upload
        </Button>
      </div>
    </section>
  );
}
