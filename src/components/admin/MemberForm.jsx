import { useState } from 'react';

import FormField from '@/components/admin/FormField';
import SuccessModal from '@/components/admin/SuccessModal';
import ApplicantListModal from '@/components/admin/ApplicantListModal';

// 학년 선택지 (시안 드롭다운 기준: 선택/1/2/3/4). '선택'(초기화)은 FormField가 직접 렌더한다.
const GRADE_OPTIONS = ['1', '2', '3', '4'];

// TODO: getApplicantList API 응답으로 교체 (백엔드 연동 후). 현재는 시안 재현용 목업.
const INITIAL_APPLICANTS = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: '홍길동',
  studentId: '20771234',
  grade: '1',
  age: '20',
  phone: '010-7777-1234',
}));

// 입력 필드 정의. 미입력 상태로 제출하면 각 error 문구가 해당 필드 아래에 표시된다.
const FIELDS = [
  {
    name: 'name',
    label: '이름',
    placeholder: '이름을 입력해 주세요.',
    error: '이름을 입력해주세요',
  },
  {
    name: 'grade',
    label: '학년',
    placeholder: '학년을 선택해주세요.',
    options: GRADE_OPTIONS,
    error: '학년을 선택해주세요',
  },
  {
    name: 'studentId',
    label: '학번',
    placeholder: '학번을 입력해 주세요.',
    error: '학번을 입력해주세요',
  },
  {
    name: 'age',
    label: '나이',
    placeholder: '나이를 입력해 주세요.',
    error: '나이를 입력해주세요',
  },
  {
    name: 'phone',
    label: '전화번호',
    placeholder: '전화번호를 입력해 주세요.',
    error: '전화번호를 입력해주세요',
  },
];

// 빈 폼 기본값. 입력 전에는 빈 문자열로 두어 placeholder를 노출한다.
const EMPTY_FORM = {
  name: '',
  grade: '',
  studentId: '',
  age: '',
  phone: '',
};

/**
 * 부원 등록/수정 공통 폼.
 * 레이아웃은 동일하며 제목/부제/제출 버튼/완료 모달 문구만 props로 달라진다.
 * @param {Object} props
 * @param {string} props.title - 카드 제목
 * @param {string} props.subtitle - 카드 부제(안내 문구)
 * @param {string} props.submitLabel - 제출 버튼 라벨 (등록하기/저장하기)
 * @param {string} props.successMessage - 완료 모달 문구
 * @param {Object} [props.initialForm=EMPTY_FORM] - 초기 폼 값 (수정 시 기존 부원 정보)
 * @param {Function} props.onComplete - 완료 모달 '확인' 시 호출 (보통 명부 목록으로 이동)
 */
function MemberForm({
  title,
  subtitle,
  submitLabel,
  successMessage,
  initialForm = EMPTY_FORM,
  onComplete,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  // 필드별 onChange 핸들러를 생성한다. FormField는 이벤트가 아닌 '값'을 전달한다.
  // 값을 입력하면 해당 필드의 미입력 오류는 즉시 해제한다.
  const handleChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // 신청 부원 목록 모달을 연다.
  const handleImport = () => setIsImportOpen(true);

  // 목록에서 부원 '선택' 시 해당 정보를 폼에 채우고 오류를 지운 뒤 모달을 닫는다.
  const handleSelectApplicant = (applicant) => {
    setForm({
      name: applicant.name,
      grade: applicant.grade,
      studentId: applicant.studentId,
      age: applicant.age,
      phone: applicant.phone,
    });
    setErrors({});
    setIsImportOpen(false);
  };

  // 제출: 미입력 필드가 있으면 각 오류 문구를 표시하고 중단, 모두 채워졌으면 완료 모달을 연다.
  // TODO: 부원 등록/수정 API 연동 (백엔드 연동 후).
  const handleSubmit = () => {
    const nextErrors = {};
    FIELDS.forEach((field) => {
      if (!form[field.name].trim()) nextErrors[field.name] = field.error;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setIsSuccessOpen(true);
  };

  return (
    <>
      <main className="min-h-screen bg-brand-soft px-8 py-10">
        <div className="mx-auto max-w-[1253px] rounded-card bg-white px-[120px] py-16 shadow-md">
          {/* 카드 헤더: 제목/안내 문구(좌) + 신청 정보 가져오기 버튼(우).
            버튼 하단을 안내 문구 줄에 맞춘다(시안 기준 items-end). */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-[40px] font-bold text-ink">{title}</h1>
              <p className="text-2xl text-ink-sub">{subtitle}</p>
            </div>

            <button
              type="button"
              onClick={handleImport}
              className="rounded-md border border-solid border-brand bg-brand-soft px-4 py-3 text-xl text-brand"
            >
              신청 정보 가져오기
            </button>
          </div>

          {/* 입력 폼: 라벨+입력 묶음을 가운데로 정렬해 세로로 쌓는다 */}
          <div className="mt-24 flex flex-col items-center gap-3">
            {FIELDS.map((field) => (
              <FormField
                key={field.name}
                label={field.label}
                required
                placeholder={field.placeholder}
                options={field.options}
                value={form[field.name]}
                onChange={handleChange(field.name)}
                error={errors[field.name]}
              />
            ))}
          </div>

          {/* 제출 버튼: 폼 하단 가운데 정렬 */}
          <div className="mt-20 flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-button bg-brand px-[99px] py-5 text-2xl font-bold text-white shadow-md"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </main>

      {isImportOpen && (
        <ApplicantListModal
          applicants={INITIAL_APPLICANTS}
          onSelect={handleSelectApplicant}
          onClose={() => setIsImportOpen(false)}
        />
      )}
      {isSuccessOpen && <SuccessModal message={successMessage} onConfirm={onComplete} />}
    </>
  );
}

export default MemberForm;
