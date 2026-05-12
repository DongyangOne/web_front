# ONE 동아리 웹사이트 - Frontend 코드 컨벤션

> 본 문서는 ONE 동아리 웹사이트(React + Three.js)의 프론트엔드 코드 컨벤션을 정의합니다.
> 다음 기수에게 인수인계되는 프로젝트이므로, **"내가 처음 보는 사람이라고 생각하고 짠다"**를 원칙으로 합니다.
> 컨벤션 수정이 필요한 경우 FE PM과 논의 후 PR로 반영합니다.

---

## 🚀 시작하기

### 필수 환경

- **Node.js 18 이상** (권장: 20.x LTS)
- **npm 9 이상** (yarn, pnpm 사용 금지)
- VSCode (권장)

### 설치

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 파일 생성 (예시 파일 복사 후 값 채우기)
cp .env.example .env

# 3. 개발 서버 실행
npm run dev
```

### 주요 스크립트

| 명령               | 설명                  |
| ------------------ | --------------------- |
| `npm run dev`      | 개발 서버 실행 (Vite) |
| `npm run build`    | 프로덕션 빌드         |
| `npm run preview`  | 빌드 결과 로컬 확인   |
| `npm run lint`     | ESLint 검사           |
| `npm run lint:fix` | ESLint 자동 수정      |
| `npm run format`   | Prettier 적용         |

---

## 📑 목차

1. [기술 스택](#1-기술-스택)
2. [프로젝트 폴더 구조](#2-프로젝트-폴더-구조)
3. [네이밍 규칙](#3-네이밍-규칙)
4. [컴포넌트 작성 규칙](#4-컴포넌트-작성-규칙)
5. [스타일링 규칙](#5-스타일링-규칙)
6. [Three.js 작성 규칙](#6-threejs-작성-규칙)
7. [상태 관리 및 API 통신](#7-상태-관리-및-api-통신)
8. [Import 순서](#8-import-순서)
9. [주석 작성 규칙](#9-주석-작성-규칙)
10. [Git 컨벤션](#10-git-컨벤션)
11. [환경 변수 관리](#11-환경-변수-관리)
12. [코드 품질 도구](#12-코드-품질-도구)
13. [인수인계 체크리스트](#13-인수인계-체크리스트)

---

## 1. 기술 스택

| 분류                 | 사용 기술                                       |
| -------------------- | ----------------------------------------------- |
| Framework            | React 18+ (Vite 기반)                           |
| Language             | JavaScript (ES2022+)                            |
| 3D                   | Three.js, @react-three/fiber, @react-three/drei |
| Routing              | react-router-dom v6                             |
| State                | Zustand (전역), useState/useReducer (지역)      |
| HTTP                 | Axios                                           |
| Styling              | CSS Modules (필요 시 Tailwind 추가)             |
| Lint/Format          | ESLint 9 (Flat Config) + Prettier 3             |
| Node Version 18 이상 |

> **버전 변경 시 PM 승인 필수.** `package.json` 의존성을 임의로 업그레이드하지 않습니다.

---

## 2. 프로젝트 폴더 구조

```
src/
├── apis/              # API 호출 함수 (axios)
│   ├── instance.js    # axios 인스턴스 설정
│   ├── auth.js
│   └── recruit.js
├── assets/            # 이미지, 폰트, 3D 모델 파일
│   ├── images/
│   ├── fonts/
│   └── models/        # .glb, .gltf 등
├── components/        # 재사용 컴포넌트
│   ├── common/        # 공통 UI (Button, Input, Modal 등)
│   └── layout/        # Header, Footer, Sidebar 등
├── pages/             # 라우트 단위 페이지
│   ├── visitor/       # 방문자 페이지
│   └── admin/         # 관리자 페이지
├── three/             # Three.js 관련 코드
│   ├── scenes/
│   ├── models/
│   └── utils/
├── hooks/             # 커스텀 훅 (useXxx)
├── stores/            # Zustand 스토어
├── styles/            # 전역 스타일
├── utils/             # 순수 유틸 함수
├── constants/         # 상수 (라우트 경로, 색상 등)
├── App.jsx
└── main.jsx
```

**규칙**

- 한 폴더에 파일이 10개 이상 쌓이면 하위 폴더로 분리합니다.
- `pages/` 안에는 라우트와 1:1로 매칭되는 파일만 둡니다. 그 외 로직은 `components/`, `hooks/`로 분리합니다.

---

## 3. 네이밍 규칙

| 대상                     | 규칙                                | 예시                          |
| ------------------------ | ----------------------------------- | ----------------------------- |
| 컴포넌트 파일            | PascalCase + `.jsx`                 | `RecruitForm.jsx`             |
| 일반 JS 파일             | camelCase + `.js`                   | `formatDate.js`               |
| 커스텀 훅                | `use`로 시작, camelCase             | `useRecruitForm.js`           |
| 상수                     | UPPER_SNAKE_CASE                    | `MAX_FILE_SIZE`               |
| 변수/함수                | camelCase                           | `getUserInfo`                 |
| Boolean 변수             | `is`, `has`, `can`, `should` 접두사 | `isLoading`, `hasError`       |
| 이벤트 핸들러            | `handle` + 동작                     | `handleSubmit`, `handleClick` |
| props로 받는 핸들러      | `on` + 동작                         | `onSubmit`, `onClose`         |
| CSS 클래스 (CSS Modules) | camelCase                           | `submitButton`                |

**금지 사항**

- 의미 없는 약어 사용 금지 (`btn`, `usr`, `tmp` 등). `button`, `user`, `temporary`로 풀어쓰기.
- 한글 변수명 금지.
- `data`, `info`, `value`처럼 모호한 이름 단독 사용 금지. `userData`, `recruitInfo`처럼 맥락 포함.

---

## 4. 컴포넌트 작성 규칙

### 4.1 기본 원칙

- **함수형 컴포넌트만 사용합니다.** Class 컴포넌트 금지.
- **한 파일에 한 컴포넌트.** `export default`는 파일당 하나.
- **150줄을 넘으면 분리를 고민합니다.** 250줄을 넘으면 무조건 분리합니다.
- **props는 5개를 넘기지 않습니다.** 넘으면 객체로 묶거나 컴포넌트 설계를 다시 봅니다.

### 4.2 컴포넌트 작성 순서 (위에서 아래로)

1. import
2. 컴포넌트 함수 선언
3. 상태(useState, useReducer)
4. 외부 데이터 호출 훅 또는 useEffect
5. 핸들러 함수
6. 파생 변수 (계산된 값)
7. 조건부 early return (로딩, 에러 등)
8. JSX 반환
9. export default

`src/pages/visitor/RecruitPage.jsx`에 표준 구조 예시가 있습니다.

### 4.3 조건부 렌더링

- 삼항 연산자는 1단까지만. 중첩 금지.
- 복잡한 분기는 변수로 빼거나 early return 사용.

```jsx
// ❌ 나쁜 예
{
  isLoading ? <Loading /> : error ? <Error /> : data ? <List /> : <Empty />;
}

