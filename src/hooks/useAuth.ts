// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase'; // Firebase 설정 파일 경로
import { FirebaseUser } from '@/types/user';
import { useRouter } from 'next/navigation';
import { CompanyData, CreateCompanyInput } from '@/types/company'

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  // signInWithKakao: () => Promise<void>; // Kakao 로그인 함수 추가 (구현 필요)
  // signInWithNaver: () => Promise<void>; // Naver 로그인 함수 추가 (구현 필요)
  // companies 관련 CRUD
  createCompany: (data: CreateCompanyInput) => Promise<void>
  getCompanyById: (companyId: string) => Promise<CompanyData | null>
  updateCompany: (companyId: string, data: Partial<CompanyData>) => Promise<void>
  deleteCompany: (companyId: string) => Promise<void>
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


  // placeUrl로부터 companyId와 category 추출
  const parsePlaceUrl = (url: string) => {
    const match = url.match(/\/(\w+)\/(\d+)\//)
    if (!match) return null
    return {
      category: match[1],
      companyId: match[2],
    }
  }

  // 🔹 회사 생성 (Create)
  const createCompany = async (data: {
    placeUrl: string
    name: string
    address: string
    keywords: string[]
  }) => {
    const parsed = parsePlaceUrl(data.placeUrl)
    if (!parsed) throw new Error('유효하지 않은 네이버 플레이스 URL')

    const companyRef = doc(db, 'companies', parsed.companyId)

    await setDoc(companyRef, {
      companyId: parsed.companyId,
      category: parsed.category,
      ...data,
    })
  }

  // 🔹 회사 조회 (Read)
  async function getCompanyById(companyId: string): Promise<CompanyData | null> {
    const docRef = doc(db, "companies", companyId)
    const snapshot = await getDoc(docRef)
    return snapshot.exists() ? snapshot.data() as CompanyData : null
  }

  // 🔹 회사 수정 (Update)
  const updateCompany = async (companyId: string, updateData: Partial<any>) => {
    const docRef = doc(db, 'companies', companyId)
    await updateDoc(docRef, updateData)
  }

  // 🔹 회사 삭제 (Delete)
  const deleteCompany = async (companyId: string) => {
    const docRef = doc(db, 'companies', companyId)
    await deleteDoc(docRef)
  }

  return {
    user,
    isLoading,
    signInWithGoogle,
    // signInWithKakao,
    // signInWithNaver,
    createCompany,
    getCompanyById,
    updateCompany,
    deleteCompany,
  };
};


export default useAuth;
