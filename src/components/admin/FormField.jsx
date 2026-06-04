import { useState, useEffect, useRef } from 'react';

/**
 * 부원 등록 폼의 단일 입력 행.
 * 왼쪽에 라벨(+필수 표시), 오른쪽에 입력/선택 컨트롤과 오류 메시지를 세로로 배치한다.
 * options가 주어지면 커스텀 셀렉트, 없으면 text input으로 렌더한다.
 * 현재 값은 상위(MemberRegisterPage)에서 관리하며, onChange로 '값'(이벤트 아님)을 전달한다.
 * @param {Object} props
 * @param {string} props.label - 필드 라벨 (예: '이름')
 * @param {boolean} [props.required=false] - 필수 입력 여부. true면 라벨 옆에 * 표시
 * @param {string} props.placeholder - 입력/선택 안내 문구
 * @param {string} props.value - 현재 값
 * @param {Function} props.onChange - 값 변경 콜백 (변경된 값을 인자로 받음)
 * @param {string[]} [props.options] - 주어지면 커스텀 셀렉트로 렌더할 선택지 목록
 * @param {string} [props.error] - 오류 메시지. 있으면 입력칸 아래에 표시
 */
function FormField({ label, required = false, placeholder, value, onChange, options, error }) {
  return (
    <div className="flex items-start gap-4">
      <label className="w-20 shrink-0 pt-3 text-right text-sm text-ink">
        {label}
        {required && <span className="pl-1 align-top text-[11px] text-error">*</span>}
      </label>

      <div className="flex flex-col gap-1">
        {options ? (
          <SelectField
            placeholder={placeholder}
            value={value}
            options={options}
            onChange={onChange}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="h-[46px] w-[416px] rounded-md border border-solid border-field-border bg-white px-3.5 text-sm text-ink placeholder:text-ink-sub"
          />
        )}

        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    </div>
  );
}

/**
 * 커스텀 셀렉트.
 * 트리거를 누르면 흰 패널이 펼쳐지고, 첫 항목 '선택'은 값을 초기화(placeholder 복귀),
 * 나머지 항목은 해당 값을 고른다. 바깥을 클릭하면 닫힌다.
 * @param {Object} props
 * @param {string} props.placeholder - 미선택 시 트리거에 표시할 안내 문구
 * @param {string} props.value - 현재 선택값
 * @param {string[]} props.options - 선택지 목록
 * @param {Function} props.onChange - 선택값 변경 콜백
 */
function SelectField({ placeholder, value, options, onChange }) {
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

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-[416px]">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-[46px] w-full items-center justify-between rounded-md border border-solid border-field-border bg-white px-3.5 text-sm"
      >
        <span className={value ? 'text-ink' : 'text-ink-sub'}>
          {value || placeholder}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-[50px] z-10 w-full overflow-hidden rounded-md border border-solid border-field-border bg-white shadow-md">
          {/* '선택'은 값 초기화(placeholder로 복귀) */}
          <li>
            <button
              type="button"
              onClick={() => handleSelect('')}
              className="block w-full px-3.5 py-3 text-left text-sm text-ink-sub hover:bg-brand-soft"
            >
              선택
            </button>
          </li>
          {options.map((option) => (
            <li key={option} className="border-t border-solid border-line">
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className="block w-full px-3.5 py-3 text-left text-sm text-ink hover:bg-brand-soft"
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
 * 셀렉트 우측 셰브론. 펼침 여부에 따라 상하로 회전한다(브랜드 색).
 * @param {Object} props
 * @param {boolean} props.isOpen - 드롭다운 펼침 여부
 */
function ChevronIcon({ isOpen }) {
  return (
    <svg
      className={`pointer-events-none text-brand transition-transform ${isOpen ? 'rotate-180' : ''}`}
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

export default FormField;
