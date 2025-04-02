import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-slate-300">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-black dark:border-gray-800 px-12 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">RSM</div>
        <nav className="flex gap-8 text-base font-medium">
          <Link href="#solution" className="hover:underline">솔루션</Link>
          <Link href="#process" className="hover:underline">진행과정</Link>
          <Link href="#services" className="hover:underline">서비스</Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="outline">로그인</Button>
          </Link>
          <Link href="/signup">
            <Button>회원가입</Button>
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-grow bg-gradient-to-b from-white to-slate-50 dark:from-black dark:to-zinc-900 py-32 px-12 text-center">
        <h1 className="text-6xl font-bold mb-8 leading-tight text-primary">
          더 리치 솔루션과 함께하는
          <br className="hidden md:block" />
          외식업 매출 상승 프로그램
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          광고비를 쓰는데 매출이 오르지 않는다면? <br />
          10년 외식업 마케팅 경험으로 매출 최대 200% 상승을 약속드립니다.
        </p>
        <Link href="/login">
          <Button size="lg">매출 상승 시작하기</Button>
        </Link>
      </main>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-8 px-12 text-center text-sm text-muted-foreground">
        © 2025 더 리치 솔루션. All rights reserved.
      </footer>
    </div>
  )
}
