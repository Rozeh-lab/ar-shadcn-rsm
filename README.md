# Rich Solution Manager (RSM)

## 📌 프로젝트 개요
**RSM (Rich Solution Manager)**는 온라인 마케팅을 효율적으로 관리하는 **마케팅 운영 시스템**입니다.  
**광고주, 에이전시, 블로그 기자단, 배포대행업체**가 협업하여 **마케팅 캠페인을 체계적으로 운영할 수 있도록 지원**합니다.  

🔥 **목표:**  
✅ 네이버 플레이스 순위 모니터링  
✅ 블로그 기자단 / 체험단 배포 관리  
✅ 광고주 & 에이전시 마케팅 성과 분석  
✅ Firebase 기반 **유저별 역할 시스템** 적용  

---

## 🎯 **기능 개요**
### 🔹 **유저별 역할 & 대시보드**
- **슈퍼유저 (SuperUser)**: 전체 시스템 관리
- **에이전시 (Agency)**: 광고주 마케팅 대행
- **광고주 (Advertiser)**: 자신의 브랜드 마케팅 모니터링
- **배포대행업체 (Distributor)**: 블로그 기자단 배포 진행
- **블로거 (Blogger)**: 체험단 리뷰 작성

### 🔹 **주요 기능**
✔ 광고주별 **마케팅 캠페인 모니터링**  
✔ 블로그 기자단 배포 **실시간 체크**  
✔ 네이버 검색 API 기반 **순위 추적**  
✔ Firebase 기반 **유저별 역할 관리**  
✔ 마케팅 성과 분석 **엑셀 다운로드 지원**  

---

## 🛠 **기술 스택**
### **📡 Backend**
- **Firebase Firestore** → 실시간 데이터베이스
- **Google Cloud Functions** → 네이버 검색 API 활용
- **Next.js API Routes** → 서버리스 백엔드
- **Firebase Authentication** → 사용자 로그인 관리
- **Firestore Rules** → RBAC (역할 기반 접근 제어)

### **🎨 Frontend**
- **Next.js 15.2.2** → 최신 React 기반 프레임워크
- **Tailwind CSS v4** → 빠르고 효율적인 UI 스타일링
- **React Query** → Firebase 데이터 관리 최적화
- **Lucide Icons** → 최신 UI 아이콘 적용
- **TanStack Table** → 데이터 테이블 관리 (엑셀 내보내기 지원)

---

## 📂 **폴더 구조**
```
rsm/
│── public/                 # 정적 파일 (로고, 아이콘)
│── src/
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   ├── pages/
│   │   ├── index.tsx       # 메인 대시보드
│   │   ├── dashboard/      # 역할별 대시보드
│   │   ├── login.tsx       # 로그인 페이지
│   ├── utils/              # 공통 유틸 함수 (Firebase API 등)
│── firebase.json           # Firebase 설정 파일
│── tailwind.config.js      # Tailwind 설정 파일
│── next.config.js          # Next.js 설정 파일
│── README.md               # 프로젝트 설명
```

---

## 🏗 **설치 및 실행**
### 1️⃣ **📥 프로젝트 클론**
```sh
git clone https://github.com/YOUR_REPO/rsm.git
cd rsm
```

### 2️⃣ **📦 패키지 설치**
```sh
npm install
# 또는
yarn install
```

### 3️⃣ **🚀 개발 서버 실행**
```sh
npm run dev
```
📌 실행 후 `http://localhost:3000`에서 접속 가능!

---

## 🔥 **역할 기반 접근 제어 (RBAC)**
Firebase Firestore에서는 **유저별 접근 권한을 제어**하여 보안을 강화합니다.

| 역할 | 데이터 접근 |
|------|------------------------------|
| **SuperUser** | 모든 데이터 읽기/쓰기 가능 |
| **Agency** | 본인이 관리하는 광고주 데이터만 접근 가능 |
| **Advertiser** | 본인 업체 마케팅 데이터만 접근 가능 |
| **Distributor** | 블로그 기자단 배포 데이터만 수정 가능 |
| **Blogger** | 본인 리뷰 데이터만 수정 가능 |

💡 **개발 중에는 Firebase Rules를 모두 허용한 상태**이며, 대시보드 개발 완료 후 권한을 강화할 예정입니다.

---

## 🌎 **배포 (GCP & Firebase)**
RSM 프로젝트는 **Firebase Hosting & GCP Functions**을 사용하여 배포됩니다.

```sh
# Firebase 로그인
firebase login

# 프로젝트 배포
firebase deploy
```

---

## 🚀 **앞으로의 개발 계획**
- ✅ 기본 UI 레이아웃 구현
- ✅ Firebase Firestore 연동
- ✅ 네이버 검색 API 적용 (GCP 배포)
- 🔜 유저별 대시보드 완성
- 🔜 마케팅 데이터 시각화 개선
- 🔜 엑셀 다운로드 기능 추가

---

## 📝 **기여 방법**
1. 이슈를 생성하여 **기능 요청** 또는 **버그 리포트**를 작성하세요.
2. 브랜치를 생성하고 (`git checkout -b feature-branch`)
3. 기능 추가 후 **PR(Pull Request)**를 요청하세요.

---

## 📞 **문의**
문의사항이 있다면 [GitHub Issues](https://github.com/YOUR_REPO/rsm/issues)에 등록해주세요!  
🚀 **함께 최고의 온라인 마케팅 관리 시스템을 만들어봅시다!** 🎯
