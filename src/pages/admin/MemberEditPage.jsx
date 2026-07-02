import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { getMemberDetail, updateMember } from '@/apis/member';
import { ROUTES } from '@/constants/routes';
import MemberForm from '@/components/admin/MemberForm';

/**
 * 부원 정보 수정 페이지.
 * 명부 관리(/admin/members)에서 부원 1명 선택 후 '부원 정보 수정'을 누르면 이동한다.
 * 목록에서 넘어온 memberId로 상세를 조회해 폼을 채운다(새로고침/직접 진입에도 안전).
 * 레이아웃은 등록 페이지와 동일(MemberForm 공유)하며, 버튼/완료 문구만 다르다.
 */
function MemberEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const memberId = location.state?.memberId;

  const [initialForm, setInitialForm] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (!memberId) {
      setLoadError('수정할 부원 정보를 찾을 수 없습니다.\n명부 관리에서 다시 선택해주세요.');
      return undefined;
    }

    let ignore = false;

    const fetchDetail = async () => {
      try {
        const detail = await getMemberDetail(memberId);

        if (!ignore) {
          setInitialForm({
            name: detail.name ?? '',
            grade: String(detail.grade ?? ''),
            studentId: detail.studentId ?? '',
            age: String(detail.age ?? ''),
            phone: detail.phoneNum ?? '',
          });
        }
      } catch (error) {
        console.error('[MemberEditPage] 부원 상세 조회 실패', error);

        if (!ignore) {
          setLoadError('부원 정보를 불러오지 못했습니다.\n잠시 후 다시 시도해주세요.');
        }
      }
    };

    fetchDetail();

    return () => {
      ignore = true;
    };
  }, [memberId]);

  const handleUpdate = (memberData) => updateMember(memberId, memberData);

  if (loadError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-soft px-8 py-10">
        <p className="whitespace-pre-line text-center text-2xl text-ink-sub">{loadError}</p>
      </main>
    );
  }

  if (!initialForm) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-soft px-8 py-10">
        <p className="text-2xl text-ink-sub">부원 정보를 불러오는 중입니다...</p>
      </main>
    );
  }

  return (
    <MemberForm
      texts={{
        title: '부원 정보 수정',
        subtitle: '부원 정보를 수정해주세요',
        submitLabel: '저장하기',
        successMessage: '변경된 정보가 저장되었습니다',
      }}
      initialForm={initialForm}
      onSubmit={handleUpdate}
      onComplete={() => navigate(ROUTES.ADMIN_MEMBER)}
    />
  );
}

export default MemberEditPage;
