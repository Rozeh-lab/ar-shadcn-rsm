import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { format, subDays } from "date-fns"

interface RankData {
  date: string
  keyword: string
  position: number
}

export function useRank(companyId: string, days: number = 5) {
  const [ranks, setRanks] = useState<RankData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!companyId) return

    const fetchRanks = async () => {
      try {
        const q = query(
          collection(db, "companies", companyId, "ranks"),
          orderBy("date", "desc"),
          limit(days)
        )
        const snapshot = await getDocs(q)
        const results: RankData[] = snapshot.docs.map(doc => doc.data() as RankData)
        setRanks(results)
      } catch (err) {
        console.error("❌ useRank error", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRanks()
  }, [companyId, days])

  return { ranks, loading }
}
