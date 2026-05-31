# ONE 동아리 웹사이트 - Frontend 코드 컨벤션

> 본 문서는 ONE 동아리 웹사이트(React + Three.js)의 프론트엔드 코드 컨벤션을 정의합니다.
> 다음 기수에게 인수인계되는 프로젝트이므로, **"내가 처음 보는 사람이라고 생각하고 짠다"**를 원칙으로 합니다.
> 컨벤션 수정이 필요한 경우 FE PM과 논의 후 PR로 반영합니다.

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

| 분류        | 사용 기술                                       |
| ----------- | ----------------------------------------------- |
| Framework   | React 18+ (Vite 기반)                           |
| Language    | JavaScript (ES2022+) 또는 TypeScript            |
| 3D          | Three.js, @react-three/fiber, @react-three/drei |
| Routing     | react-router-dom v6                             |
| State       | Zustand (전역), useState/useReducer (지역)      |
| HTTP        | Axios                                           |
| Styling     | Tailwind CSS                                    |
| Lint/Format | ESLint + Prettier                               |

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
│   │   ├── HomePage.jsx
│   │   ├── RecruitPage.jsx
│   │   ├── SchedulePage.jsx
│   │   └── AboutPage.jsx
│   └── admin/         # 관리자 페이지
│       ├── ApplicantPage.jsx
│       ├── AwardPage.jsx
│       └── ...
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
- **한 파일에 한 컴포넌트.** export default는 파일당 하나.
- **150줄을 넘으면 분리를 고민합니다.** 250줄을 넘으면 무조건 분리합니다.
- **props는 5개를 넘기지 않습니다.** 넘으면 객체로 묶거나 컴포넌트 설계를 다시 봅니다.

### 4.2 표준 컴포넌트 구조

```jsx
// src/components/common/RecruitForm.jsx
import { useState } from 'react';
import { submitRecruit } from '@/apis/recruit';
import Button from '@/components/common/Button';

/**
 * 신입부원 모집 신청 폼
 * @param {Function} onSuccess - 제출 성공 시 호출되는 콜백
 */
function RecruitForm({ onSuccess }) {
  // 1. 상태 선언
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. 이벤트 핸들러
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitRecruit({ name });
      onSuccess?.();
    } catch (error) {
      console.error('[RecruitForm] 제출 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. 렌더링
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        제출
      </Button>
    </div>
  );
}

export default RecruitForm;
```

### 4.3 컴포넌트 작성 순서 (위에서 아래로)

1. import
2. 컴포넌트 함수 선언
3. 상태(useState, useReducer)
4. 외부 데이터 호출 훅(useQuery 등) 또는 useEffect
5. 핸들러 함수
6. 파생 변수 (계산된 값)
7. 조건부 early return (로딩, 에러 등)
8. JSX 반환
9. export default

### 4.4 조건부 렌더링

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

- **기본은 Tailwind CSS를 사용합니다.** (선택한 경우)
- 복잡한 애니메이션, 글로벌 스타일은 `styles/` 아래 CSS 파일로 분리.
- 인라인 style은 동적 값(예: `transform: translateX(${x}px)`)에만 사용.

### 5.2 색상과 폰트

- **하드코딩 금지.** 모든 색상은 `tailwind.config.js` 또는 `src/constants/theme.js`에 정의 후 사용.

```js
// src/constants/theme.js
export const COLORS = {
  primary: '#3B82F6',
  secondary: '#F59E0B',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
};
```

### 5.3 반응형

- 모바일 우선(Mobile First). 기본 스타일은 모바일, `md:`, `lg:` 등으로 확장.
- 브레이크포인트: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px` (Tailwind 기본값 유지)

---

## 6. Three.js 작성 규칙

### 6.1 기본 원칙

- **`@react-three/fiber`를 통해 선언적으로 작성합니다.** 명령형(`new THREE.Scene()`)은 정말 필요한 경우에만.
- Three.js 관련 모든 코드는 `src/three/` 아래에 둡니다.
- 3D 모델 파일은 `assets/models/`에 두고, 파일명은 kebab-case (`hero-scene.glb`).

### 6.2 표준 구조

```jsx
// src/three/scenes/HeroScene.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function ClubLogo() {
  const { scene } = useGLTF('/models/club-logo.glb');
  return <primitive object={scene} />;
}

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <ClubLogo />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export default HeroScene;
```

### 6.3 성능 규칙 (인수인계용 필수 사항)

- **메모리 누수 방지**: `useEffect` cleanup에서 `geometry.dispose()`, `material.dispose()`, `texture.dispose()` 호출.
- **재사용 가능한 geometry/material은 `useMemo`로 감쌉니다.** 매 렌더마다 새로 만들지 않습니다.
- **3D 모델은 `useGLTF.preload()`로 사전 로드**하여 초기 진입 지연을 줄입니다.
- **모바일 대응**: 그림자, 안티앨리어싱은 기본 false. 필요 시 디바이스 성능 감지 후 활성화.
- **모델 파일 크기는 5MB 이하** 권장. Draco 압축 사용.

### 6.4 Three.js 매직 넘버 금지

좌표, FOV, 회전 속도 같은 값은 컴포넌트 상단에 상수로 분리합니다.

```jsx
const CAMERA_POSITION = [0, 0, 5];
const ROTATION_SPEED = 0.005;
const LIGHT_INTENSITY = 0.8;
```

---

## 7. 상태 관리 및 API 통신

### 7.1 상태 분류

| 종류                             | 도구                                 |
| -------------------------------- | ------------------------------------ |
| 컴포넌트 내부 상태               | `useState`, `useReducer`             |
| 전역 상태 (로그인 정보, 테마 등) | Zustand                              |
| 서버 상태 (API 응답 캐싱)        | TanStack Query 권장 / 또는 직접 관리 |

### 7.2 Axios 인스턴스

모든 API는 `src/apis/instance.js`의 공통 인스턴스를 통해 호출합니다.

```js
// src/apis/instance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
```

### 7.3 API 함수 분리

컴포넌트에서 직접 `axios.get(...)`을 호출하지 않습니다. 반드시 `apis/` 폴더의 함수를 통해 호출합니다.

```js
// src/apis/recruit.js
import instance from './instance';

