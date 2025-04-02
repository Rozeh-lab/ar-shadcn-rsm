// app/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, setDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Company {
  id: string;
  name: string;
  placeUrl: string;
  keyword: string;
  periodStart: Timestamp;
  periodEnd: Timestamp;
  rank?: {
    current: number;
    diff: number;
  };
  blog?: {
    target: number;
    reported: number;
  };
  experience?: {
    target: number;
    reported: number;
  };
  agency?: string;
  status?: string;
}

export default function DashboardPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'companies'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Company[];
      setCompanies(data);
    };
    fetchData();
  }, []);

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    const id = Date.now().toString();
    const newCompany: Omit<Company, 'id'> = {
      name: '새 업체',
      placeUrl: 'https://example.com',
      keyword: '기본키워드',
      periodStart: Timestamp.fromDate(new Date()),
      periodEnd: Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
      blog: { target: 0, reported: 0 },
      experience: { target: 0, reported: 0 },
      agency: 'default-agency',
      status: 'pending',
    };
    await setDoc(doc(db, 'companies', id), newCompany);
    setCompanies(prev => [...prev, { id, ...newCompany }]);
  };

  const today = new Date().toLocaleDateString();

  return (
    <main className="max-w-screen-lg mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">마케팅 관리 대시보드</h1>
        <Button onClick={handleAdd}>+ 업체 추가</Button>
      </div>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="업체명 검색"
        className="w-full md:w-80"
      />

      <div className="space-y-4">
        {filtered.length === 0 && (
          <p className="text-gray-400 text-sm">검색 결과가 없습니다.</p>
        )}

        {filtered.map((company) => {
          const isIncomplete =
            company.blog?.target &&
            company.blog?.reported !== undefined &&
            company.blog.reported < company.blog.target;

          return (
            <div
              key={company.id}
              className={`border rounded p-4 shadow-sm bg-white ${
                isIncomplete ? 'border-red-300' : ''
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <Link
                    href={`dashboard/companies/${company.id}`}
                    className="text-lg font-semibold hover:underline text-blue-600"
                  >
                    {company.name}
                  </Link>
                  <p className="text-sm text-gray-500">{company.placeUrl}</p>
                </div>
                <span className="text-xs text-gray-400">{company.status}</span>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                키워드: {company.keyword} / 진행 기간:{' '}
                {company.periodStart?.toDate().toLocaleDateString()} ~{' '}
                {company.periodEnd?.toDate().toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-700 mt-1">
                블로그: 타겟 {company.blog?.target} / 진행 {company.blog?.reported}, 체험단: 타겟 {company.experience?.target} / 진행 {company.experience?.reported}
              </div>
              {isIncomplete && (
                <div className="text-xs text-red-500 mt-1">📌 오늘 기준 미완료 항목 존재</div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
