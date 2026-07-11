import instance from './instance';

/**
 * (관리자) 신청 부원 목록 조회
 * @param {{ page: number, size: number }} params - page는 0부터 시작한다.
 * @returns {Promise<Object>} 페이징 결과 ({ content, page, size, totalElements, totalPages, last })
 *   content 항목: { applicantId, name, studentId, phoneNum, createdAt, isFirstView }
 */
export const getApplicantList = async ({ page, size }) => {
  const response = await instance.get('/api/v1/admin/applicantMembers', {
    params: { page, size },
  });

  return response.data?.data;
};

/**
 * (관리자) 신청 부원 등록 폼 정보 조회
 * 명부 등록/수정 폼의 '신청 정보 가져오기'에서 자동 채우기용으로 사용한다.
 * @param {number} applicantMemberId - 신청 부원 ID
 * @returns {Promise<Object>} { applicantId, name, age, studentId, grade, phoneNumber }
 */
export const getApplicantRegistrationForm = async (applicantMemberId) => {
  const response = await instance.get(
    `/api/v1/admin/applicantMembers/${applicantMemberId}/registration-form`
  );

  return response.data?.data;
};

/**
 * (관리자) 신청 부원 상세 정보 조회
 * 신청 부원 조회 페이지의 '정보조회'에서 사용한다.
 * @param {number} applicantMemberId - 신청 부원 ID
 * @returns {Promise<Object>} { applicantId, name, studentId, department, grade, gender,
 *   phoneNumber, birthday, techStack, desiredActivity, motivation, finalWords }
 */
export const getApplicantDetail = async (applicantMemberId) => {
  const response = await instance.get(`/api/v1/admin/applicantMembers/${applicantMemberId}`);

  return response.data?.data;
};
