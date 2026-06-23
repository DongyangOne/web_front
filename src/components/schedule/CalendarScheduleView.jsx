import { MONTH_OPTIONS, WEEKDAYS } from '@/constants/schedule';
import { formatScheduleDate } from '@/utils/schedule';

import ScheduleDropdown from './ScheduleDropdown';
import ScheduleTabs from './ScheduleTabs';

function CalendarScheduleView({ calendar, view, schedules, monthDropdown, yearDropdown }) {
  const { year, month, yearOptions, calendarDates, todayKey } = calendar;
  const { viewMode, onViewModeChange } = view;
  const { scheduleDateKeys, visibleSchedules } = schedules;

  return (
    <div className="grid grid-cols-1 items-start gap-y-8 px-[18px] py-11 sm:px-11 sm:py-[72px] xl:grid-cols-[505px_24px_1fr] xl:gap-x-6 xl:gap-y-0 xl:px-[60px] xl:py-0 xl:pt-[135px]">
      <div className="h-auto w-full max-w-[505px] xl:h-[412px]">
        <div className="mb-[14px] flex w-full items-center gap-2" aria-label="달력 기간 선택">
          <ScheduleDropdown
            config={{
              label: '월 선택',
              options: MONTH_OPTIONS,
              itemLabel: (monthOption) => `${monthOption + 1}월`,
            }}
            state={{ value: `${month + 1}월`, isOpen: monthDropdown.isOpen }}
            handlers={monthDropdown.handlers}
            scrollRefs={monthDropdown.scrollRefs}
            classNames={{
              buttonWidthClass: 'w-[58px]',
              itemHeightClass: 'h-[33px] leading-[33px]',
              itemTextClass: 'text-[20px]',
            }}
          />

          <ScheduleDropdown
            config={{
              label: '연도 선택',
              options: yearOptions.slice().reverse(),
              itemLabel: (yearOption) => yearOption,
            }}
            state={{ value: year, isOpen: yearDropdown.isOpen }}
            handlers={yearDropdown.handlers}
            scrollRefs={yearDropdown.scrollRefs}
            classNames={{
              buttonWidthClass: 'w-[70px]',
              itemHeightClass: 'h-[73px] leading-[73px]',
              itemTextClass: 'text-[18px]',
            }}
          />

          <ScheduleTabs viewMode={viewMode} onChange={onViewModeChange} className="ml-auto mr-8" />
        </div>

        <div
          className="grid h-auto grid-cols-7 items-center justify-items-center gap-y-[18px] sm:gap-y-[23px] xl:h-[364px] xl:grid-rows-[34px_repeat(6,minmax(0,1fr))] xl:gap-y-0"
          aria-label={`${year}년 ${month + 1}월 달력`}
        >
          {WEEKDAYS.map((weekday) => (
            <div
              key={weekday}
              className="h-6 w-[34px] text-center text-[18px] font-semibold leading-6 text-ink-sub sm:w-10 xl:h-[34px] xl:w-[52px] xl:leading-[34px]"
            >
              {weekday}
            </div>
          ))}

          {calendarDates.map((date) => {
            const hasSchedule =
              date.isCurrentMonth && scheduleDateKeys.has(date.key) && date.key !== todayKey;

            return (
              <button
                key={date.key}
                type="button"
                className={[
                  'relative grid h-[31px] w-[34px] place-items-center text-[18px] font-normal leading-none sm:w-10 xl:h-[40px] xl:w-[40px]',
                  date.key === todayKey
                    ? 'h-10 w-10 rounded-[11px] bg-brand font-bold text-white shadow-schedule-day xl:h-10 xl:w-10 shadow-schedule-day'
                    : '',
                  date.key !== todayKey && !date.isCurrentMonth ? 'text-schedule-inactive' : '',
                  date.key !== todayKey && date.isCurrentMonth ? 'text-ink' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {hasSchedule && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-[-10px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand"
                  />
                )}
                <span className="relative z-10">{date.day}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div />

      <div className="min-w-0 pt-[64px]">
        <ol className="flex min-w-0 list-none flex-col gap-[26px] p-0" aria-label="주요 일정">
          {visibleSchedules.map((schedule, index) => (
            <li
              key={`${schedule.startDate}-${schedule.endDate}-${schedule.title}-${index}`}
              className="grid min-w-0 grid-cols-1 items-center gap-x-5 gap-y-1.5 text-[16px] leading-[1.3] sm:grid-cols-[170px_minmax(0,1fr)]"
            >
              <time className="font-bold text-ink">
                {formatScheduleDate(schedule.startDate)} ~ {formatScheduleDate(schedule.endDate)}
              </time>
              <span className="min-w-0 truncate font-normal text-ink-sub">{schedule.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default CalendarScheduleView;
