import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import StatusBadge from '@/components/admin/StatusBadge';
import SortDropdown from '@/components/admin/SortDropdown';
import RowCheckbox from '@/components/admin/RowCheckbox';
import Pagination from '@/components/admin/Pagination';
import AlertModal from '@/components/admin/AlertModal';
import ConfirmModal from '@/components/admin/ConfirmModal';
import groupIcon from '@/assets/images/member-group.svg';

// TODO: 디자인 확정/백엔드 연동 후 getMemberList API 응답으로 교체 (탁진우, 2026.06.02)
// 현재는 시안 재현용 임시 목업 데이터다.
const INITIAL_MEMBERS = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  no: index + 1,
  name: '장한나',
  studentId: '20301234',
  grade: 2,
  age: 22,
  phone: '010-1111-2222',
  status: '재학 중',
}));

const PAGE_SIZE = 6;

/**
 * 명부 관리 페이지.
 * admin 히든 경로(/admin/members) 하위에서 동작하는 부원 목록 CRUD 화면이다.
 */
function MemberPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState(null);
  const [confirmState, setConfirmState] = useState(null);

  // 파생 값: 페이지네이션과 선택 상태
  const totalPages = Math.max(1, Math.ceil(members.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedMembers = members.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const isAllSelected = members.length > 0 && selectedIds.length === members.length;

  const handleToggleAll = () => {
    setSelectedIds(isAllSelected ? [] : members.map((member) => member.id));
  };

  const handleToggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  // 부원 등록: 선택이 있으면 안내. 등록은 선택과 무관한 메뉴다.
  const handleRegister = () => {
    if (selectedIds.length > 0) {
      setAlertMessage('부원 등록은 선택이 불가한 메뉴입니다.\n선택 해제 후 실행해주세요.');
      return;
    }
    navigate(ROUTES.ADMIN_MEMBER_REGISTER);
  };

  // 정보 수정: 정확히 1명만 가능. 선택한 부원 정보를 들고 수정 페이지로 이동한다.
  const handleEdit = () => {
    if (selectedIds.length === 0) {
      setAlertMessage('메뉴를 실행할 부원을\n선택해주세요.');
      return;
    }
    if (selectedIds.length > 1) {
      setAlertMessage('정보 수정은 복수 선택이 불가능합니다.\n한명만 선택해주세요.');
      return;
    }
    const member = members.find((item) => item.id === selectedIds[0]);
    navigate(ROUTES.ADMIN_MEMBER_EDIT, { state: { member } });
  };

  // 삭제: 1명 이상 선택 시 확인 후 제거
  const handleDelete = () => {
    if (selectedIds.length === 0) {
      setAlertMessage('메뉴를 실행할 부원을\n선택해주세요.');
      return;
    }
    setConfirmState({
      message: '선택한 부원을\n삭제하시겠습니까?',
      confirmLabel: '삭제',
      onConfirm: () => {
        setMembers((prev) => prev.filter((member) => !selectedIds.includes(member.id)));
        setSelectedIds([]);
        setConfirmState(null);
      },
    });
  };

  return (
    <>
      <main className="min-h-screen bg-brand-soft px-8 py-10">
        <div className="mx-auto max-w-6xl rounded-card bg-white p-10 shadow-md">
          {/* 카드 헤더: 제목 + 액션 버튼 */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* 아이콘 + 인원 수를 세로로 배치 (인원 로고 밑에 총 인원 수).
                  로고는 원래 차지하던 공간(h-28 w-40)을 유지하고 이미지만 248x165로 키워
                  넘치게 두어, '총 N명'과 '부원관리' 위치는 그대로 유지한다. */}
              <div className="flex flex-col items-center">
                <div className="flex h-28 w-40 items-center justify-center">
                  <img
                    src={groupIcon}
                    alt=""
                    className="h-[165px] w-[248px] max-w-none object-contain"
                  />
                </div>
                {/* 선택이 있으면 'N명 선택 중', 없으면 '총 N명' (시안 기준) */}
                {selectedIds.length > 0 ? (
                  <p className="text-2xl">
                    <span className="text-brand">{selectedIds.length}</span>
                    <span className="text-ink">명 선택 중</span>
                  </p>
                ) : (
                  <p className="text-2xl">
                    <span className="text-ink">총 </span>
                    <span className="text-brand">{members.length}</span>
                    <span className="text-ink">명</span>
                  </p>
                )}
              </div>
              <h1 className="text-4xl font-bold text-ink">부원관리</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleRegister}
                className="rounded-md bg-brand px-5 py-3 text-xl text-white"
              >
                + 부원 등록
              </button>
              <button
                type="button"
                onClick={handleEdit}
                className="rounded-md border border-solid border-brand bg-white px-5 py-3 text-xl text-brand"
              >
                부원 정보 수정
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-md border border-solid border-brand bg-white px-5 py-3 text-xl text-brand"
              >
                부원 삭제
              </button>
            </div>
          </div>

          {/* 부원 목록 테이블: 둥근 베이지 헤더 배너 + 테두리 흰 카드 (시안 구조).
              overflow-hidden을 쓰지 않는 이유: 상태 드롭다운이 행 밖으로 펼쳐질 때 잘리지 않게 하기 위함.
              대신 헤더와 마지막 행에 모서리 라운드를 직접 준다. */}
          <div className="mt-8 rounded-card border border-brand-soft">
            {/* 헤더 배너: 데이터 행과 열별 가운데 정렬을 맞춘다 */}
            <div className="grid grid-cols-members items-center rounded-t-card bg-brand-soft px-6 py-4 text-center text-2xl text-ink">
              <span className="flex justify-center">
                <RowCheckbox checked={isAllSelected} onChange={handleToggleAll} />
              </span>
              <span className="flex justify-center">
                <SortDropdown />
              </span>
              <span>이름</span>
              <span>학번</span>
              <span>학년</span>
              <span>나이</span>
              <span>전화번호</span>
              <span>부원상태</span>
            </div>

            {/* 본문 행 */}
            <div className="divide-y divide-line">
              {pagedMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`grid grid-cols-members items-center bg-white px-6 py-6 text-center text-xl text-ink ${
                    index === pagedMembers.length - 1 ? 'rounded-b-card' : ''
                  }`}
                >
                  <span className="flex justify-center">
                    <RowCheckbox
                      checked={selectedIds.includes(member.id)}
                      onChange={() => handleToggleRow(member.id)}
                    />
                  </span>
                  <span>{member.no}</span>
                  <span>{member.name}</span>
                  <span>{member.studentId}</span>
                  <span>{member.grade}</span>
                  <span>{member.age}</span>
                  <span>{member.phone}</span>
                  <span className="flex justify-center ">
                    <StatusBadge status={member.status} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      {alertMessage && (
        <AlertModal message={alertMessage} onConfirm={() => setAlertMessage(null)} />
      )}
      {confirmState && (
        <ConfirmModal
          message={confirmState.message}
          confirmLabel={confirmState.confirmLabel}
          onCancel={() => setConfirmState(null)}
          onConfirm={confirmState.onConfirm}
        />
      )}
    </>
  );
}

export default MemberPage;
