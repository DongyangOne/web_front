/**
 * 라우트 경로 상수.
 * 새 페이지 추가 시 여기에 먼저 등록하고 사용한다. 문자열 하드코딩 금지.
 */
export const ROUTES = {
  HOME: '/',
  RECRUIT: '/recruit',
  SCHEDULE: '/schedule',
  ABOUT: '/about',
  ADMIN: '/admin',
  ADMIN_RECRUIT: '/admin/Memberpage',
  // 명부 관리: 외부에 노출하지 않는 admin 히든 경로 하위에 둔다. 방문자 내비에 링크하지 않는다.
  ADMIN_MEMBER: '/admin/members',
  // 부원 등록: 명부 관리에서 '부원 등록' 클릭 시 이동하는 폼 화면.
  ADMIN_MEMBER_REGISTER: '/admin/members/register',
  // 부원 정보 수정: 명부 관리에서 부원 1명 선택 후 '부원 정보 수정' 클릭 시 이동.
  ADMIN_MEMBER_EDIT: '/admin/members/edit',
};
