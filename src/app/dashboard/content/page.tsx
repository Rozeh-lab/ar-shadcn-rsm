// components/pages/content/ContentPage.tsx
import ContentForm from '../components/content/ContentForm'

export default function ContentPage() {
  return (
    <main className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">📝 콘텐츠 등록</h1>
      <ContentForm />
    </main>
  )
}