import {
  FieldError,
  FormInput,
  FormSelect,
  InfoCard,
  RadioOption,
  RequiredMark,
} from '@/components/recruit/RecruitFormFields';

export function RecruitBasicInfoSection({ title, form, errors, hasSubmitted, onChange, options }) {
  return (
    <InfoCard title={title}>
      <div className="mx-4 mt-[56px] grid grid-cols-1 gap-x-[64px] gap-y-[51px] sm:mx-6 lg:ml-[145px] lg:mr-[159px] lg:grid-cols-2">
        <div className="lg:col-span-2">
          <FormInput
            label="이름"
            name="name"
            value={form.name}
            onChange={onChange}
            required
            maxLength={8}
            inputClassName="w-full max-w-[617px]"
            error={hasSubmitted ? errors.name : ''}
          />
        </div>
        <FormSelect
          label="학과"
          name="major"
          value={form.major}
          onChange={onChange}
          options={options}
          inputClassName="w-full max-w-[347px]"
          error={hasSubmitted ? errors.major : ''}
        />
        <FormInput
          label="학번"
          name="studentId"
          value={form.studentId}
          onChange={onChange}
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
          onChange={onChange}
          placeholder="생년월일을 입력해 주세요."
          required
          inputClassName="w-full max-w-[347px]"
          error={hasSubmitted ? errors.birthdate : ''}
        />
        <FormInput
          label="학년"
          name="grade"
          value={form.grade}
          onChange={onChange}
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
            onChange={onChange}
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
              onChange={onChange}
            />
            <RadioOption
              label="여자"
              value="female"
              checked={form.gender === 'female'}
              onChange={onChange}
            />
          </div>
          {hasSubmitted && errors.gender && (
            <FieldError className="sm:left-[109px]" message={errors.gender} />
          )}
        </fieldset>
      </div>
    </InfoCard>
  );
}
