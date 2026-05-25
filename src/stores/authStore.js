import { create } from 'zustand';

/**
 * 인증 관련 전역 상태.
 * 관리자 페이지 접근 권한 등을 관리한다.
 */
const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user, token) => {
    localStorage.setItem('accessToken', token);
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
