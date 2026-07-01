function ScheduleDropdown({ config, state, handlers, scrollRefs, classNames }) {
  const { label, options, itemLabel } = config;
  const { value, isOpen } = state;
  const { onToggle, onSelect, onScroll } = handlers;
  const { listRef, trackRef, thumbRef } = scrollRefs;
  const {
    buttonWidthClass,
    itemHeightClass,
    itemTextClass,
    panelWidthClass,
    scrollTrackRightClass,
  } = classNames;

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        onClick={onToggle}
        className={`${buttonWidthClass} flex h-[33px] items-center justify-between rounded-[6px] border border-line bg-white px-2 text-[18px] text-ink`}
      >
        <span>{value}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
          <path
            d={isOpen ? 'M1 5L5 1L9 5' : 'M1 1L5 5L9 1'}
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`${panelWidthClass} absolute left-0 top-full z-20 mt-1 h-[404px] overflow-hidden rounded-[20px] border border-[#F1F3F7] bg-white shadow-[0px_13px_12.5px_0px_rgba(132,140,166,0.13)]`}
        >
          <div className="relative h-full p-[23px]">
            <ul
              ref={listRef}
              onScroll={onScroll}
              className="h-full w-[376px] divide-y divide-[#F1F3F7] overflow-y-auto"
              style={{ scrollbarWidth: 'none' }}
              role="listbox"
              aria-label={label}
            >
              {options.map((option) => {
                const isSelected = itemLabel(option) === value;
                return (
                  <li key={option} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => onSelect(option)}
                      className={[
                        itemHeightClass,
                        itemTextClass,
                        'flex w-full items-center px-[12px] text-left transition-colors',
                        isSelected ? 'bg-brand text-white' : 'text-ink-sub hover:bg-brand-soft',
                      ].join(' ')}
                    >
                      {itemLabel(option)}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div
              ref={trackRef}
              className={`${scrollTrackRightClass} pointer-events-none absolute top-[23px] bottom-[23px] w-[12px] rounded-full bg-[#E4E4E4]`}
            >
              <div ref={thumbRef} className="absolute hidden w-[12px] rounded-full bg-[#8A8A8A]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduleDropdown;
