import UserMenu from './user-menu';
import { Link } from '@tanstack/react-router';
import { ModeToggle } from './mode-toggle';

export default function Header() {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <div>
      <div className='flex flex-row items-center justify-between px-2 py-1'>
        <nav className='flex gap-4 text-lg'>
          {links.map(({ to, label }) => {
            return (
              <Link key={to} to={to}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className='flex pr-4 items-center gap-2'>
          <UserMenu />
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
