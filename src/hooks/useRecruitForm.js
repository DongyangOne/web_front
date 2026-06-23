import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    let nextValue = value;

    if (name === 'phone') {
      nextValue = formatPhoneNumber(value);
    }

    if (name === 'name') {
      nextValue = value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, '').slice(0, 8);
    }

    setForm((prevForm) => ({ ...prevForm, [name]: nextValue }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: name === 'privacyAgreement' && value === 'disagree' ? PRIVACY_AGREEMENT_ERROR : '',
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

  const handleConfirmSubmit = () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');
    window.setTimeout(() => {
      setIsConfirmOpen(false);
      setIsSubmitting(false);
      navigate(ROUTES.RECRUIT_COMPLETE);
    }, 0);
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
