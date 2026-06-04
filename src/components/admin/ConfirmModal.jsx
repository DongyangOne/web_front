/**
 * 취소/실행 두 버튼 확인 모달.
 * 정보 수정·삭제 실행 전 사용자에게 확인을 받는다.
 * 시안 기준 취소(주황 채움)가 왼쪽, 실행(연한 피치)이 오른쪽이다.
 * @param {Object} props
 * @param {string} props.message - 확인 문구 (줄바꿈은 \n 사용)
 * @param {string} props.confirmLabel - 실행 버튼 라벨 (예: '수정', '삭제')
 * @param {Function} props.onCancel - 취소 클릭 또는 배경 클릭 시 호출
 * @param {Function} props.onConfirm - 실행 클릭 시 호출
 */
function ConfirmModal({ message, confirmLabel, onCancel, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-solid border-brand/20 bg-white px-12 pb-10 pt-[60px] shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="whitespace-pre-line text-center text-lg leading-relaxed text-ink">
          {message}
        </p>
        <div className="mt-8 flex justify-center gap-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-10 w-[150px] items-center justify-center rounded-2xl border border-solid border-brand/25 bg-brand text-base font-normal text-white"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex h-10 w-[150px] items-center justify-center rounded-2xl border border-solid border-brand/25 bg-brand-soft text-base font-normal text-brand"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
