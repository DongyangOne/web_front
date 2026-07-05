import { useState } from 'react';
import ScheduleCheckbox from '@/components/schedule/ScheduleCheckbox';
import ScheduleDropdown from '@/components/schedule/ScheduleDropdown';
import ScheduleTabs from '@/components/schedule/ScheduleTabs';
import { VIEW_MODE } from '@/constants/schedule';
import { formatScheduleDate } from '@/utils/schedule';

const ACCENT_COLORS = ['#FFBA88', '#D95D03', '#F96B03', '#953E00', '#6C3E1E'];

function getScheduleKey(schedule) {
  return schedule.id ?? `${schedule.startDate}-${schedule.endDate}-${schedule.title}`;
}

function AllScheduleView({
  yearDropdown,
  view,
  scheduleMonthEntries,
  scheduleScroll,
  onDeleteSchedule,
}) {
  const { year, yearOptions, isOpen: isYearDropdownOpen, handlers, scrollRefs } = yearDropdown;
  const { viewMode, onViewModeChange } = view;
  const { listRef, trackRef, thumbRef, onScroll } = scheduleScroll;

  const [selectedKeys, setSelectedKeys] = useState(new Set());

  const handleToggleSelect = (key) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleAddClick = () => {
    onViewModeChange(VIEW_MODE.CALENDAR);
  };

  const handleDeleteClick = () => {
    const toDelete = scheduleMonthEntries
      .flatMap(([, monthSchedules]) => monthSchedules)
      .filter((schedule) => selectedKeys.has(getScheduleKey(schedule)));
    onDeleteSchedule?.(toDelete);
    setSelectedKeys(new Set());
  };

  return (
    <div className="flex h-full flex-col px-[18px] py-11 sm:px-11 xl:px-[60px] xl:py-0 xl:pt-[52px]">
      <div className="mb-[14px] flex w-full items-center gap-4">
        <ScheduleDropdown
          config={{
            label: '연도 선택',
            options: yearOptions.slice().reverse(),
            itemLabel: (option) => option,
          }}
          state={{ value: year, isOpen: isYearDropdownOpen }}
          handlers={handlers}
          scrollRefs={scrollRefs}
          classNames={{
            buttonWidthClass: 'w-[70px]',
            itemHeightClass: 'h-[73px]',
            itemTextClass: 'text-[20px]',
            panelWidthClass: 'w-[455px]',
            scrollTrackRightClass: 'right-[22px]',
          }}
        />
        <ScheduleTabs viewMode={viewMode} onChange={onViewModeChange} className="ml-6" />
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddClick}
            className="rounded-full bg-brand px-4 py-[7px] text-[13px] text-white transition-opacity hover:opacity-80"
          >
            일정 추가
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="rounded-full bg-brand px-4 py-[7px] text-[13px] text-white transition-opacity hover:opacity-80"
          >
            일정 삭제
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <ol
          ref={listRef}
          onScroll={onScroll}
          className="schedule-scroll h-full list-none overflow-y-auto p-0 pr-16"
          style={{ scrollbarWidth: 'none' }}
          aria-label="연간 일정 목록"
        >
          {scheduleMonthEntries.length === 0 && (
            <li className="pt-10 text-center text-[16px] text-ink-sub">등록된 일정이 없습니다.</li>
          )}
          {scheduleMonthEntries.map(([monthKey, monthSchedules]) => {
            const month = Number(monthKey.split('-')[1]);
            return (
              <li key={monthKey} className="mb-8">
                <h3 className="mb-3 text-[30px] font-bold text-brand">{month}월</h3>
                <div className="flex items-end gap-4">
                  <ol className="min-w-0 flex-1 list-none p-0">
                    {monthSchedules.map((schedule, index) => {
                      const key = getScheduleKey(schedule);
                      const isSelected = selectedKeys.has(key);
                      const isRange = schedule.startDate !== schedule.endDate;
                      return (
                        <li
                          key={key}
                          className="flex min-w-0 items-center gap-3 border-b border-[#F1F3F7] py-3 text-[15px] leading-[1.3] last:border-b-0"
                        >
                          <ScheduleCheckbox
                            checked={isSelected}
                            onClick={() => handleToggleSelect(key)}
                            label={`${schedule.title} 선택`}
                          />
                          <span
                            className="h-[9px] w-[3px] shrink-0 rounded-[0.5px]"
                            style={{ backgroundColor: ACCENT_COLORS[index % ACCENT_COLORS.length] }}
                          />
                          <time className="shrink-0 font-bold text-ink">
                            {formatScheduleDate(schedule.startDate)}
                            {isRange && ` ~ ${formatScheduleDate(schedule.endDate)}`}
                          </time>
                          <span className="min-w-0 flex-1 truncate text-right font-bold text-ink">
                            {schedule.title}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                  <button
                    type="button"
                    onClick={() => setSelectedKeys(new Set())}
                    className="mb-3 h-[32px] shrink-0 rounded-[6px] border border-brand bg-brand-soft px-[16px] text-[13px] text-brand transition-opacity hover:opacity-80"
                  >
                    완료
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
        <div
          ref={trackRef}
          className="pointer-events-none absolute right-2 top-0 h-full w-[12px] rounded-full bg-[#E4E4E4]"
        >
          <div ref={thumbRef} className="absolute hidden w-[12px] rounded-full bg-[#8A8A8A]" />
        </div>
      </div>
    </div>
  );
}

export default AllScheduleView;
