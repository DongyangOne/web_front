import { FieldError } from '@/components/recruit/RecruitFormFields';
import { PrivacyAgreementOption } from '@/components/recruit/PrivacyAgreementOption';

export function RecruitPrivacyAgreementSection({
  form,
  errors,
  hasSubmitted,
  isSubmitting,
  submitLabel,
  submittingLabel,
  onChange,
  onSubmit,
}) {
  return (
    <div className="pt-[100px]">
      <div className="min-h-[660px] rounded-[50px] bg-white px-0 py-7 shadow-recruit-card">
        <div className="mx-4 mt-[37px] sm:mx-6 lg:ml-[145px] lg:mr-[159px]">
          <h2 className="text-[25px] font-bold text-ink">개인 정보 수집 및 이용 동의</h2>

          <div className="mx-auto mt-[50px] min-h-[250px] max-w-[820px] rounded-[6px] border border-brand px-8 py-10 text-[14px] font-normal leading-6 text-ink">
            <p className="font-bold">수집 항목</p>
            <p>이름, 학과, 학번, 생년월일, 전화번호, 학년, 성별, 지원 동기, 기술 스택, 활동 목표</p>
            <p className="mt-5 font-bold">수집 목적</p>
            <p>신입부원 선발 및 동아리 활동 운영</p>
            <p className="mt-5 font-bold">보유 기간</p>
            <p>지원 일자로부터 1년</p>
            <p className="mt-5 font-bold">동의하지 않을 시 불이익이 있을 수 있습니다.</p>
          </div>

          <div className="relative mt-[45px] flex justify-center gap-[110px]">
            <PrivacyAgreementOption
              label="동의"
              value="true"
              checked={form.privacyConsent === true}
              onChange={onChange}
            />
            <PrivacyAgreementOption
              label="비동의"
              value="false"
              checked={form.privacyConsent === false}
              onChange={onChange}
            />
            {hasSubmitted && errors.privacyConsent && (
              <FieldError
                className="left-0 right-0 top-full mt-3 text-center"
                message={errors.privacyConsent}
              />
            )}
          </div>

          <div className="mt-[45px] flex justify-center">
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="h-[60px] min-w-[250px] rounded-button bg-brand px-8 text-[24px] font-bold text-white transition "
            >
              {isSubmitting ? submittingLabel : submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