export const submitRecruit = (data) => instance.post('/recruit', data);
export const getRecruitList = () => instance.get('/admin/recruit');
```

### 7.4 에러 처리

- 모든 비동기 호출은 `try-catch`로 감쌉니다.
- 사용자에게 보일 에러 메시지는 상수로 관리하고, 콘솔에는 `[컴포넌트명] 에러내용` 형식으로 출력합니다.

---

## 8. Import 순서

다음 순서로 정렬하고, 그룹 사이에 빈 줄을 둡니다.

```jsx
// 1. React 및 외부 라이브러리
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 2. 절대 경로 내부 모듈 (별칭 사용)
import { submitRecruit } from '@/apis/recruit';
import useAuthStore from '@/stores/authStore';
import Button from '@/components/common/Button';

// 3. 상대 경로 내부 모듈
import RecruitFormField from './RecruitFormField';

// 4. 스타일, 에셋
import styles from './RecruitForm.module.css';
import logoImage from '@/assets/images/logo.png';
```

**경로 별칭**: `vite.config.js`에 `@`를 `src/`로 설정. 상대 경로(`../../../`)는 같은 폴더 내에서만.

---

## 9. 주석 작성 규칙

### 9.1 작성 원칙

- **"무엇을" 하는지가 아니라 "왜" 하는지를 적습니다.** 코드만 봐서 알 수 있는 건 주석 달지 않습니다.
- **인수인계받는 사람을 생각하고 적습니다.** "이건 ~ 때문에 이렇게 했다"가 핵심.
- 한국어로 작성. 영어 섞지 않기.

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

### 9.3 JSDoc

재사용 컴포넌트와 유틸 함수에는 JSDoc 권장.

```js
/**
 * 날짜 문자열을 "YYYY년 MM월 DD일" 형태로 변환
 * @param {string} dateString - ISO 8601 형식의 날짜 문자열
 * @returns {string} 한국어 형식의 날짜
 */
export function formatKoreanDate(dateString) { ... }
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

### 10.2 커밋 메시지 (Conventional Commits)

```
<type>: <제목 (한국어, 명령형, 50자 이내)>

<본문 - 필요 시>
```

**type 종류**
| type | 용도 |
|---|---|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `style` | 코드 포맷팅, 세미콜론 등 (기능 변화 X) |
| `refactor` | 리팩토링 (기능 변화 X) |
| `design` | UI/CSS 변경 |
| `docs` | 문서 수정 |
| `chore` | 빌드 설정, 패키지 매니저 등 |

**예시**

```
feat: 신입부원 모집 신청 폼 구현
fix: 모바일에서 Three.js 캔버스가 잘리는 문제 해결
docs: README에 환경 변수 설명 추가
```

### 10.3 PR 규칙

- **base 브랜치는 항상 `develop`.** `main`에 직접 PR 금지.
- 제목: 커밋 컨벤션과 동일한 형식
- 본문에 포함할 것:
  - 작업 내용 요약
  - 스크린샷 또는 화면 녹화 (UI 변경 시)
  - 테스트 방법
  - 관련 이슈 번호
- **리뷰어 1명 이상의 approve 후 머지.**
- 머지 방식: **Squash and merge**

---

## 11. 환경 변수 관리

- 환경 변수는 `.env` 파일에 두고, **절대 커밋하지 않습니다.** (`.gitignore`에 추가)
- Vite 환경 변수는 반드시 `VITE_` 접두사로 시작.
- `.env.example` 파일을 만들어 어떤 변수가 필요한지 다음 기수가 알 수 있게 함.

```bash
# .env.example
VITE_API_BASE_URL=http://localhost:8080
VITE_ADMIN_SECRET_KEY=your_key_here
```

**금지**: API 키, 비밀번호, 토큰을 코드에 하드코딩하지 않습니다.

---

## 12. 코드 품질 도구

### 12.1 ESLint + Prettier

프로젝트 루트의 `.eslintrc`, `.prettierrc`를 따릅니다. 개인 설정으로 덮어쓰지 마세요.

**필수 설정**

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always"
}
```

### 12.2 커밋 전 체크리스트

- [ ] `npm run lint` 통과
- [ ] `npm run format` 적용
- [ ] `console.log` 제거 (디버깅 후)
- [ ] 사용하지 않는 import 제거
- [ ] 주석 처리된 옛날 코드 제거

### 12.3 VSCode 확장 (권장)

- ESLint
- Prettier - Code formatter
- ES7+ React/Redux/React-Native snippets
- GitLens

---

## 13. 인수인계 체크리스트

> **다음 기수에게 넘기기 전에 반드시 확인할 항목입니다.**

### 13.1 문서

- [ ] 본 README가 최신 상태인지 확인
- [ ] `.env.example`에 모든 환경 변수가 명시되어 있는지 확인
- [ ] 주요 디렉토리에 `README.md`가 있는지 (예: `src/three/README.md`)
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
