function ScheduleCheckbox({ checked, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[3.5px] border transition-colors ${checked ? 'border-brand bg-brand' : 'border-line bg-white'}`}
      aria-label={label}
      aria-pressed={checked}
    >
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path
          d="M1 4L3.5 6.5L9 1"
          stroke={checked ? '#FFFFFF' : '#C4C4C4'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default ScheduleCheckbox;
