"use client";
 
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
 
interface MenuItemProps {
    children: React.ReactNode,
    href: string
}
 
const MenuItem: React.FC<MenuItemProps> = ({ children, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
 
  return (
    <Link href={href}
        className={cn("block p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md text-muted-foreground text-sm font-medium",
                        isActive && "bg-primary hover:bg-primary dark:hover:bg-primary hover:text-foreground text-white")}
                      >
        {children}
    </Link>
  )
}
 
export default MenuItem;