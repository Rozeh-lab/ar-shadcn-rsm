"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import useAuth from "@/hooks/useAuth";


export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, isLoading, user } = useAuth()

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-2xl font-bold">Rich Solution Manager</h1>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={signInWithGoogle}
          >
            <FcGoogle className="text-xl" />
            구글 로그인
          </Button>

          <Button
            variant="outline"
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-black"
            onClick={() => {/* 카카오 로그인 함수 */}}
          >
            <RiKakaoTalkFill className="text-xs" />
            카카오톡 로그인
          </Button>

          <Button
            variant="outline"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            onClick={() => {/* 카카오 로그인 함수 */}}
          >
            <SiNaver className="text-xl" />
            Naver 로그인
          </Button>
        </div>

        <p className="text-sm text-gray-500">
          소셜 로그인으로 간편하게 시작하세요.
        </p>
      </div>
    </div>

  )

};
