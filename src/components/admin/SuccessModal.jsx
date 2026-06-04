/**
 * 등록 완료 성공 모달.
 * 체크 아이콘(연한 브랜드 원) + 완료 문구 + 확인 버튼으로 구성된다.
 * @param {Object} props
 * @param {string} props.message - 완료 문구 (예: '등록이 완료되었습니다')
 * @param {Function} props.onConfirm - 확인 클릭 또는 배경 클릭 시 호출
 */
function SuccessModal({ message, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onClick={onConfirm}
    >
      <div
        className="flex w-full max-w-md flex-col items-center rounded-3xl border border-solid border-brand/20 bg-white px-12 py-12 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* 체크 아이콘: 연한 브랜드 원 위에 브랜드 색 체크 */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-brand"
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="mt-6 text-2xl font-bold text-ink">{message}</p>

        <button
          type="button"
          onClick={onConfirm}
          className="mt-8 flex h-11 w-[150px] items-center justify-center rounded-full border border-solid border-brand/25 bg-brand-soft text-base text-brand"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
