import { useState } from 'react';

import {
  FieldError,
  FormInput,
  FormSelect,
  InfoCard,
  RadioOption,
  RequiredMark,
  SupportInput,
  SupportTextarea,
} from '@/components/recruit/RecruitFormFields';
import { RecruitConfirmModal } from '@/components/recruit/RecruitConfirmModal';
import radioOffIcon from '@/assets/images/radio_n.svg';
import radioOnIcon from '@/assets/images/radio_y.svg';

const TEXT = {
  titleAccent: '신입 부원',
  titleRest: '모집',
  description: '신입 부원 모집을 위해 정보를 작성해 주세요.',
  basicInfo: '기본 정보',
  applyInfo: '지원 정보',
  submit: '제출하기',
  submitting: '제출 중',
};

const INITIAL_FORM = {
  name: '',
  major: '',
  studentId: '',
  birthdate: '',
  grade: '',
  phone: '',
  gender: '',
  motivation: '',
  portfolio: '',
  interests: '',
  finalMessage: '',
  privacyAgreement: '',
};

const majorOptions = ['웹응용소프트웨어공학과'];

function PrivacyAgreementOption({ label, value, checked, onChange }) {
  return (
    <label className="inline-flex min-w-fit items-center gap-[6px] whitespace-nowrap text-[14px] font-normal text-ink">
      <input
        type="radio"
        name="privacyAgreement"
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <img
        src={checked ? radioOnIcon : radioOffIcon}
        alt=""
        className="h-4 w-4 rounded-full peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand"
      />
      {label}
    </label>
  );
}

const fieldValidators = [
  {
    key: 'name',
    validate: (value) => /^[가-힣]+$/.test(value) && value.length >= 2 && value.length <= 8,
    message: '이름을 확인해 주세요.',
  },
  {
    key: 'major',
    validate: (value) => value.length > 0,
    message: '학과를 선택해 주세요.',
  },
  {
    key: 'studentId',
    validate: (value) => /^\d{8}$/.test(value),
    message: '학번을 확인해 주세요.',
  },
  {
    key: 'birthdate',
    validate: (value) => /^\d{4}-\d{2}-\d{2}$/.test(value),
    message: '생년월일을 입력해 주세요.',
  },
  {
    key: 'grade',
    validate: (value) => /^[1-4]$/.test(value),
    message: '학년을 확인해 주세요.',
  },

  {
    key: 'phone',
    validate: (value) => /^010-\d{4}-\d{4}$/.test(value),
    message: '전화번호를 확인해 주세요.',
  },
  {
    key: 'motivation',
    validate: (value) => value.length > 0 && value.length <= 500,
    message: '지원 동기를 확인해 주세요.',
  },
  {
    key: 'portfolio',
    validate: (value) => value.length > 0,
    message: '사용해봤거나 들어본 언어 및 라이브러리를 확인해 주세요.',
  },
  {
    key: 'interests',
    validate: (value) => value.length > 0,
    message: '동아리에서 해 보고 싶은 것을 확인해 주세요.',
  },
  {
    key: 'gender',
    validate: (value) => value.length > 0,
    message: '성별을 확인해 주세요.',
  },
  {
    key: 'privacyAgreement',
    validate: (value) => value === 'agree',
    message: '동의하지 않을 시 불이익이 있을 수 있습니다.',
  },
];

function formatPhoneNumber(value) {
  const numbers = value.replace(/\D/g, '').slice(0, 11);
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
}

function RecruitPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === 'phone' ? formatPhoneNumber(value) : value;
    setForm((prevForm) => ({ ...prevForm, [name]: nextValue }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]:
        name === 'privacyAgreement' && value === 'disagree'
          ? '동의하지 않을 시 불이익이 있을 수 있습니다.'
          : '',
    }));
  };

  const getValidationErrors = () => {
    return fieldValidators.reduce((nextErrors, { key, validate, message }) => {
      const value = String(form[key] || '').trim();
      if (!validate(value)) {
        nextErrors[key] = message;
      }
      return nextErrors;
    }, {});
  };

  const handleSubmit = () => {
    if (isSubmitting) return;

    const nextErrors = getValidationErrors();
    setHasSubmitted(true);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitError('');
      return;
    }

    setErrors({});
    setSubmitError('');
    setIsConfirmOpen(true);
  };

  const handleConfirmSubmit = () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');
    window.setTimeout(() => {
      setIsConfirmOpen(false);
      setIsSubmitting(false);
    }, 0);
  };

  return (
    <section className="min-h-screen min-w-[320px] bg-brand-soft px-4 py-10 sm:px-8">
      <div className="mx-auto w-full max-w-[1253px]">
        <header>
          <h1 className="text-[48px] font-bold leading-tight text-ink sm:text-[64px] lg:text-[80px]">
            <span className="text-brand">{TEXT.titleAccent}</span> {TEXT.titleRest}
          </h1>
          <p className="mt-4 text-[20px] font-light text-[#999999] sm:text-[26px] lg:text-[32px]">
            {TEXT.description}
          </p>
        </header>

        <InfoCard title={TEXT.basicInfo}>
          <div className="mx-4 mt-[56px] grid grid-cols-1 gap-x-[64px] gap-y-[51px] sm:mx-6 lg:ml-[145px] lg:mr-[159px] lg:grid-cols-2">
            <div className="lg:col-span-2">
              <FormInput
                label="이름"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                inputClassName="w-full max-w-[617px]"
                error={hasSubmitted ? errors.name : ''}
              />
            </div>
            <FormSelect
              label="학과"
              name="major"
              value={form.major}
              onChange={handleChange}
              options={majorOptions}
              inputClassName="w-full max-w-[347px]"
              error={hasSubmitted ? errors.major : ''}
            />
            <FormInput
              label="학번"
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              required
              maxLength={8}
              inputClassName="w-full max-w-[347px]"
              error={hasSubmitted ? errors.studentId : ''}
            />
            <FormInput
              label="생년월일"
              name="birthdate"
              type="date"
              value={form.birthdate}
              onChange={handleChange}
              placeholder="생년월일을 입력해 주세요."
              required
              inputClassName="w-full max-w-[347px]"
              error={hasSubmitted ? errors.birthdate : ''}
            />
            <FormInput
              label="학년"
              name="grade"
              value={form.grade}
              onChange={handleChange}
              placeholder="학년을 입력해 주세요."
              required
              maxLength={1}
              inputClassName="w-full max-w-[347px]"
              error={hasSubmitted ? errors.grade : ''}
            />
            <div className="lg:col-span-2">
              <FormInput
                label="전화번호"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="전화번호를 입력해 주세요."
                required
                maxLength={13}
                inputClassName="w-full max-w-[617px]"
                error={hasSubmitted ? errors.phone : ''}
              />
            </div>
            <fieldset className="relative mt-[19px] grid gap-2 text-[14px] font-normal text-ink sm:grid-cols-[64px_1fr] sm:items-center sm:gap-x-[45px] lg:col-span-2">
              <legend className="contents">
                <div className="flex items-center">
                  성별
                  <RequiredMark />
                </div>
              </legend>
              <div className="flex min-w-0 items-center gap-[35px]">
                <RadioOption
                  label="남자"
                  value="male"
                  checked={form.gender === 'male'}
                  onChange={handleChange}
                />
                <RadioOption
                  label="여자"
                  value="female"
                  checked={form.gender === 'female'}
                  onChange={handleChange}
                />
              </div>
              {hasSubmitted && errors.gender && (
                <FieldError className="sm:left-[109px]" message={errors.gender} />
              )}
            </fieldset>
          </div>
        </InfoCard>

        <div className="pt-[100px]">
          <InfoCard title={TEXT.applyInfo} className="mt-0" headerClassName="mt-[9px]">
            <div className="mx-4 mt-[29px] grid grid-cols-1 gap-y-[35px] sm:mx-6 lg:ml-[145px] lg:mr-[159px]">
              <SupportTextarea
                label="지원동기"
                name="motivation"
                value={form.motivation}
                onChange={handleChange}
                placeholder="지원동기를 작성해 주세요. (0/500)"
                required
                fieldClassName="lg:grid lg:grid-cols-[64px_617px] lg:items-start lg:gap-x-[171px]"
                labelClassName="mb-[14px] lg:mb-0"
                errorClassName="lg:col-start-2"
                error={hasSubmitted ? errors.motivation : ''}
              />
              <SupportInput
                label="사용해봤거나 들어본 언어 및 라이브러리"
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                placeholder="예) C언어, 파이썬 등"
                required
                inputClassName="lg:ml-[235px]"
                errorClassName="lg:ml-[235px]"
                error={hasSubmitted ? errors.portfolio : ''}
              />
              <SupportInput
                label="동아리에서 해 보고 싶은 것"
                name="interests"
                value={form.interests}
                onChange={handleChange}
                placeholder="예) MT, 각종 축제 등"
                required
                inputClassName="lg:ml-[235px]"
                errorClassName="lg:ml-[235px]"
                error={hasSubmitted ? errors.interests : ''}
              />
              <SupportInput
                label="마지막으로 하고 싶은 말"
                name="finalMessage"
                value={form.finalMessage}
                onChange={handleChange}
                placeholder="자유롭게 작성해 주세요."
                inputClassName="lg:ml-[235px]"
              />
            </div>
          </InfoCard>
        </div>

        <div className="pt-[100px]">
          <div className="min-h-[660px] rounded-[50px] bg-white px-0 py-7 shadow-recruit-card">
            <div className="mx-4 mt-[37px] sm:mx-6 lg:ml-[145px] lg:mr-[159px]">
              <h2 className="text-[25px] font-bold text-ink">개인 정보 수집 및 이용 동의</h2>

              <div className="mx-auto mt-[50px] min-h-[250px] max-w-[820px] rounded-[3px] border border-brand px-8 py-10 text-[14px] font-normal leading-6 text-ink">
                <p className="font-bold">수집 항목</p>
                <p>
                  이름, 학과, 학번, 생년월일, 전화번호, 학년, 성별, 지원 동기, 기술 스택, 활동 목표
                </p>
                <p className="mt-5 font-bold">수집 목적</p>
                <p>신입부원 선발 및 동아리 활동 운영</p>
                <p className="mt-5 font-bold">보유 기간</p>
                <p>지원 일자로부터 1년</p>
                <p className="mt-5 font-bold">동의하지 않을 시 불이익이 있을 수 있습니다.</p>
              </div>

              <div className="relative mt-[45px] flex justify-center gap-[110px]">
                <PrivacyAgreementOption
                  label="동의"
                  value="agree"
                  checked={form.privacyAgreement === 'agree'}
                  onChange={handleChange}
                />
                <PrivacyAgreementOption
                  label="비동의"
                  value="disagree"
                  checked={form.privacyAgreement === 'disagree'}
                  onChange={handleChange}
                />
                {hasSubmitted && errors.privacyAgreement && (
                  <FieldError
                    className="left-0 right-0 top-full mt-3 text-center"
                    message={errors.privacyAgreement}
                  />
                )}
              </div>

              <div className="mt-[45px] flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="h-[60px] min-w-[250px] rounded-button bg-brand px-8 text-[24px] font-bold text-white transition hover:bg-[#e85f00] disabled:cursor-not-allowed disabled:bg-[#b8b8b8]"
                >
                  {isSubmitting ? TEXT.submitting : TEXT.submit}
                </button>
              </div>
            </div>
          </div>
        </div>

        {submitError && (
          <p
            className="mx-4 mt-5 rounded-[8px] bg-red-50 px-4 py-3 text-sm font-medium text-error sm:mx-6 lg:ml-[145px] lg:mr-[159px]"
            role="alert"
          >
            {submitError}
          </p>
        )}
      </div>

      {isConfirmOpen && (
        <RecruitConfirmModal
          form={form}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirmSubmit}
          isSubmitting={isSubmitting}
          submittingLabel={TEXT.submitting}
        />
      )}
    </section>
  );
}

export default RecruitPage;
