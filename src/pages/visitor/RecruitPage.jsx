import { useEffect, useState } from 'react';
import basicInfoIcon from '@/assets/images/main.svg';
import arrowIcon from '@/assets/images/arrow.svg';
import checkBoxOffIcon from '@/assets/images/checkBox_n.svg';
import checkBoxOnIcon from '@/assets/images/checkBox_y.svg';
import closeIcon from '@/assets/images/x.svg';

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
    validate: (value) => /^\d$/.test(value),
    message: '학년을 확인해 주세요.',
  },
  {
    key: 'phone',
    validate: (value) => /^010-\d{4}-\d{4}$/.test(value),
    message: '전화번호를 확인해 주세요.',
  },
  {
    key: 'motivation',
    validate: (value) => value.length > 0 && value.length < 500,
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
    setSubmitError('');
    setIsConfirmOpen(false);
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
            <fieldset className="mt-[19px] grid gap-2 text-[14px] font-normal text-ink sm:grid-cols-[64px_1fr] sm:items-center sm:gap-x-[45px] lg:col-span-2">
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
                <FieldError className="sm:col-start-2" message={errors.gender} />
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
                label="사용해봤거나 흥미를 가진 라이브러리"
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
                required
                inputClassName="lg:ml-[235px]"
              />
            </div>
          </InfoCard>
        </div>

        <div className="pt-[100px]">
          <div className="min-h-[660px] rounded-[30px] bg-white px-0 py-7 shadow-[0_3px_0_rgba(0,0,0,0.18)]">
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

              <div className="mt-[45px] flex justify-center gap-[110px]">
                <RadioOption
                  label="동의"
                  name="privacyAgreement"
                  value="agree"
                  checked={form.privacyAgreement === 'agree'}
                  onChange={handleChange}
                />
                <RadioOption
                  label="비동의"
                  name="privacyAgreement"
                  value="disagree"
                  checked={form.privacyAgreement === 'disagree'}
                  onChange={handleChange}
                />
              </div>
              {hasSubmitted && errors.privacyAgreement && (
                <FieldError className="mt-3 text-center" message={errors.privacyAgreement} />
              )}

              <div className="mt-[45px] flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="h-[60px] min-w-[250px] rounded-button bg-brand px-8 text-[24px] font-bold text-white transition hover:bg-[#e85f00]"
                >
                  {TEXT.submit}
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
        />
      )}
    </section>
  );
}

function InfoCard({ title, className = 'mt-5', headerClassName = '', children }) {
  return (
    <div
      className={`min-h-[660px] rounded-[30px] bg-white px-0 py-7 shadow-[0_3px_0_rgba(0,0,0,0.18)] ${className}`}
    >
      <div
        className={`ml-[10px] flex items-center gap-[10px] lg:ml-[30px] lg:mr-[159px] ${headerClassName}`}
      >
        <span className="flex shrink-0 items-center justify-center">
          <img src={basicInfoIcon} alt="" className="max-w-none translate-y-[1px]" />
        </span>
        <h2 className="text-[25px] font-bold text-ink">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function FormInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  maxLength,
  inputClassName = '',
  error = '',
}) {
  const isDateType = type === 'date';
  const [inputType, setInputType] = useState(isDateType && !value ? 'text' : type);

  useEffect(() => {
    if (!isDateType) return;
    setInputType(value ? 'date' : 'text');
  }, [isDateType, value]);

  const openPicker = (event) => {
    if (!isDateType) return;
    event.target.type = 'date';
    setInputType('date');

    try {
      event.target.showPicker();
    } catch {
      // showPicker is not available in every browser.
    }
  };

  return (
    <label className="grid gap-2 text-[14px] font-normal text-ink sm:grid-cols-[64px_1fr] sm:items-center sm:gap-x-[45px]">
      <span>
        {label}
        {required && <RequiredMark />}
      </span>
      <div>
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || `${label}을 입력해 주세요.`}
          maxLength={maxLength}
          onFocus={openPicker}
          onClick={openPicker}
          onBlur={(event) => {
            if (isDateType && !event.target.value) {
              setInputType('text');
            }
          }}
          className={`h-[46px] rounded-[3px] border border-field-border px-3 text-[14px] font-normal outline-none transition placeholder:text-gray-400 focus:border-brand ${
            isDateType ? 'date-input-without-icon' : ''
          } ${inputClassName}`}
        />
        {error && <FieldError message={error} />}
      </div>
    </label>
  );
}

