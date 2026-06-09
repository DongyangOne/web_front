/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', 'sans-serif'],
      },
      // ONE 동아리 공식 브랜드 팔레트.
      colors: {
        brand: '#FF6B00', // 메인
        'brand-soft': '#FFF1E7', // 서브
        tag: '#FFE0CC', // 태그
        section: '#F5F5F7', // 섹션
        ink: '#1A1A1A', // 메인 텍스트
        'ink-sub': '#666666', // 서브 텍스트
        // 공식 팔레트 외 기능용 보조색.
        line: '#EEEEEE', // 구분선
        'field-border': '#CCCCCC', // 입력칸 테두리
        error: '#F94700', // 필수 표시(*)·오류 메시지(brand보다 붉은 톤)
      },
      // 명부 관리/부원 등록 화면 모서리 토큰(시안 실측).
      borderRadius: {
        card: '50px',
        // 부원 등록 '등록하기' 버튼.
        button: '25px',
        // 신청 부원 목록 모달.
        modal: '30px',
      },
      // 부원 상태 배지 너비(시안 실측 150px).
      boxShadow: {
        header: '0 4px 24px rgba(0,0,0,0.35)',
      },
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
        // 신청 부원 목록 모달: 이름/학번/선택(선택 열 폭 157px, 시안 실측).
        applicants: '1fr 1fr 157px',
      },
    },
  },
  plugins: [],
};
