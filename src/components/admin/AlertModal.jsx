/**
 * 단일 확인 버튼 알림 모달.
 * 잘못된 메뉴 실행(미선택/복수선택/등록 시 선택됨 등)을 안내한다.
 * @param {Object} props
 * @param {string} props.message - 안내 문구 (줄바꿈은 \n 사용)
 * @param {Function} props.onConfirm - 확인 클릭 또는 배경 클릭 시 호출
 */
function AlertModal({ message, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onClick={onConfirm}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-solid border-brand/20 bg-white px-12 py-10 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="whitespace-pre-line text-center text-lg leading-relaxed text-ink">
          {message}
        </p>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-brand-soft px-10 py-2.5 text-base font-medium text-brand"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
