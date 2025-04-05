'use client'

import { useEffect, useState } from "react"
import { collection, getDocs, setDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { CompanyData } from "@/types/company"
import RichViewCard from "@/components/company/RichViewCard"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Upload } from "lucide-react"
import * as XLSX from "xlsx"

export default function DashboardPage() {
  const [companies, setCompanies] = useState<CompanyData[]>([])
  const [filtered, setFiltered] = useState<CompanyData[]>([])
  const [selected, setSelected] = useState<CompanyData | null>(null)
  const [search, setSearch] = useState("")
  const [form, setForm] = useState({
    name: "",
    placeUrl: "",
    agencyName: "",
    group: ""
  })
  const [excelData, setExcelData] = useState<any[]>([])

  useEffect(() => {
    const fetchCompanies = async () => {
      const snapshot = await getDocs(collection(db, "companies"))
      const list = snapshot.docs.map(doc => doc.data() as CompanyData)
      setCompanies(list)
      setFiltered(list)
    }
    fetchCompanies()
  }, [])

  const parsePlaceUrl = (url: string) => {
    const match = url.match(/\/([a-zA-Z]+)\/(\d+)\//)
    if (!match) return null
    return {
      category: match[1],
      companyId: match[2]
    }
  }

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const json = XLSX.utils.sheet_to_json(sheet)
    setExcelData(json)
  }

  const handleExcelSubmit = async () => {
    const newList: CompanyData[] = []
    for (const item of excelData) {
      const { name, placeUrl, agencyName, group } = item as any
      const parsed = parsePlaceUrl(placeUrl)
      if (!parsed) continue

      const newCompany = {
        name,
        placeUrl,
        agencyName,
        group,
        companyId: parsed.companyId,
        category: parsed.category
      }
      await setDoc(doc(db, "companies", parsed.companyId), newCompany)
      newList.push(newCompany as CompanyData)
    }
    setCompanies(prev => [...prev, ...newList])
    setFiltered(prev => [...prev, ...newList])
    alert("엑셀 데이터 등록 완료")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleManualSubmit = async () => {
    const parsed = parsePlaceUrl(form.placeUrl)
    if (!parsed) return alert("유효한 네이버 플레이스 URL을 입력해주세요.")

    const newCompany = {
      name: form.name,
      placeUrl: form.placeUrl,
      agencyName: form.agencyName,
      group: form.group,
      companyId: parsed.companyId,
      category: parsed.category
    }

    await setDoc(doc(db, "companies", parsed.companyId), newCompany)
    setCompanies(prev => [...prev, newCompany as CompanyData])
    setFiltered(prev => [...prev, newCompany as CompanyData])
    setForm({ name: "", placeUrl: "", agencyName: "", group: "" })
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      {!selected ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">📋 업체 목록</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="w-4 h-4 mr-2" /> 업체 등록
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>업체 등록</DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                  <Input name="name" placeholder="업체명" value={form.name} onChange={handleInputChange} />
                  <Input name="placeUrl" placeholder="네이버 플레이스 URL" value={form.placeUrl} onChange={handleInputChange} />
                  <Input name="agencyName" placeholder="에이전시명" value={form.agencyName} onChange={handleInputChange} />
                  <Input name="group" placeholder="그룹명 (선택)" value={form.group} onChange={handleInputChange} />
                  <Button onClick={handleManualSubmit} className="w-full">직접 등록</Button>

                  <hr className="my-4" />

                  <p className="text-sm font-medium">엑셀 파일로 일괄 등록</p>
                  <Input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleExcelUpload}
                  />
                  <Button onClick={handleExcelSubmit} className="w-full">엑셀 데이터 등록 실행</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Input
            type="text"
            placeholder="업체명, 에이전시명 또는 그룹명 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filtered.map((c) => (
            <Card
              key={c.companyId}
              className="p-3 cursor-pointer hover:bg-muted"
              onClick={() => setSelected(c)}
            >
              <p className="font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground">
                {c.placeUrl} {c.agencyName ? `| ${c.agencyName}` : ""} {c.group ? `| 그룹: ${c.group}` : ""}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <RichViewCard company={selected as CompanyData} />
      )}
    </div>
  )
}
