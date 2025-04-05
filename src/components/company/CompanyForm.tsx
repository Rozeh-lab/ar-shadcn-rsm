'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import useAuth from "@/hooks/useAuth"

export default function CompanyForm() {
  const router = useRouter()
  const { createCompany } = useAuth()

  const [form, setForm] = useState({
    name: "",
    placeUrl: "",
    address: "",
    keywords: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const keywords = form.keywords.split(",").map((k) => k.trim())

    await createCompany({
      name: form.name,
      placeUrl: form.placeUrl,
      address: form.address,
      keywords,
    })

    router.push("/dashboard/companies")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="업체명" onChange={handleChange} className="input" />
      <input name="placeUrl" placeholder="네이버 플레이스 URL" onChange={handleChange} className="input" />
      <input name="address" placeholder="주소" onChange={handleChange} className="input" />
      <input name="keywords" placeholder="키워드 (쉼표로 구분)" onChange={handleChange} className="input" />
      <button type="submit" className="btn btn-primary">업체 등록</button>
    </form>
  )
}
