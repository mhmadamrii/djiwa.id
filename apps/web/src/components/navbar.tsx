import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isArtist, setIsArtist] = useState(false);

  return (
    <div className='flex gap-2 items-center'>
      <div
        onClick={() => setIsArtist(false)}
        className={cn('text-3xl', {
          'text-blue-500': !isArtist,
        })}
      >
        <span>User</span>
      </div>
      <div
        onClick={() => setIsArtist(true)}
        className={cn('text-3xl', {
          'text-red-500': isArtist,
        })}
      >
        <span>Artist</span>
      </div>
    </div>
  );
}
