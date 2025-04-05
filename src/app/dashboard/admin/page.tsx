'use client'

import { useState } from 'react'
import * as XLSX from 'xlsx'
import { db } from '@/lib/firebase'
import { doc, setDoc, collection } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function AdminPage() {
  const [uploading, setUploading] = useState(false)
  const [log, setLog] = useState<string[]>([])

  const logMessage = (msg: string) => setLog(prev => [...prev, msg])

  const parseDate = (value: any): string => {
    if (typeof value === 'number') {
      const date = new Date((value - 25569) * 86400 * 1000)
      return date.toISOString().split('T')[0]
    }
    if (value instanceof Date) {
      return value.toISOString().split('T')[0]
    }
    return String(value)
  }

  const encodeId = (text: string) => encodeURIComponent(text.trim())

  const parsePlaceUrl = (url: string) => {
    const match = url.match(/(?:\/restaurant|\/place)\/(\d+)/)
    if (!match) return null
    return {
      category: 'restaurant',
      companyId: match[1],
    }
  }

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setLog([`📁 업로드 시작: ${file.name}`])
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data)

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName]
      const rows: any[] = XLSX.utils.sheet_to_json(sheet)
      logMessage(`📝 시트 처리 중: ${sheetName} (${rows.length}개)`)

      for (const [i, row] of rows.entries()) {
        if (sheetName === 'companies') {
          const parsed = parsePlaceUrl(row.placeUrl)
          if (!parsed) {
            logMessage(`❌ placeUrl 파싱 실패: ${row.placeUrl}`)
            continue
          }

          const companyId = parsed.companyId
          const companyDoc = doc(db, 'companies', companyId)

          const companyData = {
            companyId,
            category: parsed.category,
            name: row.name || '',
            placeUrl: row.placeUrl,
            agencyName: row.agencyName || '',
            group: row.group || '',
          }

          await setDoc(companyDoc, companyData, { merge: true })
          logMessage(`✅ [companies] ${companyId} 등록 완료 (${i + 1}/${rows.length})`)
          continue
        }

        const companyId = String(row.companyId)
        const date = parseDate(row.date)

        const subPath =
          sheetName === 'ranks' ? 'ranks' :
          sheetName === 'blog_press' ? 'blog_press' :
          sheetName === 'blog_experience' ? 'blog_experience' :
          sheetName === 'receipt_reviews' ? 'receipt_reviews' :
          sheetName === 'reservation_reviews' ? 'reservation_reviews' :
          sheetName === 'instagram_posts' ? 'instagram_posts' : null

        if (!subPath) {
          logMessage(`⚠️ 스킵됨 (지원되지 않는 시트): ${sheetName}`)
          continue
        }

        const companyDoc = doc(db, 'companies', companyId)
        await setDoc(companyDoc, { companyId }, { merge: true })

        const keyword = row.keyword || 'default'
        const docId = `${date}_${encodeId(keyword)}`
        const docRef = doc(collection(db, 'companies', companyId, subPath), docId)

        await setDoc(docRef, { ...row, date }, { merge: true })
        logMessage(`✅ [${sheetName}] ${companyId} > ${docId} 등록 완료 (${i + 1}/${rows.length})`)
      }
    }

    setUploading(false)
    logMessage('🎉 전체 업로드 완료')
    alert('업로드 완료')
  }

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-lg font-bold">엑셀 파일 등록</h2>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleExcelUpload}
        disabled={uploading}
      />
      <p className="text-sm text-muted-foreground">업로드 완료 시 자동 덮어쓰기 됩니다.</p>

      <div className="bg-muted text-sm rounded p-4 max-h-72 overflow-auto border">
        <pre className="whitespace-pre-wrap">{log.join('\n')}</pre>
      </div>
    </Card>
  )
}
