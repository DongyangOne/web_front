import { useState, useEffect, useRef } from 'react';

// 선택 가능한 부원 상태 목록 (시안 드롭다운 기준).
const STATUS_OPTIONS = ['재학 중', '휴학 중', '군휴학 중'];

/**
 * 부원 상태 드롭다운.
 * 시안의 알약형 배지를 클릭하면 상태 목록이 펼쳐지고, 항목을 고르면 값이 바뀐다.
 * 현재 선택값은 컴포넌트 내부 상태로 관리한다. 추후 API 연동 시 onChange로 상위에 전달한다.
 * @param {Object} props
 * @param {string} props.status - 초기 표시 상태 (예: '재학 중')
 */
function StatusBadge({ status }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const containerRef = useRef(null);

  // 드롭다운 바깥을 클릭하면 닫는다.
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelectedStatus(option);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-badge">
      {/* 텍스트는 중앙에서 살짝 왼쪽(pr-6로 좌측 치우침), 셰브론은 우측 고정 */}
      <button
        type="button"
        onClick={handleToggle}
        className="relative flex h-10 w-full items-center justify-center rounded-2xl border border-solid border-brand/25 bg-brand-soft pr-6 text-base text-brand"
      >
        {selectedStatus}
        <ChevronIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-11 z-10 w-full overflow-hidden rounded-2xl border border-solid border-brand/25 bg-brand-soft">
          {STATUS_OPTIONS.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className="block w-full py-2 text-center text-base text-brand hover:bg-brand/10"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * 펼침 여부에 따라 위/아래로 회전하는 셰브론.
 * @param {Object} props
 * @param {boolean} props.isOpen - 드롭다운 펼침 여부
 */
function ChevronIcon({ isOpen }) {
  return (
    <svg
      className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform ${
        isOpen ? 'rotate-180' : ''
      }`}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default StatusBadge;
