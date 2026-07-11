/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
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
        placeholder: '#6F6F6F',
        'error-soft': '#FEF2F2',
        'scroll-track': '#EDEDED',
        'scroll-thumb': '#8A8A8A',
        'schedule-divider': '#FFE3D1',
        'schedule-scroll-track': '#F0F0F0',
        'schedule-scroll-thumb': '#888888',
        'schedule-mark-red': '#F04438',
        'schedule-mark-orange': '#F79009',
        'schedule-mark-green': '#12B76A',
        'schedule-mark-blue': '#2E90FA',
        'schedule-mark-violet': '#7A5AF8',
        'schedule-mark-purple': '#D444F1',
        'schedule-mark-pink': '#F63D68',
        error: '#F94700', // 필수 표시(*)·오류 메시지(brand보다 붉은 톤)
        'schedule-inactive': '#9F9F9F', // 달력 비활성 날짜
      },
      // 명부 관리/부원 등록 화면 모서리 토큰(시안 실측).
      borderRadius: {
        card: '50px',
        // 부원 등록 '등록하기' 버튼.
        button: '25px',
        // 신청 부원 목록 모달.
        modal: '30px',
      },
      boxShadow: {
        // 명부 관리/신청 부원 카드 그림자 (시안 실측).
        card: '0 4px 4px rgba(0,0,0,0.25)',
        schedule: '0 6px 7px rgba(52, 39, 31, 0.24)',
        'schedule-day': '0 4px 9px rgba(255, 107, 0, 0.34)',
        'schedule-dropdown': '0 14px 30px rgba(0, 0, 0, 0.1)',
        'app-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'app-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'recruit-complete': '0 6px 18px rgb(52 39 31 / 0.22)',
        'recruit-card': '0 3px 0 rgb(0 0 0 / 0.18)',
        'recruit-modal-overlay': 'inset 0 0 0 9999px rgb(0 0 0 / 0.35)',
        'recruit-modal': '0 16px 40px rgb(0 0 0 / 0.25)',
        header: '0 4px 24px rgba(0,0,0,0.35)',
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
        // 신청 부원 목록 모달: 이름/학번/선택(선택 열 폭 157px, 시안 실측).
        applicants: '1fr 1fr 157px',
      },
    },
  },
  plugins: [],
};
