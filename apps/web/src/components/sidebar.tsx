import { NAV_LINKS } from '@/constants';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

export function Sidebar({ location }: { location: string }) {
  return (
    <aside
      className={cn(
        'border min-w-[300px] flex flex-col gap-2.5 max-w-[400px] p-4 sticky top-0 z-30',
        {
          hidden: location === '/auth',
        },
      )}
    >
      <Link className='w-full' to='/'>
        <img src='/djiwaID.svg' alt='djiwaID' className='w-[120px] h-[100px]' />
      </Link>
      {NAV_LINKS.map(({ to, label, logo }) => {
        return (
          <Link
            className='flex items-center text-xl gap-2 p-2'
            key={to}
            to={to}
          >
            <img
              src={logo}
              alt='logo'
              className='w-[30px] h-[30px] text-red-500'
            />
            <span>{label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
