import instance from './instance';

/**
 * 신입부원 모집 신청 제출
 * @param {Object} data - 지원자 정보
 * @returns {Promise}
 */
export const submitRecruit = (data) => instance.post('/recruit', data);

/**
 * (관리자) 지원자 목록 조회
 * @returns {Promise}
 */
export const getRecruitList = () => instance.get('/admin/recruit');

/**
 * (관리자) 지원자 상태 변경
 * @param {number} id - 지원자 ID
 * @param {string} status - 변경할 상태
 * @returns {Promise}
 */
export const updateRecruitStatus = (id, status) =>
  instance.patch(`/admin/recruit/${id}`, { status });
