/**
 * 디자인 시스템 색상/폰트 상수.
 * 컴포넌트에서 색상 하드코딩 금지. 반드시 여기서 import 해서 사용한다.
 * Tailwind를 사용하는 경우 tailwind.config.js와 값이 동일해야 한다.
 */
export const COLORS = {
  primary: '#3B82F6',
  primaryDark: '#1E40AF',
  secondary: '#F59E0B',
  background: '#FFFFFF',
  surface: '#F3F4F6',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  error: '#EF4444',
  success: '#10B981',
};

/**
 * ONE 동아리 공식 브랜드 색상.
 * tailwind.config.js의 colors와 값이 동일해야 한다.
 */
export const BRAND_COLORS = {
  brand: '#FF6B00', // 메인
  brandSoft: '#FFF1E7', // 서브
  tag: '#FFE0CC', // 태그
  section: '#F5F5F7', // 섹션
  ink: '#1A1A1A', // 메인 텍스트
  inkSub: '#666666', // 서브 텍스트
  // 공식 팔레트 외 기능용 보조색.
  line: '#EEEEEE',
  fieldBorder: '#CCCCCC',
  error: '#F94700',
};

export const FONT_FAMILY = {
  base: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  heading: "'Pretendard', sans-serif",
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};
