import { InfoCard, SupportInput, SupportTextarea } from '@/components/recruit/RecruitFormFields';

function RecruitApplyInfoSection({ title, form, errors, hasSubmitted, onChange }) {
  return (
    <div className="pt-[100px]">
      <InfoCard title={title} className="mt-0" headerClassName="mt-[9px]">
        <div className="mx-4 mt-[29px] grid grid-cols-1 gap-y-[35px] sm:mx-6 lg:ml-[145px] lg:mr-[159px]">
          <SupportTextarea
            label="지원동기"
            name="motivation"
            value={form.motivation}
            onChange={onChange}
            placeholder="지원동기를 작성해 주세요. (0/500)"
            required
            fieldClassName="lg:grid lg:grid-cols-[64px_617px] lg:items-start lg:gap-x-[171px]"
            labelClassName="mb-[14px] lg:mb-0"
            errorClassName="lg:col-start-2"
            error={hasSubmitted ? errors.motivation : ''}
          />
          <SupportInput
            label="사용해봤거나 들어본 언어 및 라이브러리"
            name="techStack"
            value={form.techStack}
            onChange={onChange}
            placeholder="예) C언어, 파이썬 등"
            required
            inputClassName="lg:ml-[235px]"
            errorClassName="lg:ml-[235px]"
            error={hasSubmitted ? errors.techStack : ''}
          />
          <SupportInput
            label="동아리에서 해 보고 싶은 것"
            name="desiredActivity"
            value={form.desiredActivity}
            onChange={onChange}
            placeholder="예) MT, 각종 축제 등"
            required
            inputClassName="lg:ml-[235px]"
            errorClassName="lg:ml-[235px]"
            error={hasSubmitted ? errors.desiredActivity : ''}
          />
          <SupportInput
            label="마지막으로 하고 싶은 말"
            name="finalWords"
            value={form.finalWords}
            onChange={onChange}
            placeholder="자유롭게 작성해 주세요."
            inputClassName="lg:ml-[235px]"
          />
        </div>
      </InfoCard>
    </div>
  );
}

export default RecruitApplyInfoSection;
