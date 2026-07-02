import { create } from 'zustand';

/**
 * 인증 관련 전역 상태.
 * 관리자 페이지 접근 권한을 관리한다.
 * 토큰은 새로고침 후에도 유지되도록 localStorage에 함께 저장하고,
 * axios 인스턴스가 localStorage의 accessToken을 요청 헤더에 첨부한다.
 */
const useAuthStore = create((set) => ({
  isAuthenticated: Boolean(localStorage.getItem('accessToken')),

  login: ({ accessToken, refreshToken }) => {
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    set({ isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;
