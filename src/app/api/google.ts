import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { auth, db } from '@/lib/firebase'; // Firebase 설정 파일 경로
import { doc, setDoc } from 'firebase/firestore';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(request: NextRequest) {
  try {
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json({ error: 'No credential provided' }, { status: 400 });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return NextResponse.json({ error: 'Invalid credential' }, { status: 401 });
    }

    const { sub, email, name, picture } = payload;

    const firebaseCredential = GoogleAuthProvider.credential(credential);
    const firebaseUser = await signInWithCredential(auth, firebaseCredential);

    if (!firebaseUser.user) {
      return NextResponse.json({ error: 'Firebase authentication failed' }, { status: 500 });
    }

    // Firestore에 사용자 정보 저장 (선택 사항)
    const userRef = doc(db, 'users', firebaseUser.user.uid);
    await setDoc(userRef, {
      uid: firebaseUser.user.uid,
      email: email,
      displayName: name,
      photoURL: picture,
      role: 'user', // 기본 역할
    }, { merge: true }); // 이미 존재하는 경우 병합

    // 성공적인 인증 및 Firestore 저장을 응답으로 반환
    return NextResponse.json({ user: firebaseUser.user }, { status: 200 });

  } catch (error: any) {
    console.error('Google 로그인 에러 (API):', error);
    return NextResponse.json({ error: error.message || 'Google 로그인 처리 중 오류 발생' }, { status: 500 });
  }
}
