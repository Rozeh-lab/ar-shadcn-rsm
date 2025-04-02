// scripts/seed.ts
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore'

// ✅ Firebase config (로컬 개발용 .env에서 불러와도 좋음)
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  }

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// ✅ undefined 제거 유틸
function removeUndefined(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}

// ✅ 시드 데이터
const companies = [
  {
    id: '1',
    name: '남문대게',
    placeUrl: 'https://m.place.naver.com/restaurant/32159046/home',
    periodStart: Timestamp.fromDate(new Date('2025-04-03')),
    periodEnd: Timestamp.fromDate(new Date('2025-05-02')),
    keyword: '영덕맛집',
    rank: { current: 5, diff: 2 },
    blog: { target: 50, reported: 20 },
    experience: { target: 10, reported: 5 },
    status: 'pending',
    agency: 'richsolution',
  },
]

async function seed() {
  for (const company of companies) {
    await setDoc(doc(db, 'companies', company.id), removeUndefined(company))
    console.log(`✅ 등록 완료: ${company.name}`)
  }
}

seed()
  .then(() => {
    console.log('🎉 모든 시드 데이터 등록 완료!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('❌ 시드 등록 실패:', err)
    process.exit(1)
  })
