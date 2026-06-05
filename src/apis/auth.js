import instance from './instance';

/**
 * 관리자 로그인
 * @param {{ loginId: string, password: string }} credentials
 * @returns {Promise}
 */
export const adminLogin = (credentials) => instance.post('/admin/login', credentials);
