import { useEffect } from 'react';

import RecruitApplyInfoSection from '@/components/recruit/RecruitApplyInfoSection';
import RecruitBasicInfoSection from '@/components/recruit/RecruitBasicInfoSection';
import RecruitConfirmModal from '@/components/recruit/RecruitConfirmModal';
import { RecruitPrivacyAgreementSection } from '@/components/recruit/RecruitPrivacyAgreementSection';
import { useRecruitForm } from '@/hooks/useRecruitForm';
import { ROUTES } from '@/constants/routes';

const TEXT = {
  titleAccent: '신입 부원',
  titleRest: '모집',
  description: '신입 부원 모집을 위해 정보를 작성해 주세요.',
  basicInfo: '기본 정보',
  applyInfo: '지원 정보',
  submit: '제출하기',
  submitting: '제출 중',
};

const MAJOR_OPTIONS = ['웹응용소프트웨어공학과'];

const LEAVE_CONFIRM_MESSAGE = '입력하신 정보는 저장되지 않습니다.\n페이지를 이동하시겠습니까?';

function RecruitPage() {
  const {
    form,
    submitError,
    errors,
    hasSubmitted,
    isConfirmOpen,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleConfirmSubmit,
    closeConfirm,
  } = useRecruitForm();

  const isDirty = Object.values(form).some((value) => value !== '');

  useEffect(() => {
    if (!isDirty) return;

    const handleLeavePage = (event) => {
      const link = event.target.closest('a[href]');

      if (
        !link ||
        link.target === '_blank' ||
        link.pathname === ROUTES.RECRUIT ||
        link.pathname === ROUTES.RECRUIT_COMPLETE
      ) {
        return;
      }

      if (!window.confirm(LEAVE_CONFIRM_MESSAGE)) {
        event.preventDefault();
      }
    };

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    document.addEventListener('click', handleLeavePage, true);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('click', handleLeavePage, true);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <section className="min-h-screen min-w-[320px] bg-brand-soft px-4 py-10 sm:px-8">
      <div className="mx-auto w-full max-w-[1253px]">
        <header>
          <h1 className="text-[48px] font-bold leading-tight text-ink sm:text-[64px] lg:text-[80px]">
            <span className="text-brand">{TEXT.titleAccent}</span> {TEXT.titleRest}
          </h1>
          <p className="mt-4 text-[20px] font-light text-ink-sub sm:text-[26px] lg:text-[32px]">
            {TEXT.description}
          </p>
        </header>

        <RecruitBasicInfoSection
          title={TEXT.basicInfo}
          form={form}
          errors={errors}
          hasSubmitted={hasSubmitted}
          onChange={handleChange}
          options={MAJOR_OPTIONS}
        />

        <RecruitApplyInfoSection
          title={TEXT.applyInfo}
          form={form}
          errors={errors}
          hasSubmitted={hasSubmitted}
          onChange={handleChange}
        />

        <RecruitPrivacyAgreementSection
          form={form}
          errors={errors}
          hasSubmitted={hasSubmitted}
          isSubmitting={isSubmitting}
          submitLabel={TEXT.submit}
          submittingLabel={TEXT.submitting}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        {submitError && (
          <p
            className="mx-4 mt-5 rounded-[8px] bg-error-soft px-4 py-3 text-sm font-medium text-error sm:mx-6 lg:ml-[145px] lg:mr-[159px]"
            role="alert"
          >
            {submitError}
          </p>
        )}
      </div>

      {isConfirmOpen && (
        <RecruitConfirmModal
          form={form}
          onClose={closeConfirm}
          onConfirm={handleConfirmSubmit}
          isSubmitting={isSubmitting}
          submittingLabel={TEXT.submitting}
        />
      )}
    </section>
  );
}

export default RecruitPage;
