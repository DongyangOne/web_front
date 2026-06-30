import { formatAllScheduleDate } from '@/utils/schedule';
import tailwindConfig from '../../../tailwind.config';

import ScheduleDropdown from './ScheduleDropdown';
import ScheduleTabs from './ScheduleTabs';

const colors = tailwindConfig.theme.extend.colors;

const SCHEDULE_MARK_COLORS = [
  colors['schedule-mark-red'],
  colors.brand,
  colors['schedule-mark-orange'],
  colors['schedule-mark-green'],
  colors['schedule-mark-blue'],
  colors['schedule-mark-violet'],
  colors['schedule-mark-purple'],
  colors['schedule-mark-pink'],
];

function AllScheduleView({ yearDropdown, view, scheduleMonthEntries, scheduleScroll }) {
  const { year, yearOptions } = yearDropdown;
  const { viewMode, onViewModeChange } = view;
  const {
    listRef: allScheduleListRef,
    trackRef: allScheduleTrackRef,
    thumbRef: allScheduleThumbRef,
    onScroll: onAllScheduleScroll,
  } = scheduleScroll;
  return (
    <div className="pb-8 pl-[18px] pr-0 pt-[50px] sm:pl-9 xl:pl-[60px]">
      <div className="flex w-full items-center gap-2 pr-[18px] sm:pr-9 xl:pr-[60px]">
        <ScheduleDropdown
          config={{
            label: '일정이 없습니다.',
            options: yearOptions.slice().reverse(),
            itemLabel: (yearOption) => yearOption,
          }}
          state={{ value: year, isOpen: yearDropdown.isOpen }}
          handlers={yearDropdown.handlers}
          scrollRefs={yearDropdown.scrollRefs}
          classNames={{
            buttonWidthClass: 'w-[70px]',
            buttonPaddingClass: 'pr-4',
            itemHeightClass: 'h-[73px] leading-[73px]',
            itemTextClass: 'text-[18px]',
          }}
        />

        <ScheduleTabs viewMode={viewMode} onChange={onViewModeChange} className="ml-auto" />
      </div>

      <div className="relative -ml-[18px] mt-[14px] sm:-ml-9 xl:-ml-[60px] xl:w-[1253px]">
        <div
          ref={allScheduleListRef}
          className="schedule-native-scrollbar-hidden max-h-[560px] overflow-y-auto"
          onScroll={onAllScheduleScroll}
        >
          {scheduleMonthEntries.length === 0 ? (
            <div className="grid min-h-[520px] place-items-center text-[16px] font-bold text-ink-sub">
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
                    isLastMonth ? '' : 'border-b border-solid border-schedule-divider',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <div className="w-full pl-[18px] sm:pl-9 xl:w-[1044px] xl:pl-[60px]">
                    <h3 className="mb-3 text-[22px] font-extrabold text-brand">{monthLabel}</h3>
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
                              isLastSchedule ? '' : 'border-b border-solid border-schedule-divider',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                          >
                            <span
                              className="block h-[9px] w-[3px] shrink-0 rounded-[1px]"
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
          className="absolute bottom-[10px] right-0 top-[-10px] w-3 rounded-full bg-schedule-scroll-track"
          aria-hidden="true"
        >
          <div
            ref={allScheduleThumbRef}
            className="absolute left-0 h-9 w-3 rounded-full bg-schedule-scroll-thumb opacity-100 transition-opacity duration-200"
          />
        </div>
      </div>
    </div>
  );
}

export default AllScheduleView;
