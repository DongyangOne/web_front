# Three.js 작성 가이드

이 폴더는 Three.js / `@react-three/fiber` 관련 코드만 포함합니다.

## 폴더 구조

- `scenes/` - 완성된 3D 씬 (Canvas 포함)
- `models/` - 개별 3D 오브젝트 컴포넌트 (mesh 단위)
- `utils/` - 좌표 변환, 행렬 계산 등 순수 함수

## 핵심 규칙 (꼭 지켜주세요)

### 1. 메모리 누수 방지
`geometry`, `material`, `texture`는 직접 만들었다면 **반드시** 언마운트 시 `dispose()` 합니다.
`RotatingLogo.jsx`의 `useEffect` cleanup 패턴을 참고하세요.

### 2. useMemo로 재사용
geometry와 material을 컴포넌트 함수 본문에 그냥 두면 매 렌더마다 새로 만들어집니다.
반드시 `useMemo`로 감쌉니다.

### 3. 매직 넘버 금지
좌표, 회전 속도, FOV 같은 값은 컴포넌트 상단에 상수로 분리합니다.

### 4. 모델 사전 로드
.glb/.gltf 파일은 `useGLTF.preload('/models/xxx.glb')`로 사전 로드해서 초기 진입 지연을 줄입니다.

### 5. 모바일 성능
- 그림자(`shadow`), 안티앨리어싱은 기본 false
- 모델 파일은 5MB 이하 (Draco 압축 사용)
- 디바이스 성능 감지 후 효과 단계적 적용

### 6. Suspense로 감싸기
비동기 로딩이 있는 컴포넌트(`useGLTF` 등)는 반드시 `<Suspense>`로 감쌉니다.
