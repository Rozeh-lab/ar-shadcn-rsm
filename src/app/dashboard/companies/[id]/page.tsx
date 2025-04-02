// app/companies/[id]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Company } from '@/types/company';

interface Props {
  params: { id: string };
}

export default async function CompanyDetailPage({ params }: Props) {
  const docRef = doc(db, 'companies', params.id);
  let snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    const defaultCompany = {
      name: '샘플 업체',
      placeUrl: 'https://example.com',
      keyword: '기본키워드',
      periodStart: Timestamp.fromDate(new Date()),
      periodEnd: Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
      rank: { current: 10, diff: 0 },
      blog: { target: 0, reported: 0 },
      experience: { target: 0, reported: 0 },
      agency: 'default-agency',
      status: 'pending',
    };
    await setDoc(docRef, defaultCompany);
    snapshot = await getDoc(docRef);
  }

  const company = snapshot.data();

  return (
    <main className="max-w-screen-lg mx-auto px-6 py-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{company?.name}</h1>
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">← 돌아가기</Link>
      </div>

      <section className="bg-white border rounded p-6 shadow-sm">
        <p className="text-sm text-gray-500">키워드: <span className="font-medium">{company.keyword}</span></p>
        <p className="text-sm mt-1">진행 기간: {company?.periodStart.toDate().toLocaleDateString()} ~ {company.periodEnd.toDate().toLocaleDateString()}</p>
        <p className="text-sm mt-1">
          플레이스 주소: <a href={company?.placeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">바로가기</a>
        </p>
        <p className="text-sm mt-1">현재 순위: {company?.rank?.current}위 (▲{company?.rank?.diff})</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {company?.blog ? (
          <div className="bg-white border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">블로그 기자단</h2>
            <p className="text-sm">타겟: {company.blog.target} / 진행: {company.blog.reported}</p>
          </div>
        ) : (
          <div className="bg-white border rounded p-4 text-gray-400">
            블로그 기자단 정보 없음
          </div>
        )}

        {company.experience ? (
          <div className="bg-white border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">체험단</h2>
            <p className="text-sm">타겟: {company.experience.target} / 진행: {company.experience.reported}</p>
          </div>
        ) : (
          <div className="bg-white border rounded p-4 text-gray-400">
            체험단 정보 없음
          </div>
        )}
      </section>

      <Accordion type="multiple" className="mt-8">
        <AccordionItem value="blog-log">
          <AccordionTrigger>블로그 기자단 검사 로그</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-700">검사 결과가 여기에 표시됩니다. (예: 누락 2건, 지도 미포함 1건)</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="experience-log">
          <AccordionTrigger>체험단 진행 로그</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-700">방문일 및 리뷰 등록 현황 등 체험단 관련 기록</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="receipt-log">
          <AccordionTrigger>영수증/예약자 리뷰 로그</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-700">포스팅 여부, 등록 일자, 승인 상태 등 확인</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}