export const INITIAL_RECRUIT_FORM = {
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

export const PRIVACY_AGREEMENT_ERROR = '동의하지 않을 시 불이익이 있을 수 있습니다.';

export const fieldValidators = [
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
    message: PRIVACY_AGREEMENT_ERROR,
  },
];

export function formatPhoneNumber(value) {
  const numbers = value.replace(/\D/g, '').slice(0, 11);
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
}

export function getRecruitFormValidationErrors(form) {
  return fieldValidators.reduce((nextErrors, { key, validate, message }) => {
    const value = String(form[key] || '').trim();
    if (!validate(value)) {
      nextErrors[key] = message;
    }
    return nextErrors;
  }, {});
}
