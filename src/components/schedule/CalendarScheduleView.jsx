import { MONTH_OPTIONS, WEEKDAYS } from '@/constants/schedule';
import { formatScheduleDate } from '@/utils/schedule';

import ScheduleDropdown from './ScheduleDropdown';
import ScheduleTabs from './ScheduleTabs';

function CalendarScheduleView({
  year,
  month,
  yearOptions,
  viewMode,
  onViewModeChange,
  calendarDates,
  todayKey,
  scheduleDateKeys,
  visibleSchedules,
  isMonthDropdownOpen,
  isYearDropdownOpen,
  onToggleMonth,
  onToggleYear,
  onSelectMonth,
  onSelectYear,
  monthListRef,
  monthTrackRef,
  monthThumbRef,
  yearListRef,
  yearTrackRef,
  yearThumbRef,
  onMonthScroll,
  onYearScroll,
}) {
  return (
    <div className="grid grid-cols-1 items-start gap-y-8 px-[18px] py-11 sm:px-11 sm:py-[72px] xl:grid-cols-[505px_24px_1fr] xl:gap-x-6 xl:gap-y-0 xl:px-[60px] xl:py-0 xl:pt-[135px]">
      <div className="h-auto w-full max-w-[505px] xl:h-[412px]">
        <div className="mb-[14px] flex items-center gap-2" aria-label="달력 기간 선택">
          <ScheduleDropdown
            label="월 선택"
            value={`${month + 1}월`}
            isOpen={isMonthDropdownOpen}
            onToggle={onToggleMonth}
            options={MONTH_OPTIONS}
            onSelect={onSelectMonth}
            listRef={monthListRef}
            trackRef={monthTrackRef}
            thumbRef={monthThumbRef}
            onScroll={onMonthScroll}
            buttonWidthClass="w-[58px]"
            itemHeightClass="h-[33px] leading-[33px]"
            itemTextClass="text-[20px]"
            itemLabel={(monthOption) => `${monthOption + 1}월`}
          />

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

          <ScheduleTabs viewMode={viewMode} onChange={onViewModeChange} className="ml-auto" />
        </div>

        <div
          className="grid h-auto grid-cols-7 items-center justify-items-center gap-y-[18px] sm:gap-y-[23px] xl:h-[364px] xl:grid-rows-[34px_repeat(5,minmax(0,1fr))] xl:gap-y-0"
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

          {calendarDates.map((date) => (
            <button
              key={date.key}
              type="button"
              className={[
                'relative grid h-[31px] w-[34px] place-items-center text-[18px] font-normal leading-none text-ink sm:w-10 xl:h-[52px] xl:w-[52px]',
                date.isCurrentMonth ? '' : 'text-[#9F9F9F]',
                date.key === todayKey
                  ? 'h-[38px] w-[39px] rounded-[11px] bg-brand font-bold text-white shadow-schedule-day xl:h-[58px] xl:w-[58px]'
                  : '',
                scheduleDateKeys.has(date.key) && date.key !== todayKey
                  ? 'after:absolute after:left-1/2 after:top-[33px] after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:rounded-full after:bg-brand after:content-[""] xl:after:top-[54px]'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span>{date.day}</span>
            </button>
          ))}
        </div>
      </div>

      <div />

      <div className="min-w-0 pt-[64px]">
        <ol className="flex min-w-0 list-none flex-col gap-[26px] p-0" aria-label="주요 일정">
          {visibleSchedules.map((schedule) => (
            <li
              key={`${schedule.startDate}-${schedule.endDate}`}
              className="grid min-w-0 grid-cols-1 items-center gap-x-2 gap-y-1.5 text-[16px] leading-[1.3] sm:grid-cols-[170px_minmax(0,1fr)]"
            >
              <time className="font-bold text-ink">
                {formatScheduleDate(schedule.startDate)} ~ {formatScheduleDate(schedule.endDate)}
              </time>
              <span className="min-w-0 truncate font-normal text-[#666666]">{schedule.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default CalendarScheduleView;
