import { NAV_LINKS } from '@/constants';
import { cn } from '@/lib/utils';
import { Link, useLocation } from '@tanstack/react-router';

export function Sidebar() {
  const location = useLocation();
  return (
    <aside
      className={cn(
        'border w-1/5 flex-col gap-2.5 p-4 sticky top-0 z-30 hidden sm:flex',
      )}
    >
      <Link className='w-full' to='/'>
        <img src='/djiwaID.svg' alt='djiwaID' className='w-[120px] h-[100px]' />
      </Link>
      {NAV_LINKS.map(({ to, label, logo }) => {
        return (
          <Link className='flex items-center gap-2 p-2' key={to} to={to}>
            <img
              src={logo}
              alt='logo'
              className='w-[20px] h-[30px] text-red-500'
            />
            <span
              className={cn('', {
                'text-[#FF3B30]': location.pathname == to,
              })}
            >
              {label}
            </span>
          </Link>
        );
      })}
      <h1 className='texl-xl font-semibold'>Profile</h1>
    </aside>
  );
}
