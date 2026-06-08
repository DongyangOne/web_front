/**
 * 명부 테이블의 선택 체크박스.
 * 시안 기준 두 가지 상태를 그대로 표현한다.
 * - 선택: 주황 채움 박스 + 흰 체크
 * - 미선택: 흰 박스 + 회색 테두리 + 옅은 회색 체크
 * @param {Object} props
 * @param {boolean} [props.checked=false] - 선택 여부
 * @param {Function} props.onChange - 클릭 시 호출되는 토글 핸들러
 */
function RowCheckbox({ checked = false, onChange }) {
  return (
    <button type="button" role="checkbox" aria-checked={checked} onClick={onChange}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {checked ? (
          <>
            <rect width="20" height="20" rx="4" fill="#FF6B00" />
            <path d="M4 10.7143L8.11429 15L16 5" stroke="white" strokeWidth="2" />
          </>
        ) : (
          <>
            <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="white" stroke="#636363" />
            <path d="M4 10.7143L8.11429 15L16 5" stroke="#C4C4C4" strokeWidth="2" />
          </>
        )}
      </svg>
    </button>
  );
}

export default RowCheckbox;
