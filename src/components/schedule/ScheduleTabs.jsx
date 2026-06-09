const BORDER_STYLE = { borderColor: '#FF6B00', borderStyle: 'solid', borderWidth: '1px' };

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
          'h-8 min-w-[77px] rounded-[7px] border px-[18px] text-center text-xs font-bold leading-[30px]',
          viewMode === 'calendar' ? 'bg-[#FF6B00] text-white' : 'bg-white text-[#FF6B00]',
        ]
          .filter(Boolean)
          .join(' ')}
        style={BORDER_STYLE}
        onClick={() => onChange('calendar')}
        role="tab"
        aria-selected={viewMode === 'calendar'}
      >
        캘린더
      </button>
      <button
        type="button"
        className={[
          'h-8 min-w-[77px] rounded-[7px] border px-[18px] text-center text-xs font-bold leading-[30px]',
          viewMode === 'all' ? 'bg-[#FF6B00] text-white' : 'bg-white text-[#FF6B00]',
        ]
          .filter(Boolean)
          .join(' ')}
        style={BORDER_STYLE}
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
