//keyword-rank-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface KeywordRankCardProps {
  keyword: string
  rank: number
  diff?: number // 어제 대비 변화량 (+1, -1, 0)
}

export function KeywordRankCard({ keyword, rank, diff }: KeywordRankCardProps) {
  const isUp = diff !== undefined && diff < 0
  const isDown = diff !== undefined && diff > 0

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{keyword}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{rank}위</div>
        {diff !== undefined && (
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            {isUp && <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />}
            {isDown && <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />}
            {isUp && `${Math.abs(diff)} 상승`}
            {isDown && `${Math.abs(diff)} 하락`}
            {!isUp && !isDown && "변동 없음"}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


