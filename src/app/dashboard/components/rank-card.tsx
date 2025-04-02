// components/RankCard.tsx
'use client'

import { ArrowDown, ArrowUp, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  keyword: string
  currentRank: number
  previousRank: number
  exposureDays?: number
}

export default function RankCard({
  keyword,
  currentRank,
  previousRank,
  exposureDays = 0,
}: Props) {
  const diff = previousRank - currentRank // 순위 상승 시 양수
  const isUp = diff > 0
  const isDown = diff < 0

  const ArrowIcon = isUp ? ArrowUp : isDown ? ArrowDown : Minus
  const color = isUp ? 'text-red-500' : isDown ? 'text-blue-500' : 'text-gray-400'
  const arrowSize = Math.abs(diff) >= 3 ? 'h-5 w-5' : 'h-3 w-3'

  return (
    <div className="flex flex-row pl-5 justify-center items-center gap-3 border shadow-sm cursor-pointer hover:bg-muted transition">
      <div className="text-xs text-muted-foreground">{keyword}</div>
      <div className="text-lg font-bold">{currentRank}위</div>
      <div className={cn('flex items-center text-sm font-medium', color)}>
        <ArrowIcon className={cn('mr-1', arrowSize)} />
        {diff === 0 ? '변동 없음' : `${Math.abs(diff)}단계 ${isUp ? '상승' : '하락'}`}
      </div>
      <div className="text-[11px] text-muted-foreground">{exposureDays}일 노출</div>
    </div>
  )
}
