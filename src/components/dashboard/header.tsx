// app/components/dashboard/header.tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DashboardHeader() {

  return (
      <header className="w-full flex items-center justify-between border-b px-6 py-4 bg-white">
        <div className="text-lg font-bold">🔷 Rich Solution Manager</div>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://i.pravatar.cc/150?img=1" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">로그인 사용자</span>
        </div>
      </header>
  );
}

