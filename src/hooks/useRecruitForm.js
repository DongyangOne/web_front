import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { submitRecruit } from '@/apis/recruit';
import { ROUTES } from '@/constants/routes';
import {
  formatPhoneNumber,
  getRecruitFormValidationErrors,
  INITIAL_RECRUIT_FORM,
  PRIVACY_AGREEMENT_ERROR,
} from '@/utils/recruitFormUtils';

const FIELD_VALUE_FORMATTERS = {
  phoneNumber: formatPhoneNumber,
  grade: (value) => value.replace(/\D/g, ''),
  privacyConsent: (value) => value === 'true',
};

const DEFAULT_FIELD_VALUE_FORMATTER = (value) => value;

export function useRecruitForm() {
  const navigate = useNavigate();
  const isMountedRef = useRef(true);
  const [form, setForm] = useState(INITIAL_RECRUIT_FORM);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const formatValue = FIELD_VALUE_FORMATTERS[name] ?? DEFAULT_FIELD_VALUE_FORMATTER;
    const nextValue = formatValue(value);

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
      await submitRecruit({ ...form, grade: Number(form.grade) });
      if (!isMountedRef.current) return;

      setIsConfirmOpen(false);
      navigate(ROUTES.RECRUIT_COMPLETE);
    } catch (error) {
      if (!isMountedRef.current) return;

      setIsConfirmOpen(false);
      setSubmitError(
        error.response?.data?.message || '모집 신청 제출에 실패했습니다. 잠시 후 다시 시도해 주세요.'
      );
    } finally {
      if (isMountedRef.current) {
        setIsSubmitting(false);
      }
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
