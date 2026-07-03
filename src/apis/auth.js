import instance from './instance';

/**
 * 관리자 로그인
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<Object>} { accessToken, refreshToken, tokenType }
 */
export const adminLogin = async (credentials) => {
  const response = await instance.post('/api/v1/auth/login', credentials);

  return response.data?.data;
};

/**
 * 관리자 로그아웃 (서버의 Refresh Token 폐기)
 * @param {string} refreshToken
 * @returns {Promise}
 */
export const adminLogout = (refreshToken) =>
  instance.post('/api/v1/auth/logout', { refreshToken });
