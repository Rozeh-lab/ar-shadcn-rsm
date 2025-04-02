// src/types/user.ts

export interface FirebaseUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    // 필요한 경우 다른 속성 추가
  }