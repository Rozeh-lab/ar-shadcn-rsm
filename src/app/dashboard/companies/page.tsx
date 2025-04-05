'use client'

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { CompanyData } from "@/types/company"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function CompanyListPage() {
  const [companies, setCompanies] = useState<CompanyData[]>([])

  useEffect(() => {
    const fetchCompanies = async () => {
      const snapshot = await getDocs(collection(db, "companies"))
      const list = snapshot.docs.map((doc) => doc.data() as CompanyData)
      setCompanies(list)
    }
    fetchCompanies()
  }, [])

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">📋 업체 목록</h1>
      {companies.map((company) => (
        <Card key={company.companyId} className="p-4 flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">{company.name}</p>
            <p className="text-sm text-muted-foreground">{company.address}</p>
          </div>
          <Link href={`/dashboard/companies/${company.companyId}`}>
            <span className="text-blue-500 hover:underline">자세히 보기</span>
          </Link>
        </Card>
      ))}
    </div>
  )
}
