import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 인증 토큰 자동 첨부
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    const isVisitorApi = config.url?.startsWith('/api/v1/visitor/');

    if (token && !isVisitorApi) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 공통 에러 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 처리: 토큰 만료 시 로그아웃 등 추가 로직은 여기서 처리
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      // window.location.href = '/login'; // 필요 시 활성화
    }
    return Promise.reject(error);
  }
);

export default instance;
