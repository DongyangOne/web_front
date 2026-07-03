/**
 * 부원 등록/수정 폼 입력값 정규화 및 검증 유틸.
 * 백엔드(MemberRegisterRequestDto/MemberUpdateRequestDto)와 동일한 규칙을 적용해
 * 서버로 잘못된 값이 전송되어 400이 반복되는 것을 막는다.
 */

// 전화번호를 010-XXXX-XXXX 형식으로 정규화한다.
// DB에 대시 없이 저장된 값(예: 01012345678)도 화면/전송 시 형식을 맞춘다.
export function formatPhoneNumber(value) {
  const numbers = String(value ?? '')
    .replace(/\D/g, '')
    .slice(0, 11);
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
}

// 학번은 숫자만, 최대 8자리로 제한한다.
export function formatStudentId(value) {
  return String(value ?? '')
    .replace(/\D/g, '')
    .slice(0, 8);
}

// 나이는 숫자만, 최대 3자리로 제한한다.
export function formatAge(value) {
  return String(value ?? '')
    .replace(/\D/g, '')
    .slice(0, 3);
}

// 필드별 검증 규칙. 메시지는 사용자에게 그대로 노출된다.
export const MEMBER_FORM_VALIDATORS = [
  {
    key: 'name',
    validate: (value) => value.trim().length >= 2 && value.trim().length <= 20,
    message: '이름을 입력해주세요',
  },
  {
    key: 'grade',
    validate: (value) => /^[1-4]$/.test(value),
    message: '학년을 선택해주세요',
  },
  {
    key: 'studentId',
    validate: (value) => /^\d{8}$/.test(value),
    message: '학번은 8자리의 숫자만 입력 가능합니다.',
  },
  {
    key: 'age',
    validate: (value) => /^\d+$/.test(value) && Number(value) >= 18 && Number(value) <= 100,
    message: '나이가 올바르지 않습니다.',
  },
  {
    key: 'phone',
    validate: (value) => /^010-\d{3,4}-\d{4}$/.test(value),
    message: '전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)',
  },
];

/**
 * 폼 값을 검증해 { 필드명: 오류 메시지 } 형태로 반환한다.
 * 반환 객체가 비어 있으면 유효한 입력이다.
 * @param {Object} form - { name, grade, studentId, age, phone }
 * @returns {Object}
 */
export function getMemberFormErrors(form) {
  return MEMBER_FORM_VALIDATORS.reduce((errors, { key, validate, message }) => {
    if (!validate(String(form[key] ?? ''))) {
      errors[key] = message;
    }
    return errors;
  }, {});
}
