/**
 * 부원 상태 표시 뱃지 (읽기 전용).
 * 백엔드에 상태 변경 API가 없어 명부 목록에서는 상태를 표시만 한다.
 * @param {Object} props
 * @param {string} props.label - 화면에 표시할 상태 한글 라벨 (예: '재학 중')
 */
function StatusBadge({ label }) {
  return (
    <span className="flex h-10 w-badge items-center justify-center rounded-2xl border border-solid border-brand/25 bg-brand-soft text-xl text-brand">
      {label}
    </span>
  );
}

export default StatusBadge;
