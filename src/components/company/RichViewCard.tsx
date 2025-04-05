'use client'

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, ExternalLink } from "lucide-react"
import { CompanyData } from "@/types/company"
import { useRank } from '@/hooks/useRank'
import { format, parseISO } from 'date-fns'

interface Props {
  company: CompanyData
}

function toMobilePlaceUrl(placeUrl: string): string {
  const match = placeUrl.match(/place\/(\d+)/)
  if (!match) return placeUrl
  const placeId = match[1]
  return `https://m.place.naver.com/restaurant/${placeId}/home`
}

export default function RichViewCard({ company }: Props) {
  const [showRankTable, setShowRankTable] = useState(false)
  const mobilePlaceUrl = toMobilePlaceUrl(company.placeUrl)
  const { ranks } = useRank(company.companyId, 30)

  const today = ranks[0]
  const yesterday = ranks[1]

  const todayRanks = today ? [today].map(todayRank => {
    const yRank = yesterday && yesterday.keyword === todayRank.keyword ? yesterday : null
    const trend = yRank ? yRank.position - todayRank.position : undefined
    return {
      ...todayRank,
      trend,
    }
  }) : []

  const visibleThreshold = 10
  const keywordExposure: { [key: string]: number } = {}
  ranks.forEach(r => {
    if (r.position <= visibleThreshold) {
      keywordExposure[r.keyword] = (keywordExposure[r.keyword] || 0) + 1
    }
  })

  const sortedDates = [...new Set(ranks.map(r => r.date))].sort((a, b) => b.localeCompare(a))
  const keywords = [...new Set(ranks.map(r => r.keyword))]

  const rankTable: { [keyword: string]: { [date: string]: number } } = {}
  keywords.forEach(k => {
    rankTable[k] = {}
  })
  ranks.forEach(r => {
    rankTable[r.keyword][r.date] = r.position
  })

  return (
    <Card className="rounded-2xl shadow-md p-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full h-[600px] border rounded-xl overflow-hidden">
          <iframe
            src={mobilePlaceUrl}
            title={`${company.name} 네이버 플레이스`}
            className="w-full h-full rounded-md"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <CardHeader className="p-0">
            <div className="flex items-start justify-between md:flex-row flex-col md:items-center gap-2">
              <CardTitle className="text-xl font-bold md:text-left text-center">
                {company.name}
              </CardTitle>
              <div className="flex gap-2 self-end">
                <Button size="icon" variant="outline"><Pencil size={16} /></Button>
                <Button size="icon" variant="outline"><Trash2 size={16} /></Button>
              </div>
            </div>
          </CardHeader>

          {company.placeUrl && (
            <div className="text-sm">
              <p className="text-muted-foreground">네이버 플레이스 주소</p>
              <a href={company.placeUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:underline inline-flex items-center gap-1">
                {company.placeUrl}
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          <div className="text-sm space-y-1">
            {company.agencyName && <p><span className="font-semibold">에이전시:</span> {company.agencyName}</p>}
            {company.group && <p><span className="font-semibold">그룹:</span> {company.group}</p>}
            <p><span className="font-semibold">카테고리:</span> {company.category}</p>
            <p><span className="font-semibold">업체ID:</span> {company.companyId}</p>
          </div>

          {Object.keys(keywordExposure).length > 0 && (
            <div className="pt-4 border-t">
              <h3 className="font-semibold text-sm mb-2">📈 노출일 수 (TOP {visibleThreshold} 이내)</h3>
              <ul className="text-sm list-disc pl-5">
                {Object.entries(keywordExposure).map(([keyword, count], idx) => (
                  <li key={idx}>{keyword}: {count}일 노출</li>
                ))}
              </ul>
            </div>
          )}

          {todayRanks.length > 0 && (
            <div className="pt-4 border-t">
              <h3 className="font-semibold text-sm mb-2">📌 오늘 순위</h3>
              <div className="flex flex-wrap gap-3">
                {todayRanks.map((rank, idx) => {
                  const trend = rank.trend
                  const trendSymbol = trend === undefined || trend === 0 ? '—' : trend > 0 ? `▲${trend}` : `▼${Math.abs(trend)}`
                  return (
                    <Badge key={idx} variant="outline" className="bg-violet-100 text-violet-600 px-3 py-2 text-xs font-semibold cursor-pointer" onClick={() => setShowRankTable(prev => !prev)}>
                      <div className="flex flex-col items-center gap-1">
                        <span>{rank.keyword}</span>
                        <span>{rank.position}위 {trendSymbol}</span>
                      </div>
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}

          {showRankTable && (
            <div className="pt-4 border-t">
              <h3 className="font-semibold text-sm mb-2">📅 일자별 순위 기록</h3>
              <div className="overflow-x-auto">
                <table className="text-sm border min-w-max">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 py-1 border sticky left-0 bg-gray-100 z-10">키워드 \ 날짜</th>
                      {sortedDates.map(date => (
                        <th key={date} className="px-2 py-1 border whitespace-nowrap">
                          {format(parseISO(date), 'MM-dd')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {keywords.map(keyword => (
                      <tr key={keyword}>
                        <td className="font-medium border px-2 py-1 whitespace-nowrap sticky left-0 bg-white z-10">{keyword}</td>
                        {sortedDates.map(date => (
                          <td key={date} className="border px-2 py-1 text-center">
                            {rankTable[keyword][date] ? `${rankTable[keyword][date]}위` : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}