// ✅ 좋은 예
if (isLoading) return <Loading />;
if (error) return <Error />;
if (!data) return <Empty />;
return <List />;
```

---

## 5. 스타일링 규칙

### 5.1 도구 선택

- **기본은 CSS Modules.** 컴포넌트별로 `*.module.css` 파일 생성.
- 복잡한 애니메이션, 글로벌 스타일은 `src/styles/` 아래 CSS 파일로 분리.
- 인라인 style은 동적 값(예: `transform: translateX(${x}px)`)에만 사용.

### 5.2 색상과 폰트

- **하드코딩 금지.** 모든 색상은 `src/constants/theme.js`에 정의 후 사용.

### 5.3 반응형

- 모바일 우선(Mobile First). 기본 스타일은 모바일, `min-width` 미디어쿼리로 확장.
- 브레이크포인트: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`

---

## 6. Three.js 작성 규칙

### 6.1 기본 원칙

- **`@react-three/fiber`를 통해 선언적으로 작성합니다.** 명령형(`new THREE.Scene()`)은 정말 필요한 경우에만.
- Three.js 관련 모든 코드는 `src/three/` 아래에 둡니다.
- 3D 모델 파일은 `assets/models/`에 두고, 파일명은 kebab-case (`hero-scene.glb`).

> 표준 예제: `src/three/scenes/HeroScene.jsx`, `src/three/models/RotatingLogo.jsx`

