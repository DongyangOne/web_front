import { useState, useEffect, useRef } from 'react';

// NO 열 정렬 기준 (시안 드롭다운 기준).
const SORT_OPTIONS = ['학년순', '등록순'];

/**
 * NO 열 헤더의 정렬 드롭다운.
 * "NO" 왼쪽 셰브론을 누르면 정렬 기준(학년순/등록순)이 펼쳐진다.
 * 현재는 표시/선택 전용이며, 실제 정렬 로직은 추후 연동한다.
 */
function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
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

  // TODO: 정렬 기준 선택 시 실제 목록 정렬 적용 (백엔드 연동 후)
  const handleSelect = () => setIsOpen(false);

  return (
    <div ref={containerRef} className="relative inline-flex flex-col items-center">
      <button type="button" onClick={handleToggle} className="inline-flex items-center gap-1">
        <ChevronIcon isOpen={isOpen} />
        NO
      </button>

      {isOpen && (
        <ul className="absolute top-10 z-10 w-32 divide-y divide-brand/20 overflow-hidden rounded-xl border border-solid border-brand/25 bg-brand-soft text-xl">
          {SORT_OPTIONS.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={handleSelect}
                className="block w-full py-3 text-center text-brand hover:bg-brand/10"
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
      className={`transition-transform ${isOpen ? 'rotate-180' : ''} text-brand`}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default SortDropdown;
