import { useState, useEffect, useRef } from 'react';

import { MEMBER_SORT } from '@/constants/member';

// NO 열 정렬 기준. label은 화면 표시, value는 서버 sort 파라미터다.
const SORT_OPTIONS = [
  { label: '학년순', value: MEMBER_SORT.GRADE },
  { label: '등록순', value: MEMBER_SORT.CREATED_AT },
];

/**
 * NO 열 헤더의 정렬 드롭다운.
 * "NO" 왼쪽 셰브론을 누르면 정렬 기준(학년순/등록순)이 펼쳐진다.
 * @param {Object} props
 * @param {string} props.value - 현재 정렬 기준 (MEMBER_SORT 값)
 * @param {Function} props.onChange - 정렬 기준 변경 시 선택한 sort 값으로 호출
 */
function SortDropdown({ value, onChange }) {
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

  const handleSelect = (sortValue) => {
    onChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-flex flex-col items-center">
      <button type="button" onClick={handleToggle} className="inline-flex items-center gap-1">
        <ChevronIcon isOpen={isOpen} />
        NO
      </button>

      {isOpen && (
        <ul className="absolute top-10 z-10 w-32 divide-y divide-brand/20 overflow-hidden rounded-xl border border-solid border-brand/25 bg-brand-soft text-xl">
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`block w-full py-3 text-center hover:bg-brand/10 ${
                  option.value === value ? 'font-bold text-brand' : 'text-brand'
                }`}
              >
                {option.label}
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
