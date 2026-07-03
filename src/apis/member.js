import instance from './instance';

/**
 * (관리자) 명부 목록 조회
 * @param {{ page: number, size: number, sort?: string, direction?: string }} params
 *   page는 0부터 시작한다.
 * @returns {Promise<Object>} 페이징 결과 ({ content, page, size, totalElements, totalPages, last })
 */
export const getMemberList = async ({ page, size, sort, direction }) => {
  const response = await instance.get('/api/v1/admin/members', {
    params: { page, size, sort, direction },
  });

  return response.data?.data;
};

/**
 * (관리자) 부원 상세 조회
 * @param {number} memberId - 조회할 부원 ID
 * @returns {Promise<Object>} { name, grade, studentId, age, phoneNum }
 */
export const getMemberDetail = async (memberId) => {
  const response = await instance.get(`/api/v1/admin/members/${memberId}`);

  return response.data?.data;
};

/**
 * (관리자) 부원 등록
 * @param {{ name: string, grade: number, studentId: string, age: number, phoneNum: string }} memberData
 * @returns {Promise}
 */
export const registerMember = (memberData) =>
  instance.post('/api/v1/admin/members', memberData);

/**
 * (관리자) 부원 정보 수정
 * @param {number} memberId - 수정할 부원 ID
 * @param {{ name: string, grade: number, studentId: string, age: number, phoneNum: string }} memberData
 * @returns {Promise}
 */
export const updateMember = (memberId, memberData) =>
  instance.patch(`/api/v1/admin/members/${memberId}`, memberData);

/**
 * (관리자) 부원 삭제 (복수 선택)
 * @param {number[]} memberIds - 삭제할 부원 ID 목록 (최소 1개)
 * @returns {Promise}
 */
export const deleteMembers = (memberIds) =>
  instance.delete('/api/v1/admin/members', { data: { memberIds } });
