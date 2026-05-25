import { useState } from 'react';
import { submitRecruit } from '@/apis/recruit';
import Button from '@/components/common/Button';

const INITIAL_FORM = {
  name: '',
  studentId: '',
  major: '',
  motivation: '',
};

function RecruitPage() {
  // 1. 상태
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // 2. 핸들러
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitRecruit(form);
      setForm(INITIAL_FORM);
      alert('신청이 완료되었습니다.');
    } catch (error) {
      console.error('[RecruitPage] 신청 실패:', error);
      setSubmitError('신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. 파생 변수
  const isFormValid = form.name.trim() !== '' && form.studentId.trim() !== '';

  // 4. 렌더링
  return (
    <section>
      <h2>신입부원 모집 신청</h2>

      <label>
        이름
        <input name="name" value={form.name} onChange={handleChange} />
      </label>

      <label>
        학번
        <input name="studentId" value={form.studentId} onChange={handleChange} />
      </label>

      <label>
        전공
        <input name="major" value={form.major} onChange={handleChange} />
      </label>

      <label>
        지원 동기
        <textarea name="motivation" value={form.motivation} onChange={handleChange} />
      </label>

      {submitError && <p role="alert">{submitError}</p>}

      <Button onClick={handleSubmit} disabled={!isFormValid || isSubmitting}>
        {isSubmitting ? '제출 중...' : '신청하기'}
      </Button>
    </section>
  );
}

export default RecruitPage;
