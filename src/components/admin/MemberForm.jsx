import { useEffect, useState } from 'react';

import { getApplicantList, getApplicantRegistrationForm } from '@/apis/applicant';
import { APPLICANT_PAGE_SIZE } from '@/constants/member';
import {
  formatAge,
  formatPhoneNumber,
  formatStudentId,
  getMemberFormErrors,
} from '@/utils/memberFormUtils';
import FormField from '@/components/admin/FormField';
import SuccessModal from '@/components/admin/SuccessModal';
import ApplicantListModal from '@/components/admin/ApplicantListModal';

// 학년 선택지 (시안 드롭다운 기준: 선택/1/2/3/4). '선택'(초기화)은 FormField가 직접 렌더한다.
const GRADE_OPTIONS = ['1', '2', '3', '4'];

// 입력 필드 정의. 렌더 메타데이터만 담고, 검증은 memberFormUtils에서 일괄 처리한다.
const FIELDS = [
  { name: 'name', label: '이름', placeholder: '이름을 입력해 주세요.' },
  { name: 'grade', label: '학년', placeholder: '학년을 선택해주세요.', options: GRADE_OPTIONS },
  { name: 'studentId', label: '학번', placeholder: '학번을 입력해 주세요.' },
  { name: 'age', label: '나이', placeholder: '나이를 입력해 주세요.' },
  { name: 'phone', label: '전화번호', placeholder: '전화번호를 입력해 주세요.' },
];

// 입력 즉시 형식을 맞추는 필드별 정규화 함수. 없으면 원본 값을 그대로 쓴다.
const FIELD_FORMATTERS = {
  studentId: formatStudentId,
  age: formatAge,
  phone: formatPhoneNumber,
};

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
 * 레이아웃은 동일하며 화면 문구(texts)와 제출/완료 동작만 props로 달라진다.
 * 실제 등록·수정 API 호출은 onSubmit으로 주입받아 처리한다.
 * @param {Object} props
 * @param {Object} props.texts - 화면 문구 { title, subtitle, submitLabel, successMessage }
 * @param {Object} [props.initialForm=EMPTY_FORM] - 초기 폼 값 (수정 시 기존 부원 정보)
 * @param {Function} props.onSubmit - 제출 시 호출. 서버 요청 payload를 받아 Promise를 반환한다.
 * @param {Function} props.onComplete - 완료 모달 '확인' 시 호출 (보통 명부 목록으로 이동)
 */
function MemberForm({ texts, initialForm = EMPTY_FORM, onSubmit, onComplete }) {
  const { title, subtitle, submitLabel, successMessage } = texts;

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [applicants, setApplicants] = useState([]);

  // 신청 정보 가져오기 모달이 열릴 때 신청 부원 목록을 조회한다.
  useEffect(() => {
    if (!isImportOpen) return undefined;

    let ignore = false;

    const fetchApplicants = async () => {
      try {
        const paging = await getApplicantList({ page: 0, size: APPLICANT_PAGE_SIZE });

        if (!ignore) {
          setApplicants(paging?.content ?? []);
        }
      } catch (error) {
        console.error('[MemberForm] 신청 부원 목록 조회 실패', error);

        if (!ignore) {
          setApplicants([]);
        }
      }
    };

    fetchApplicants();

    return () => {
      ignore = true;
    };
  }, [isImportOpen]);

  // 필드별 onChange 핸들러를 생성한다. FormField는 이벤트가 아닌 '값'을 전달한다.
  // 학번/나이/전화번호는 입력 즉시 형식을 정규화하고, 해당 필드의 오류는 즉시 해제한다.
  const handleChange = (field) => (value) => {
    const format = FIELD_FORMATTERS[field];
    const nextValue = format ? format(value) : value;

    setForm((prev) => ({ ...prev, [field]: nextValue }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // 신청 부원 목록 모달을 연다.
  const handleImport = () => setIsImportOpen(true);

  // 목록에서 부원 '선택' 시 등록 폼 정보를 조회해 폼을 채우고 모달을 닫는다.
  const handleSelectApplicant = async (applicant) => {
    try {
      const detail = await getApplicantRegistrationForm(applicant.applicantId);

      setForm({
        name: detail.name ?? '',
        grade: String(detail.grade ?? ''),
        studentId: formatStudentId(detail.studentId ?? ''),
        age: formatAge(detail.age ?? ''),
        phone: formatPhoneNumber(detail.phoneNumber ?? ''),
      });
      setErrors({});
      setIsImportOpen(false);
    } catch (error) {
      console.error('[MemberForm] 신청 부원 정보 조회 실패', error);
      setIsImportOpen(false);
      setSubmitError('신청 부원 정보를 불러오지 못했습니다.');
    }
  };

  // 제출: 형식 검증에 걸리면 각 오류를 표시하고 중단, 통과하면 API를 호출한다.
  const handleSubmit = async () => {
    if (isSubmitting) return;

    const nextErrors = getMemberFormErrors(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await onSubmit({
        name: form.name.trim(),
        grade: Number(form.grade),
        studentId: form.studentId.trim(),
        age: Number(form.age),
        phoneNum: form.phone.trim(),
      });
      setIsSuccessOpen(true);
    } catch (error) {
      console.error('[MemberForm] 부원 저장 실패', error);
      setSubmitError(
        error.response?.data?.message ||
          '저장에 실패했습니다. 입력값을 확인 후 다시 시도해주세요.'
      );
    } finally {
      setIsSubmitting(false);
    }
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

          {/* 제출 버튼: 폼 하단 가운데 정렬. 서버 오류는 버튼 위에 표시한다. */}
          <div className="mt-20 flex flex-col items-center gap-4">
            {submitError && <p className="text-xl text-error">{submitError}</p>}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded-button bg-brand px-[99px] py-5 text-2xl font-bold text-white shadow-md disabled:opacity-50"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </main>

      {isImportOpen && (
        <ApplicantListModal
          applicants={applicants}
          onSelect={handleSelectApplicant}
          onClose={() => setIsImportOpen(false)}
        />
      )}
      {isSuccessOpen && <SuccessModal message={successMessage} onConfirm={onComplete} />}
    </>
  );
}

export default MemberForm;
