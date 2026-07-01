const TABS = [
  { value: 'calendar', label: '캘린더' },
  { value: 'all', label: '전체일정' },
];

function ScheduleTabs({ viewMode, onChange, className }) {
  return (
    <div className={`flex gap-[14px] ${className ?? ''}`}>
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={[
            'whitespace-nowrap rounded-[6px] border border-brand px-4 py-2 text-[13px] transition-colors',
            viewMode === tab.value ? 'bg-brand text-white' : 'bg-section text-ink',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default ScheduleTabs;
