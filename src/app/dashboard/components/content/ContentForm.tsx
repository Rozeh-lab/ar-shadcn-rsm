'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

export default function ContentForm() {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<'BLOG_POST' | 'INSTAGRAM_POST' | 'YOUTUBE_VIDEO' | 'RECEIPT_REVIEW' | 'OTHER'>('BLOG_POST')
  const [url, setUrl] = useState('')


  const handleSubmit = async () => {
    const res = await fetch('/api/contents', {
      method: 'POST',
      body: JSON.stringify({ title, type, url }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) alert('✅ 등록 완료')
  }

  return (
    <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSubmit() }}>
      <Input placeholder="제목" value={title} onChange={e => setTitle(e.target.value)} />
      <Input placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} />
      
      <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
        <SelectTrigger>
          <SelectValue placeholder="타입 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="BLOG_POST">블로그 포스트</SelectItem>
          <SelectItem value="INSTAGRAM_POST">인스타그램 포스트</SelectItem>
          <SelectItem value="YOUTUBE_VIDEO">유튜브 영상</SelectItem>
          <SelectItem value="RECEIPT_REVIEW">영수증 리뷰</SelectItem>
          <SelectItem value="OTHER">기타</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">+ 콘텐츠 등록</Button>
    </form>
  )
}
