// app/components/dashboard/header.tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from "next/image";
import Link from 'next/link';
import  useAuth from '@/hooks/useAuth';

export default function DashboardHeader() {
    const {user, isLoading} = useAuth();
  return (
    <header className="sticky top-0 z-50 bg-slate-50 border-b border-gray-300 dark:bg-black dark:border-gray-800 px-12 py-3 flex items-center justify-between">
        <Link href={'/'} className="flex items-center gap-2">
            <Image className='dark:invert' src="./rsm-logo.svg" alt="RSM Logo" width={40} height={40} />
            <span className="text-2xl font-bold text-primary">RSM</span>
        </Link>
        <div className='flex items-center gap-3'>
            {!isLoading && user ? (
                <>
                    <img 
                        src={user?.photoURL ?? '/defalut-avatar.png'}
                        alt='User Avatar'
                        className='w-8 h-8 rounded-full'
                    />
                    <div>{user.displayName}</div>
                </>
            ):(
                null
            )}
        </div>
  </header>
  );
}

