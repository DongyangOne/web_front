import { MEMBER_PAGE_SIZE, MEMBER_STATUS_LABEL } from '@/constants/member';
import StatusBadge from '@/components/admin/StatusBadge';
import SortDropdown from '@/components/admin/SortDropdown';
import RowCheckbox from '@/components/admin/RowCheckbox';

/**
 * 명부 목록 테이블.
 * 둥근 베이지 헤더 배너 + 테두리 흰 카드 행 구조(시안).
 * overflow-hidden을 쓰지 않는 이유: 상태 드롭다운이 행 밖으로 펼쳐질 때 잘리지 않게 하기 위함.
 * 대신 헤더와 마지막 행에 모서리 라운드를 직접 준다.
 * @param {Object} props
 * @param {Array} props.members - 현재 페이지의 부원 목록
 * @param {number[]} props.selectedIds - 선택된 부원 memberId 목록
 * @param {number} props.currentPage - 현재 페이지(1부터). NO 열 번호 계산에 사용
 * @param {string} props.sort - 현재 정렬 기준 (MEMBER_SORT 값)
 * @param {Object} props.handlers - { onToggleAll, onToggleRow, onSortChange }
 */
function MemberTable({ members, selectedIds, currentPage, sort, handlers }) {
  const { onToggleAll, onToggleRow, onSortChange } = handlers;

  // 현재 페이지 기준 전체 선택 여부
  const isAllSelected =
    members.length > 0 && members.every((member) => selectedIds.includes(member.memberId));

  return (
    <div className="mt-8 rounded-card border border-brand-soft">
      {/* 헤더 배너: 데이터 행과 열별 가운데 정렬을 맞춘다 */}
      <div className="grid grid-cols-members items-center rounded-t-card bg-brand-soft px-6 py-4 text-center text-2xl text-ink">
        <span className="flex justify-center">
          <RowCheckbox checked={isAllSelected} onChange={onToggleAll} />
        </span>
        <span className="flex justify-center">
          <SortDropdown value={sort} onChange={onSortChange} />
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
        {members.map((member, index) => (
          <div
            key={member.memberId}
            className={`grid grid-cols-members items-center bg-white px-6 py-6 text-center text-xl text-ink ${
              index === members.length - 1 ? 'rounded-b-card' : ''
            }`}
          >
            <span className="flex justify-center">
              <RowCheckbox
                checked={selectedIds.includes(member.memberId)}
                onChange={() => onToggleRow(member.memberId)}
              />
            </span>
            <span>{(currentPage - 1) * MEMBER_PAGE_SIZE + index + 1}</span>
            <span>{member.name}</span>
            <span>{member.studentId}</span>
            <span>{member.grade}</span>
            <span>{member.age}</span>
            <span>{member.phoneNumber}</span>
            <span className="flex justify-center ">
              <StatusBadge label={MEMBER_STATUS_LABEL[member.status] ?? member.status} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemberTable;