### 6.2 성능 규칙 (인수인계용 필수 사항)

- **메모리 누수 방지**: `useEffect` cleanup에서 `geometry.dispose()`, `material.dispose()`, `texture.dispose()` 호출.
- **재사용 가능한 geometry/material은 `useMemo`로 감쌉니다.** 매 렌더마다 새로 만들지 않습니다.
- **3D 모델은 `useGLTF.preload()`로 사전 로드**하여 초기 진입 지연을 줄입니다.
- **모바일 대응**: 그림자, 안티앨리어싱은 기본 false. 필요 시 디바이스 성능 감지 후 활성화.
- **모델 파일 크기는 5MB 이하** 권장. Draco 압축 사용.

### 6.3 Three.js 매직 넘버 금지

좌표, FOV, 회전 속도 같은 값은 컴포넌트 상단에 상수로 분리합니다.

---

## 7. 상태 관리 및 API 통신

### 7.1 상태 분류

| 종류                             | 도구                        |
| -------------------------------- | --------------------------- |
| 컴포넌트 내부 상태               | `useState`, `useReducer`    |
| 전역 상태 (로그인 정보, 테마 등) | Zustand                     |
| 서버 상태 (API 응답 캐싱)        | 필요 시 TanStack Query 추가 |

### 7.2 Axios 인스턴스

모든 API는 `src/apis/instance.js`의 공통 인스턴스를 통해 호출합니다.
컴포넌트에서 직접 `axios.get(...)`을 호출하지 않습니다.

### 7.3 에러 처리

- 모든 비동기 호출은 `try-catch`로 감쌉니다.
- 콘솔 로그는 `[컴포넌트명] 에러내용` 형식으로 출력합니다.

---

## 8. Import 순서

```jsx
// 1. React 및 외부 라이브러리
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. 절대 경로 내부 모듈 (별칭 사용)
import { submitRecruit } from '@/apis/recruit';
import Button from '@/components/common/Button';

// 3. 상대 경로 내부 모듈
import RecruitFormField from './RecruitFormField';

// 4. 스타일, 에셋
import styles from './RecruitForm.module.css';
```

**경로 별칭**: `vite.config.js`에 `@`를 `src/`로 설정. 상대 경로(`../../../`)는 같은 폴더 내에서만.

---

## 9. 주석 작성 규칙

### 9.1 작성 원칙

- **"무엇을" 하는지가 아니라 "왜" 하는지를 적습니다.**
- **인수인계받는 사람을 생각하고 적습니다.**
- 한국어로 작성.

### 9.2 좋은 예 / 나쁜 예

```jsx
// ❌ 나쁜 예: 코드만 봐도 아는 내용
// name 상태를 빈 문자열로 초기화
const [name, setName] = useState('');

// ✅ 좋은 예: 의도와 이유 설명
// 백엔드에서 한글 이름만 받기 때문에 영문 입력 시 사전 차단함
const isValidKoreanName = (name) => /^[가-힣]{2,5}$/.test(name);

// ✅ 좋은 예: 임시 코드 명시
// TODO: 디자인 확정 후 실제 색상으로 교체 (탁진우, 2026.05.01)
const TEMP_BG_COLOR = '#CCCCCC';
```

---

## 10. Git 컨벤션

