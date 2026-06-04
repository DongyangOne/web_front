/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', 'sans-serif'],
      },
      // 명부 관리(admin) 화면 브랜드 토큰.
      // 시안 색상을 PNG에서 근사 추출한 값. Figma 접근 복구 시 실측 토큰으로 재조정 필요.
      colors: {
        brand: '#FF6B00',
        'brand-dark': '#E66000',
        'brand-soft': '#FFF1E7',
        'admin-bg': '#FBE7D6',
        'table-head': '#FFF1E7',
        line: '#EEEEEE',
        ink: '#1A1A1A',
        'ink-sub': '#666666',
      },
      // 명부 관리 카드 모서리(시안 실측 50px).
      borderRadius: {
        card: '50px',
      },
      // 부원 상태 배지 너비(시안 실측 150px).
      minWidth: {
        badge: '150px',
      },
      width: {
        badge: '150px',
      },
      // 명부 테이블 열 너비 비율(시안 화면 기준 측정:
      // 체크박스/NO/이름/학번/학년/나이/전화번호/부원상태).
      gridTemplateColumns: {
        members: '50fr 70fr 90fr 110fr 70fr 70fr 140fr 160fr',
      },
    },
  },
  plugins: [],
};
