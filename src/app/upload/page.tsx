// src/app/upload/page.tsx
'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

function formatExcelDate(serial: number): string {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);
  return date_info.toISOString().split('T')[0];
}

export default function BlogUploadPage() {
  const [fileName, setFileName] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState('');

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    const formatted = json.map((row: any) => {
      const regdate = row['regdate'];
      return {
        ...row,
        regdate: typeof regdate === 'number' ? formatExcelDate(regdate) : regdate,
      };
    });

    setData(formatted);
  };

  const handleSubmitToFirebase = async () => {
    if (data.length === 0) return;
    setUploading(true);

    try {
      const companyId = prompt('업체 companyId를 입력해주세요 (예: com_0001)');
      if (!companyId) return;

      const companyRef = doc(db, 'companies', companyId);

      // 개별 포스트 등록
      for (const row of data) {
        await updateDoc(companyRef, {
          'blog.posts': arrayUnion(row),
        });
      }

      // posts 길이를 다시 가져와서 reported 값 반영
      const updatedSnap = await getDoc(companyRef);
      const updatedPosts = updatedSnap.data()?.blog?.posts || [];

      await updateDoc(companyRef, {
        'blog.reported': updatedPosts.length,
      });

      setResult(`✅ 총 ${data.length}건이 등록되었고 진행 수는 ${updatedPosts.length}건으로 반영되었습니다.`);
    } catch (err: any) {
      setResult(`❌ 오류: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="max-w-screen-md mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">블로그 기자단 엑셀 미리보기</h1>

      <div className="space-y-3 mb-6">
        <Input type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} />
        {fileName && <p className="text-sm text-gray-600">선택한 파일: {fileName}</p>}
        {data.length > 0 && <p className="text-sm text-green-600">총 {data.length}건의 데이터가 있습니다.</p>}
      </div>

      {data.length > 0 && (
        <>
          <div className="border rounded overflow-auto mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(data[0]).map((key) => (
                    <TableHead key={key}>{key}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, i) => (
                      <TableCell key={i}>{String(value)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Button disabled={uploading} onClick={handleSubmitToFirebase}>
            {uploading ? '업로드 중...' : 'Firebase에 등록하기'}
          </Button>
          {result && <p className="text-sm mt-2 text-blue-600 whitespace-pre-line">{result}</p>}
        </>
      )}
    </main>
  );
}
