import React from "react";
import MenuTitle from "./menu-title";
import MenuItem from "./menu-item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
 
const MainMenu: React.FC = () => {
  return (
    <nav className="bg-muted overflow-auto p-4 flex flex-col h-full">
      <header className="border-b dark:border-b-black border-b-zinc-300  pb-4">
        <MenuTitle />
      </header>
 
      <ul className="py-4 grow flex flex-col gap-1">
        <MenuItem href="/dashboard">대시보드</MenuItem>
        <MenuItem href="/dashboard/company">업체관리</MenuItem>
        <MenuItem href="/dashboard/rank">순위체크관리</MenuItem>
        <MenuItem href="/dashboard/content">컨텐츠관리</MenuItem>
        <MenuItem href="/dashboard/setting">설정</MenuItem>
      </ul>
 
      <footer className="flex gap-2 items-center">
        <Avatar>
          <AvatarFallback className="bg-pink-300 dark:bg-pink-800">
            {" "}
            TP{" "}
          </AvatarFallback>
        </Avatar>
        <Link href="/" className="hover:underline">
          로그아웃
        </Link>
        <ThemeToggle />
      </footer>
    </nav>
  );
};
 
export default MainMenu;