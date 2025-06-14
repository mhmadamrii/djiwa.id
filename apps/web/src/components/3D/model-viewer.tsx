'use client';

import '@google/model-viewer';
import { Card, CardContent } from '../ui/card';

export function ModelViewer({ src }: { src: string }) {
  return (
    <Card className='w-[200px]'>
      <CardContent className='w-full'>
        {/* @ts-ignore */}
        <model-viewer
          src={src}
          alt='A 3D model'
          auto-rotate
          camera-controls
          style={{ width: '100%', height: '200px' }}
          ar
        />
      </CardContent>
    </Card>
  );
}
