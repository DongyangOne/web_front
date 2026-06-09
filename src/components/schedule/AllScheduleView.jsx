import { formatAllScheduleDate } from '@/utils/schedule';

import ScheduleDropdown from './ScheduleDropdown';
import ScheduleTabs from './ScheduleTabs';

const SCHEDULE_MARK_COLORS = [
  '#F04438',
  '#FF6B00',
  '#F79009',
  '#12B76A',
  '#2E90FA',
  '#7A5AF8',
  '#D444F1',
  '#F63D68',
];

function AllScheduleView({
  year,
  yearOptions,
  viewMode,
  onViewModeChange,
  scheduleMonthEntries,
  isYearDropdownOpen,
  onToggleYear,
  onSelectYear,
  yearListRef,
  yearTrackRef,
  yearThumbRef,
  onYearScroll,
  allScheduleListRef,
  allScheduleTrackRef,
  allScheduleThumbRef,
  onAllScheduleScroll,
}) {
  return (
    <div className="pb-8 pl-[18px] pr-0 pt-[50px] sm:pl-9 xl:pl-[60px]">
      <div className="flex items-center gap-2">
        <ScheduleDropdown
          label="연도 선택"
          value={year}
          isOpen={isYearDropdownOpen}
          onToggle={onToggleYear}
          options={yearOptions.slice().reverse()}
          onSelect={onSelectYear}
          listRef={yearListRef}
          trackRef={yearTrackRef}
          thumbRef={yearThumbRef}
          onScroll={onYearScroll}
          buttonWidthClass="w-[70px]"
          itemHeightClass="h-[73px] leading-[73px]"
          itemTextClass="text-[18px]"
          itemLabel={(yearOption) => yearOption}
        />

        <ScheduleTabs viewMode={viewMode} onChange={onViewModeChange} className="ml-[92px]" />
      </div>

      <div className="relative -ml-[18px] mt-[14px] sm:-ml-9 xl:-ml-[60px] xl:w-[1253px]">
        <div
          ref={allScheduleListRef}
          className="schedule-native-scrollbar-hidden max-h-[560px] overflow-y-auto"
          onScroll={onAllScheduleScroll}
        >
          {scheduleMonthEntries.length === 0 ? (
            <div className="grid min-h-[520px] place-items-center text-[16px] font-bold text-[#666666]">
              일정이 없습니다.
            </div>
          ) : (
            scheduleMonthEntries.map(([monthLabel, monthSchedules], monthIndex) => {
              const isLastMonth = monthIndex === scheduleMonthEntries.length - 1;

              return (
                <section
                  key={monthLabel}
                  className={[
                    'w-full py-4',
                    isLastMonth ? '' : 'border-b border-solid border-[#FFE3D1]',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <div className="w-full pl-[18px] sm:pl-9 xl:w-[1044px] xl:pl-[60px]">
                    <h3 className="mb-3 text-[22px] font-extrabold text-[#FF6B00]">{monthLabel}</h3>
                    <ol className="flex flex-col">
                      {monthSchedules.map((schedule, scheduleIndex) => {
                        const isLastSchedule = scheduleIndex === monthSchedules.length - 1;
                        const markerColor =
                          SCHEDULE_MARK_COLORS[
                            (monthIndex * monthSchedules.length + scheduleIndex) %
                              SCHEDULE_MARK_COLORS.length
                          ];

                        return (
                          <li
                            key={`${schedule.startDate}-${schedule.endDate}-${schedule.title}`}
                            className={[
                              'grid h-[35.6px] grid-cols-[3px_210px_minmax(0,1fr)] items-center gap-x-3 text-[15px] font-bold text-ink',
                              isLastSchedule ? '' : 'border-b border-solid border-[#FFE3D1]',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                          >
                            <span
                              className="h-[9px] w-[3px]"
                              style={{ backgroundColor: markerColor }}
                              aria-hidden="true"
                            />
                            <time className="whitespace-nowrap">
                              {formatAllScheduleDate(schedule)}
                            </time>
                            <span className="truncate text-right">{schedule.title}</span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </section>
              );
            })
          )}
        </div>
        <div
          ref={allScheduleTrackRef}
          className="absolute bottom-0 right-0 top-0 w-3 rounded-full bg-[#F0F0F0]"
          aria-hidden="true"
        >
          <div
            ref={allScheduleThumbRef}
            className="absolute left-0 w-3 rounded-full bg-[#888888] transition-opacity duration-200"
          />
        </div>
      </div>
    </div>
  );
}

export default AllScheduleView;
