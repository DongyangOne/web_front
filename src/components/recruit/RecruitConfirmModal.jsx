import { useEffect } from 'react';

import closeIcon from '@/assets/images/x.svg';

const GENDER_LABEL = {
  MALE: '남자',
  FEMALE: '여자',
};

function RecruitConfirmModal({
  form,
  onClose,
  onConfirm,
  isSubmitting,
  submittingLabel = '제출 중',
}) {
  const genderLabel = GENDER_LABEL[form.gender] ?? '';

  useEffect(() => {
    const { overflow } = document.body.style;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 shadow-recruit-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recruit-confirm-title"
    >
      <div className="relative flex h-[505px] w-full max-w-[746px] flex-col overflow-hidden rounded-[8px] bg-white shadow-recruit-modal">
        <div className="flex h-[40px] items-center justify-end bg-brand pr-[23px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-5 w-5 items-center justify-center"
          >
            <img src={closeIcon} alt="닫기" className="h-full w-full" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-[51px] pb-[78px] pt-5 text-[14px] font-normal leading-7 text-ink">
          <p id="recruit-confirm-title" className="font-bold">
            입력하신 내용을 확인해 주세요.
          </p>

          <div className="mt-6">
            <p>이름: {form.name}</p>
            <p>학과: {form.department}</p>
            <p>학번: {form.studentId}</p>
            <p>생년월일: {form.birthday}</p>
            <p>학년: {form.grade}학년</p>
            <p>전화번호: {form.phoneNumber}</p>
            <p>성별: {genderLabel}</p>
          </div>

          <div className="mt-6">
            <p>지원 동기: {form.motivation}</p>
            <p>사용해봤거나 들어본 언어 및 라이브러리: {form.techStack}</p>
            <p>동아리에서 해 보고 싶은 것: {form.desiredActivity}</p>
            {form.finalWords && <p>마지막으로 하고 싶은 말: {form.finalWords}</p>}
          </div>

          <p className="mt-6">개인 정보 수집 동의: 동의함</p>
        </div>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isSubmitting}
          className="absolute bottom-[28px] right-[51px] h-[34px] min-w-[66px] rounded-[6px] bg-brand px-5 text-[13px] font-bold text-white disabled:cursor-not-allowed"
        >
          {isSubmitting ? submittingLabel : '확인'}
        </button>
      </div>
    </div>
  );
}

export default RecruitConfirmModal;
