import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { submitRecruit } from '@/apis/recruit';
import { ROUTES } from '@/constants/routes';
import {
  formatPhoneNumber,
  getRecruitFormValidationErrors,
  INITIAL_RECRUIT_FORM,
  PRIVACY_AGREEMENT_ERROR,
} from '@/utils/recruitFormUtils';

export function useRecruitForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_RECRUIT_FORM);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === 'phoneNumber'
        ? formatPhoneNumber(value)
        : name === 'grade'
          ? value === ''
            ? ''
            : Number(value)
          : name === 'privacyConsent'
            ? value === 'true'
            : value;

    setForm((prevForm) => ({ ...prevForm, [name]: nextValue }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: name === 'privacyConsent' && value === 'false' ? PRIVACY_AGREEMENT_ERROR : '',
    }));
  };

  const handleSubmit = () => {
    if (isSubmitting) return;

    const nextErrors = getRecruitFormValidationErrors(form);
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

  const closeConfirm = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirmSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await submitRecruit(form);
      setIsConfirmOpen(false);
      navigate(ROUTES.RECRUIT_COMPLETE);
    } catch (error) {
      setIsConfirmOpen(false);
      setSubmitError(
        error.response?.data?.message || '모집 신청 제출에 실패했습니다. 잠시 후 다시 시도해 주세요.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    submitError,
    errors,
    hasSubmitted,
    isConfirmOpen,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleConfirmSubmit,
    closeConfirm,
  };
}
