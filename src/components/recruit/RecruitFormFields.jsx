import { useEffect, useState } from 'react';

import basicInfoIcon from '@/assets/images/main.svg';
import arrowIcon from '@/assets/images/arrow.svg';
import checkBoxOffIcon from '@/assets/images/checkBox_n.svg';
import checkBoxOnIcon from '@/assets/images/checkBox_y.svg';

export function InfoCard({ title, className = 'mt-5', headerClassName = '', children }) {
  return (
    <div
      className={`min-h-[660px] rounded-[50px] bg-white px-0 py-7 shadow-recruit-card ${className}`}
    >
      <div
        className={`ml-[10px] flex items-center gap-[10px] lg:ml-[30px] lg:mr-[159px] ${headerClassName}`}
      >
        <span className="flex shrink-0 items-center justify-center">
          <img src={basicInfoIcon} alt="" className="max-w-none translate-y-[1px]" />
        </span>
        <h2 className="text-[25px] font-bold text-ink">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function FormInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  maxLength,
  inputClassName = '',
  error = '',
}) {
  const isDateType = type === 'date';
  const [inputType, setInputType] = useState(isDateType && !value ? 'text' : type);

  useEffect(() => {
    if (!isDateType) return;
    setInputType(value ? 'date' : 'text');
  }, [isDateType, value]);

  const openPicker = (event) => {
    if (!isDateType) return;
    event.target.type = 'date';
    setInputType('date');

    try {
      event.target.showPicker();
    } catch {
      // showPicker is not available in every browser.
    }
  };

  return (
    <label className="grid gap-2 text-[14px] font-normal text-ink sm:grid-cols-[64px_1fr] sm:items-center sm:gap-x-[45px]">
      <span>
        {label}
        {required && <RequiredMark />}
      </span>
      <div className="relative">
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || `${label}을 입력해 주세요.`}
          maxLength={maxLength}
          onFocus={openPicker}
          onClick={openPicker}
          onBlur={(event) => {
            if (isDateType && !event.target.value) {
              setInputType('text');
            }
          }}
          className={`h-[46px] rounded-[6px] border border-field-border px-3 text-[14px] font-normal outline-none transition placeholder:text-gray-400 focus:border-brand ${
            isDateType ? 'date-input-without-icon' : ''
          } ${inputClassName}`}
        />
        {error && <FieldError message={error} />}
      </div>
    </label>
  );
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  error = '',
  inputClassName = '',
}) {
  return (
    <label className="grid gap-2 text-[14px] font-normal text-ink sm:grid-cols-[64px_1fr] sm:items-center sm:gap-x-[45px]">
      <span>
        {label}
        <RequiredMark />
      </span>
      <div className={`relative ${inputClassName}`}>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="h-[46px] w-full appearance-none rounded-[6px] border border-field-border bg-white px-3 pr-10 text-[14px] font-normal text-ink-sub outline-none transition focus:border-brand"
        >
          <option value="">학과를 선택해 주세요.</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <img
          src={arrowIcon}
          alt=""
          className="pointer-events-none absolute right-3 top-[19px] h-2 w-3"
        />
        {error && <FieldError message={error} />}
      </div>
    </label>
  );
}

export function SupportInput({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  fieldClassName = '',
  labelClassName = 'mb-[14px]',
  inputClassName = '',
  errorClassName = '',
  error = '',
}) {
  return (
    <div className={`relative w-full max-w-[617px] ${fieldClassName}`}>
      <p className={`text-[14px] font-normal text-ink ${labelClassName}`}>
        {label}
        {required && <RequiredMark />}
      </p>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `${label}을 입력해 주세요.`}
        className={`h-[46px] w-full rounded-[6px] border border-field-border px-3 text-[14px] font-normal outline-none transition placeholder:text-gray-400 focus:border-brand ${inputClassName}`}
      />
      {error && <FieldError className={errorClassName} message={error} />}
    </div>
  );
}

export function SupportTextarea({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  fieldClassName = '',
  labelClassName = 'mb-[14px]',
  errorClassName = '',
  error = '',
}) {
  return (
    <div className={`relative w-full max-w-[617px] ${fieldClassName}`}>
      <p className={`text-[14px] font-normal text-ink ${labelClassName}`}>
        {label}
        {required && <RequiredMark />}
      </p>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `${label}을 입력해 주세요.`}
        maxLength={500}
        className="min-h-[132px] w-full resize-none rounded-[6pxs] border border-field-border px-3 py-3 text-[14px] font-normal outline-none transition placeholder:text-gray-400 focus:border-brand"
      />
      {error && <FieldError className={errorClassName} message={error} />}
    </div>
  );
}

export function RadioOption({ label, value, checked, onChange, name = 'gender' }) {
  return (
    <label className="inline-flex min-w-fit items-center gap-[6px] whitespace-nowrap text-[14px] font-normal">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <img
        src={checked ? checkBoxOnIcon : checkBoxOffIcon}
        alt=""
        className="h-4 w-4 rounded-full peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand"
      />
      {label}
    </label>
  );
}

export function RequiredMark() {
  return <span className="text-error">*</span>;
}

export function FieldError({ message, className = '' }) {
  if (!message) return null;

  return (
    <p className={`absolute left-0 top-full mt-2 text-[14px] font-normal text-error ${className}`}>
      {message}
    </p>
  );
}
