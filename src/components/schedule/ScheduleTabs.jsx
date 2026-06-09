function ScheduleTabs({ viewMode, onChange, className = '' }) {
  return (
    <div
      className={`flex justify-start gap-2 ${className}`}
      role="tablist"
      aria-label="일정 보기 방식"
    >
      <button
        type="button"
        className={[
          'h-8 min-w-[77px] rounded-[6px] px-[18px] text-center text-[14px] font-normal leading-[28px]',
          viewMode === 'calendar'
            ? '!border-0 !bg-brand text-white'
            : '!border-[1px] !border-solid !border-brand !bg-section text-black',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => onChange('calendar')}
        role="tab"
        aria-selected={viewMode === 'calendar'}
      >
        캘린더
      </button>
      <button
        type="button"
        className={[
          'h-8 min-w-[77px] rounded-[6px] px-[18px] text-center text-[14px] font-normal leading-[28px]',
          viewMode === 'all'
            ? '!border-0 !bg-brand text-white'
            : '!border-[1px] !border-solid !border-brand !bg-section text-black',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => onChange('all')}
        role="tab"
        aria-selected={viewMode === 'all'}
      >
        전체일정
      </button>
    </div>
  );
}

export default ScheduleTabs;
