// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase'; // Firebase 설정 파일 경로
import { FirebaseUser } from '@/types/user';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  // signInWithKakao: () => Promise<void>; // Kakao 로그인 함수 추가 (구현 필요)
  // signInWithNaver: () => Promise<void>; // Naver 로그인 함수 추가 (구현 필요)
}

const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  const createUserDocument = async (authUser: User) => {
    const userRef = doc(db, 'users', authUser.uid);
    await setDoc(userRef, {
      uid: authUser.uid,
      email: authUser.email,
      displayName: authUser.displayName,
      photoURL: authUser.photoURL,
      role: 'user', // 기본 역할
    }, { merge: true }); // 이미 존재하는 경우 병합
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const authUser = result.user;
      if (authUser) {
        await createUserDocument(authUser);
        router.push('/dashboard'); // 로그인 성공 후 리디렉션
      }
    } catch (error) {
      console.error('Google 로그인 에러:', error);
      // 에러 처리 로직 추가 (예: 사용자에게 알림)
    }
  };

  // const signInWithKakao = async () => { /* Kakao 로그인 로직 */ };
  // const signInWithNaver = async () => { /* Naver 로그인 로직 */ };

  return {
    user,
    isLoading,
    signInWithGoogle,
    // signInWithKakao,
    // signInWithNaver,
  };
};

export default useAuth;