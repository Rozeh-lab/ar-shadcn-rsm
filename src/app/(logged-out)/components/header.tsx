import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomeHeader = () => {
    return(
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-black dark:border-gray-800 px-12 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="/rsm-logo.svg" alt="RSM Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-primary">RSM</span>
        </div>
        <nav className="hidden md:flex gap-8 text-base font-medium">
          <Link href="#solution" className="hover:underline">솔루션</Link>
          <Link href="#process" className="hover:underline">진행과정</Link>
          <Link href="#services" className="hover:underline">서비스</Link>
        </nav>
        <div className="flex gap-4 items-center">
          <Link href="/login">
            <Button variant="outline">로그인</Button>
          </Link>
          <Link href="/signup">
            <Button>회원가입</Button>
          </Link>
        </div>
      </header>
    )
}

export default HomeHeader;