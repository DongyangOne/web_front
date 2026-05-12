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
