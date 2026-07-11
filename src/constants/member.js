/**
 * 명부 관리(부원) 관련 상수.
 */

// 명부 목록 페이지 크기. 백엔드에서 15로 고정되어 있어 그대로 맞춘다.
export const MEMBER_PAGE_SIZE = 15;

// 신청 부원 목록 페이지 크기. 백엔드에서 15로 고정(min/max 모두 15)되어 있어 그대로 맞춘다.
export const APPLICANT_PAGE_SIZE = 15;

// 정렬 기준(서버 sort 파라미터). 백엔드 허용값: createdAt | grade
export const MEMBER_SORT = {
  CREATED_AT: 'createdAt',
  GRADE: 'grade',
};

// 정렬 방향(서버 direction 파라미터).
export const SORT_DIRECTION = {
  ASC: 'ASC',
  DESC: 'DESC',
};

// 부원 상태 enum → 화면 표시용 한글 라벨.
// 상태 변경 API가 없어 목록에서는 읽기 전용으로만 노출한다.
export const MEMBER_STATUS_LABEL = {
  ACTIVE: '재학 중',
  ON_LEAVE: '휴학 중',
  MILITARY_LEAVE: '군휴학 중',
  GRADUATED: '졸업',
  WITHDRAWN: '탈퇴',
};