function FormSelect({ label, name, value, onChange, options, error = '', inputClassName = '' }) {
  return (
    <label className="grid gap-2 text-[14px] font-normal text-ink sm:grid-cols-[64px_1fr] sm:items-center sm:gap-x-[45px]">
      <span>
        {label}
        <RequiredMark />
      </span>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`h-[46px] appearance-none rounded-[3px] border border-field-border bg-white px-3 pr-10 text-[14px] font-normal text-[#777777] outline-none transition focus:border-brand ${inputClassName}`}
        >
          <option value="">학과를 선택해 주세요.</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <img
          src={arrowIcon}
          alt=""
          className="pointer-events-none absolute right-3 top-[19px] h-2 w-3"
        />
        {error && <FieldError message={error} />}
      </div>
    </label>
  );
}

function FormTextarea({ label, name, value, onChange, placeholder = '', required = false }) {
  return (
    <label className="grid gap-2 text-[14px] font-normal text-ink sm:grid-cols-[64px_1fr] sm:gap-x-[45px]">
      <span>
        {label}
        {required && <RequiredMark />}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `${label}을 입력해 주세요.`}
        maxLength={500}
        className="min-h-[132px] w-full max-w-[617px] resize-none rounded-[3px] border border-field-border px-3 py-3 text-[14px] font-normal outline-none transition placeholder:text-gray-400 focus:border-brand"
      />
    </label>
  );
}

function SupportInput({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  fieldClassName = '',
  labelClassName = 'mb-[14px]',
  inputClassName = '',
  errorClassName = '',
  error = '',
}) {
  return (
    <div className={`w-full max-w-[617px] ${fieldClassName}`}>
      <p className={`text-[14px] font-normal text-ink ${labelClassName}`}>
        {label}
        {required && <RequiredMark />}
      </p>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `${label}을 입력해 주세요.`}
        className={`h-[46px] w-full rounded-[3px] border border-field-border px-3 text-[14px] font-normal outline-none transition placeholder:text-gray-400 focus:border-brand ${inputClassName}`}
      />
      {error && <FieldError className={errorClassName} message={error} />}
    </div>
  );
}

function SupportTextarea({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  fieldClassName = '',
  labelClassName = 'mb-[14px]',
  errorClassName = '',
  error = '',
}) {
  return (
    <div className={`w-full max-w-[617px] ${fieldClassName}`}>
      <p className={`text-[14px] font-normal text-ink ${labelClassName}`}>
        {label}
        {required && <RequiredMark />}
      </p>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `${label}을 입력해 주세요.`}
        maxLength={500}
        className="min-h-[132px] w-full resize-none rounded-[3px] border border-field-border px-3 py-3 text-[14px] font-normal outline-none transition placeholder:text-gray-400 focus:border-brand"
      />
      {error && <FieldError className={errorClassName} message={error} />}
    </div>
  );
}

function RadioOption({ label, value, checked, onChange, name = 'gender' }) {
  return (
    <label className="inline-flex min-w-fit items-center gap-[6px] whitespace-nowrap text-[14px] font-normal">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <img src={checked ? checkBoxOnIcon : checkBoxOffIcon} alt="" className="h-4 w-4" />
      {label}
    </label>
  );
}

function RequiredMark() {
  return <span className="text-error">*</span>;
}

function FieldError({ message, className = '' }) {
  return <p className={`mt-2 text-[14px] font-normal text-error ${className}`}>{message}</p>;
}

function RecruitConfirmModal({ form, onClose, onConfirm }) {
  const genderLabel = form.gender === 'male' ? '남자' : '여자';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="relative flex h-[505px] w-full max-w-[746px] flex-col overflow-hidden rounded-[8px] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
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
          <p className="font-bold">입력하신 내용을 확인해 주세요.</p>

          <div className="mt-6">
            <p>이름: {form.name}</p>
            <p>학과: {form.major}</p>
            <p>학번: {form.studentId}</p>
            <p>생년월일: {form.birthdate}</p>
            <p>학년: {form.grade}학년</p>
            <p>전화번호: {form.phone}</p>
            <p>성별: {genderLabel}</p>
          </div>

          <div className="mt-6">
            <p>지원 동기: {form.motivation}</p>
            <p>사용해봤거나 들어본 언어 및 라이브러리: {form.portfolio}</p>
            <p>동아리에서 해 보고 싶은 것: {form.interests}</p>
            {form.finalMessage && <p>마지막으로 하고 싶은 말: {form.finalMessage}</p>}
          </div>

          <p className="mt-6">개인 정보 수집 동의: 동의함</p>
        </div>
        <button
          type="button"
          onClick={onConfirm}
          className="absolute bottom-[28px] right-[51px] h-[34px] min-w-[66px] rounded-[6px] bg-brand px-5 text-[13px] font-bold text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default RecruitPage;
