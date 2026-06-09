import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';

const INITIAL_FORM = {
  name: '',
  studentId: '',
  major: '',
  motivation: '',
};

function RecruitPage() {
  const navigate = useNavigate();
  // 1. 상태
  const [form, setForm] = useState(INITIAL_FORM);

  // 2. 핸들러
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setForm(INITIAL_FORM);
    navigate(ROUTES.RECRUIT_COMPLETE);
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

      <Button onClick={handleSubmit} disabled={!isFormValid}>
        신청하기
      </Button>
    </section>
  );
}

export default RecruitPage;
