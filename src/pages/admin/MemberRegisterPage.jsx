import { useNavigate } from 'react-router-dom';

import { registerMember } from '@/apis/member';
import { ROUTES } from '@/constants/routes';
import MemberForm from '@/components/admin/MemberForm';

/**
 * 부원 등록 페이지.
 * 명부 관리(/admin/members)에서 '부원 등록'을 누르면 이동하는 신규 부원 입력 폼이다.
 * 레이아웃은 MemberForm을 공유하고, 등록용 문구/제출 동작만 지정한다.
 */
function MemberRegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (memberData) => registerMember(memberData);

  return (
    <MemberForm
      texts={{
        title: '부원 등록',
        subtitle: '신규 부원 정보를 입력해주세요',
        submitLabel: '등록하기',
        successMessage: '등록이 완료되었습니다',
      }}
      onSubmit={handleRegister}
      onComplete={() => navigate(ROUTES.ADMIN_MEMBER)}
    />
  );
}

export default MemberRegisterPage;
