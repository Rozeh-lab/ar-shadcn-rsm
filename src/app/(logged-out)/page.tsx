'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
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
  )
}