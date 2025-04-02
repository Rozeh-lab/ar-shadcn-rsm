// scripts/seed.ts
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

// 🧪 Firebase 개발용 config (env로 따로 분리해도 좋음)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function seed() {
  const companies = [
    {
      id: '1',
      name: '남문대게',
      placeUrl: 'https://m.place.naver.com/restaurant/32159046/home',
      periodStart: '2025-04-03',
      periodEnd: '2025-05-02',
      keyword: '영덕맛집',
      rank: { current: 5, diff: 2 },
      blog: { target: 50, reported: 20 },
      experience: { target: 10, reported: 5 },
      status: 'pending',
      agency: 'richsolution',
    }
  ]

  for (const company of companies) {
    await setDoc(doc(db, 'companies', company.id), company)
    console.log(`✅ 등록됨: ${company.name}`)
  }
}

seed().then(() => {
  console.log('🎉 시드 데이터 등록 완료!')
  process.exit(0)
}).catch((err) => {
  console.error('❌ 등록 실패:', err)
  process.exit(1)
})

