import { useNavigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import MemberForm from '@/components/admin/MemberForm';

/**
 * 부원 정보 수정 페이지.
 * 명부 관리(/admin/members)에서 부원 1명 선택 후 '부원 정보 수정'을 누르면 이동한다.
 * 레이아웃은 등록 페이지와 동일(MemberForm 공유)하며, 선택한 부원 정보를 폼에 미리 채운다.
 * 차이점: 버튼 '저장하기', 완료 모달 '변경된 정보가 저장되었습니다'.
 */
function MemberEditPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 명부 관리에서 navigate state로 넘어온 선택 부원. 직접 진입(새로고침) 시에는 빈 폼으로 둔다.
  const member = location.state?.member;
  const initialForm = member
    ? {
        name: member.name ?? '',
        grade: String(member.grade ?? ''),
        studentId: member.studentId ?? '',
        age: String(member.age ?? ''),
        phone: member.phone ?? '',
      }
    : undefined;

  return (
    <MemberForm
      title="부원 정보 수정"
      subtitle="부원 정보를 수정해주세요"
      submitLabel="저장하기"
      successMessage="변경된 정보가 저장되었습니다"
      initialForm={initialForm}
      onComplete={() => navigate(ROUTES.ADMIN_MEMBER)}
    />
  );
}

export default MemberEditPage;
