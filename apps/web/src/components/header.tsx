import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { SearchInput } from './ui/search-input';
import { useNavigate } from '@tanstack/react-router';
import { authClient } from '@/lib/auth-client';
import { useState, useEffect } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

import {
  Bell,
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from 'lucide-react';

type Role = 'user' | 'artist';
export function Header() {
  const navigate = useNavigate();
  const roles: Role[] = ['user', 'artist'];
  const [currentRole, setCurrentRole] = useState<Role>('user');

  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  console.log(session);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className='px-2 py-1'>
      <div className='flex flex-row items-center justify-between px-2 py-1'>
        <div>
          <SearchInput onFocus={() => setOpen(true)} className='rounded-full' />
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder='Type a command or search...' />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading='Suggestions'>
                <CommandItem>
                  <Calendar />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Smile />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Calculator />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading='Settings'>
                <CommandItem>
                  <User />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='border rounded-full flex'>
            {roles.map((role) => (
              <Button
                key={role}
                onClick={() => setCurrentRole(role)}
                variant='ghost'
                className={cn(
                  'text-gray-300 rounded-full',
                  currentRole === role &&
                    'text-[#FF3B30] hover:text-[#FF3B30]/80 bg-white',
                )}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            ))}
          </div>

          <Button size='icon' variant='ghost' className='rounded-full border'>
            <Bell />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer' asChild>
              <Avatar className='h-8 w-8'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-card'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{session?.user.email}</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button
                  variant='destructive'
                  className='w-full'
                  onClick={() => {
                    authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          navigate({
                            to: '/',
                          });
                        },
                      },
                    });
                  }}
                >
                  Sign Out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
