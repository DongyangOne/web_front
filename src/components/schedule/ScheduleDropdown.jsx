const ACTIVE_BORDER_STYLE = {
  borderColor: '#FF6B00',
  borderStyle: 'solid',
  borderWidth: '1px',
};

const INACTIVE_BORDER_STYLE = {
  borderColor: 'transparent',
  borderStyle: 'solid',
  borderWidth: '1px',
};

function ScheduleDropdown({
  label,
  value,
  isOpen,
  onToggle,
  options,
  onSelect,
  listRef,
  trackRef,
  thumbRef,
  onScroll,
  buttonWidthClass,
  itemHeightClass,
  itemTextClass,
  itemLabel,
}) {
  return (
    <div className="relative">
      <button
        type="button"
        className={[
          `inline-flex h-[34px] ${buttonWidthClass} items-center justify-between rounded-[7px] border px-2 text-[13px] font-medium leading-none text-ink`,
        ]
          .filter(Boolean)
          .join(' ')}
        style={isOpen ? ACTIVE_BORDER_STYLE : INACTIVE_BORDER_STYLE}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label}
      >
        {value}
        <span
          className="h-[7px] w-[7px] translate-y-[-2px] rotate-45 border-b border-r border-current"
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-[36px] z-20 h-[404px] w-[calc(100vw-36px)] max-w-[424px] rounded-[14px] border border-line bg-white shadow-[0_14px_30px_rgba(0,0,0,0.10)] sm:w-[424px]"
          style={{ borderStyle: 'solid', borderWidth: '1px' }}
        >
          <ul
            ref={listRef}
            className="schedule-native-scrollbar-hidden absolute bottom-[26px] left-[22px] right-[22px] top-[22px] overflow-y-auto"
            onScroll={onScroll}
            role="listbox"
            aria-label={`${label} 목록`}
          >
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className={[
                    `${itemHeightClass} w-full border border-solid border-line px-3 text-left ${itemTextClass}`,
                    option === value || itemLabel(option) === value
                      ? 'bg-brand font-medium text-white'
                      : 'text-ink-sub hover:bg-brand-soft',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{ borderStyle: 'solid', borderWidth: '1px' }}
                  onClick={() => onSelect(option)}
                  role="option"
                  aria-selected={option === value || itemLabel(option) === value}
                >
                  {itemLabel(option)}
                </button>
              </li>
            ))}
          </ul>
          <div
            ref={trackRef}
            className="absolute bottom-[26px] right-3 top-[22px] w-3 rounded-full bg-[#F0F0F0]"
            aria-hidden="true"
          >
            <div
              ref={thumbRef}
              className="absolute left-0 w-3 rounded-full bg-[#888888] transition-opacity duration-200"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduleDropdown;