### 10.1 브랜치 전략

```
main      → 배포용 (PM만 머지)
develop   → 개발 통합 브랜치
feature/* → 기능 개발 (예: feature/recruit-form)
fix/*     → 버그 수정
refactor/*→ 리팩토링
```

### 10.2 커밋 메시지

```
<type>: <제목 (한국어, 명령형, 50자 이내)>
```

| type       | 용도                        |
| ---------- | --------------------------- |
| `feat`     | 새 기능 추가                |
| `fix`      | 버그 수정                   |
| `style`    | 코드 포맷팅 (기능 변화 X)   |
| `refactor` | 리팩토링 (기능 변화 X)      |
| `design`   | UI/CSS 변경                 |
| `docs`     | 문서 수정                   |
| `chore`    | 빌드 설정, 패키지 매니저 등 |

### 10.3 PR 규칙

- **base 브랜치는 항상 `develop`.** `main`에 직접 PR 금지.
- `.github/pull_request_template.md` 양식에 맞춰 작성
- **리뷰어 1명 이상의 approve 후 머지.**
- 머지 방식: **Squash and merge**

---

## 11. 환경 변수 관리

- 환경 변수는 `.env` 파일에 두고, **절대 커밋하지 않습니다.**
- Vite 환경 변수는 반드시 `VITE_` 접두사로 시작.
- `.env.example` 파일에 모든 필요한 변수를 명시합니다.

**금지**: API 키, 비밀번호, 토큰을 코드에 하드코딩하지 않습니다.

---

## 12. 코드 품질 도구

### 12.1 ESLint + Prettier

프로젝트 루트의 `eslint.config.js`, `.prettierrc`를 따릅니다. 개인 설정으로 덮어쓰지 마세요.

### 12.2 커밋 전 체크리스트

- [ ] `npm run lint` 통과
- [ ] `npm run format` 적용
- [ ] `console.log` 제거 (디버깅 후)
- [ ] 사용하지 않는 import 제거
- [ ] 주석 처리된 옛날 코드 제거

### 12.3 VSCode 설정

`.vscode/settings.json`에 저장 시 자동 포맷이 설정되어 있습니다.
`.vscode/extensions.json`의 추천 확장을 모두 설치하세요.

---

## 13. 인수인계 체크리스트

> **다음 기수에게 넘기기 전에 반드시 확인할 항목입니다.**

### 13.1 문서

- [ ] 본 README가 최신 상태인지 확인
- [ ] `.env.example`에 모든 환경 변수가 명시되어 있는지 확인
- [ ] `src/three/README.md` 등 폴더별 README가 최신 상태인지 확인
- [ ] API 명세서 링크가 README에 포함되어 있는지
- [ ] 디자인 시안 링크 (Figma 등) 포함

### 13.2 코드

- [ ] `TODO`, `FIXME` 주석 정리 (작성자/날짜 명시)
- [ ] 사용하지 않는 파일/패키지 제거
- [ ] 매직 넘버 상수화
- [ ] 모든 페이지가 정상 동작하는지 수동 테스트

### 13.3 배포

- [ ] 빌드 명령어 (`npm run build`) 정상 동작
- [ ] 배포 URL, 도메인 정보 문서화
- [ ] 호스팅 계정 인수인계 (Vercel, Netlify 등)
- [ ] Firebase / 백엔드 서버 접근 권한 이양

### 13.4 회고

- [ ] 알려진 버그/이슈 목록 작성
- [ ] 다음 기수에게 전하고 싶은 개선 포인트 정리

---

## 마무리

이 문서는 **살아있는 문서**입니다. 프로젝트가 진행되며 더 좋은 규칙이 발견되면 PR로 수정해 주세요.
규칙을 외우는 게 목적이 아니라, **다음에 이 코드를 볼 사람이 고통받지 않게 하는 것**이 목적입니다.

**문의**: FE PM 탁진우 / BE PM 최예은

_Last Updated: 2026.05.13_
