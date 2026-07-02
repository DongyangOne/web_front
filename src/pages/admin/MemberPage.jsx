import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteMembers, getMemberList } from '@/apis/member';
import { ROUTES } from '@/constants/routes';
import { MEMBER_PAGE_SIZE, MEMBER_SORT, SORT_DIRECTION } from '@/constants/member';
import MemberTable from '@/components/admin/MemberTable';
import Pagination from '@/components/admin/Pagination';
import AlertModal from '@/components/admin/AlertModal';
import ConfirmModal from '@/components/admin/ConfirmModal';

import groupIcon from '@/assets/images/member-group.svg';

// 정렬 기준별 기본 방향: 등록순은 최신순(DESC), 학년순은 오름차순(ASC).
const getSortDirection = (sort) =>
  sort === MEMBER_SORT.GRADE ? SORT_DIRECTION.ASC : SORT_DIRECTION.DESC;

/**
 * 명부 관리 페이지.
 * admin 히든 경로(/admin/members) 하위에서 동작하는 부원 목록 조회/삭제 화면이다.
 * 목록은 서버 페이지네이션(page 0부터, size 15 고정)으로 조회한다.
 */
function MemberPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(MEMBER_SORT.CREATED_AT);
  const [selectedIds, setSelectedIds] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [confirmState, setConfirmState] = useState(null);

  // 명부 목록 조회. 페이지/정렬이 바뀔 때마다 서버에서 다시 받아온다.
  const fetchMembers = useCallback(async () => {
    try {
      const paging = await getMemberList({
        page: currentPage - 1,
        size: MEMBER_PAGE_SIZE,
        sort,
        direction: getSortDirection(sort),
      });

      setMembers(paging?.content ?? []);
      setTotalElements(paging?.totalElements ?? 0);
      setTotalPages(Math.max(1, paging?.totalPages ?? 1));
    } catch (error) {
      console.error('[MemberPage] 명부 목록 조회 실패', error);
      setMembers([]);
      setTotalElements(0);
      setTotalPages(1);
      setAlertMessage('명부를 불러오지 못했습니다.\n잠시 후 다시 시도해주세요.');
    }
  }, [currentPage, sort]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleToggleAll = () => {
    const isAllSelected =
      members.length > 0 && members.every((member) => selectedIds.includes(member.memberId));
    setSelectedIds(isAllSelected ? [] : members.map((member) => member.memberId));
  };

  const handleToggleRow = (memberId) => {
    setSelectedIds((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  };

  // 페이지/정렬 변경 시 선택은 현재 페이지 기준이므로 초기화한다.
  const handlePageChange = (nextPage) => {
    setSelectedIds([]);
    setCurrentPage(nextPage);
  };

  const handleSortChange = (nextSort) => {
    setSelectedIds([]);
    setCurrentPage(1);
    setSort(nextSort);
  };

  // 부원 등록: 선택이 있으면 안내. 등록은 선택과 무관한 메뉴다.
  const handleRegister = () => {
    if (selectedIds.length > 0) {
      setAlertMessage('부원 등록은 선택이 불가한 메뉴입니다.\n선택 해제 후 실행해주세요.');
      return;
    }
    navigate(ROUTES.ADMIN_MEMBER_REGISTER);
  };

  // 정보 수정: 정확히 1명만 가능. memberId를 넘겨 수정 페이지에서 상세를 조회한다.
  const handleEdit = () => {
    if (selectedIds.length === 0) {
      setAlertMessage('메뉴를 실행할 부원을\n선택해주세요.');
      return;
    }
    if (selectedIds.length > 1) {
      setAlertMessage('정보 수정은 복수 선택이 불가능합니다.\n한명만 선택해주세요.');
      return;
    }
    navigate(ROUTES.ADMIN_MEMBER_EDIT, { state: { memberId: selectedIds[0] } });
  };

  // 삭제: 1명 이상 선택 시 확인 후 서버에 삭제 요청하고 목록을 재조회한다.
  const handleDelete = () => {
    if (selectedIds.length === 0) {
      setAlertMessage('메뉴를 실행할 부원을\n선택해주세요.');
      return;
    }
    setConfirmState({
      message: '선택한 부원을\n삭제하시겠습니까?',
      confirmLabel: '삭제',
      onConfirm: async () => {
        try {
          await deleteMembers(selectedIds);
          setSelectedIds([]);
          setConfirmState(null);
          await fetchMembers();
        } catch (error) {
          console.error('[MemberPage] 부원 삭제 실패', error);
          setConfirmState(null);
          setAlertMessage('부원 삭제에 실패했습니다.\n잠시 후 다시 시도해주세요.');
        }
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
                    <span className="text-brand">{totalElements}</span>
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

          <MemberTable
            members={members}
            selectedIds={selectedIds}
            currentPage={currentPage}
            sort={sort}
            handlers={{
              onToggleAll: handleToggleAll,
              onToggleRow: handleToggleRow,
              onSortChange: handleSortChange,
            }}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
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
