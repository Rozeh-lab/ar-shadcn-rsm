import type { Metadata } from "next";
import {  Noto_Sans_KR, Nanum_Gothic } from "next/font/google";
import { cn } from "@/lib/utils";;
import { cookies } from "next/headers"; 

import "./globals.css";
 
const nanumGothic = Nanum_Gothic({
  variable: "--font-nanum-sans",
  subsets: ["latin"],
  weight: ["400", "700" ],
});
const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
});
 
 
export const metadata: Metadata = {
  title: "더리치그룹 RSM Rich Solution Manager",
  description: "더리치 그룹과 함께하는 매출 상승 프로그램",
};
 
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   // 서버에서 다크 모드 쿠키 가져오기
   const darkModeCookie = (await cookies()).get("dark-mode")?.value;
   const isDarkMode = darkModeCookie === "true"; 
  
  return (
    <html lang="ko" >
      <body className="antialiased font-pretendard">
        {children}
      </body>
    </html>
  );
}