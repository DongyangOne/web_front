import { useEffect, useMemo, useRef, useState } from 'react';

import AllScheduleView from '@/components/schedule/AllScheduleView';
import CalendarScheduleView from '@/components/schedule/CalendarScheduleView';
import ScheduleStyles from '@/components/schedule/ScheduleStyles';
import { DROPDOWN_TYPE, schedules } from '@/constants/schedule';
import {
  formatDateKey,
  getCalendarDates,
  getScheduleDateKeys,
  groupSchedulesByMonth,
  isScheduleInMonth,
  sortByStartDate,
  updateScrollThumb,
} from '@/utils/schedule';

function SchedulePage() {
  const monthListRef = useRef(null);
  const monthTrackRef = useRef(null);
  const monthThumbRef = useRef(null);
  const yearListRef = useRef(null);
  const yearTrackRef = useRef(null);
  const yearThumbRef = useRef(null);
  const allScheduleListRef = useRef(null);
  const allScheduleTrackRef = useRef(null);
  const allScheduleThumbRef = useRef(null);

  const today = useMemo(() => new Date(), []);
  const todayKey = useMemo(() => formatDateKey(today), [today]);
  const currentYear = today.getFullYear();
  const yearOptions = useMemo(
    () => Array.from({ length: currentYear - 2022 + 1 }, (_, index) => 2022 + index),
    [currentYear]
  );

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(today.getMonth());
  const [openedDropdown, setOpenedDropdown] = useState(null);
  const [viewMode, setViewMode] = useState('calendar');

  const calendarDates = useMemo(() => getCalendarDates(year, month), [year, month]);
  const scheduleDateKeys = useMemo(() => getScheduleDateKeys(schedules), []);
  const visibleSchedules = useMemo(() => {
    const filteredSchedules =
      viewMode === 'all'
        ? schedules.filter((schedule) => new Date(schedule.startDate).getFullYear() === year)
        : schedules.filter((schedule) => isScheduleInMonth(schedule, year, month));

    return [...filteredSchedules].sort(sortByStartDate);
  }, [month, viewMode, year]);
  const scheduleMonthEntries = useMemo(
    () => Object.entries(groupSchedulesByMonth(visibleSchedules)),
    [visibleSchedules]
  );

  const isMonthDropdownOpen = openedDropdown === DROPDOWN_TYPE.MONTH;
  const isYearDropdownOpen = openedDropdown === DROPDOWN_TYPE.YEAR;

  const handleMonthScroll = () => {
    updateScrollThumb(monthListRef.current, monthTrackRef.current, monthThumbRef.current);
  };

  const handleYearScroll = () => {
    updateScrollThumb(yearListRef.current, yearTrackRef.current, yearThumbRef.current);
  };

  const handleAllScheduleScroll = () => {
    updateScrollThumb(
      allScheduleListRef.current,
      allScheduleTrackRef.current,
      allScheduleThumbRef.current
    );
  };

  const handleViewModeChange = (nextViewMode) => {
    setViewMode(nextViewMode);
    setOpenedDropdown(null);
  };

  useEffect(() => {
    if (isMonthDropdownOpen) {
      requestAnimationFrame(() => handleMonthScroll());
    }
    if (isYearDropdownOpen) {
      requestAnimationFrame(() => handleYearScroll());
    }
    if (viewMode === 'all') {
      requestAnimationFrame(() => handleAllScheduleScroll());
    }
  }, [isMonthDropdownOpen, isYearDropdownOpen, viewMode, scheduleMonthEntries]);

  return (
    <section
      className={[
        'min-h-screen bg-brand-soft px-4 py-7 lg:px-6 lg:py-12 xl:min-h-[1024px] xl:py-[77px]',
        viewMode === 'all'
          ? 'xl:px-[max(24px,calc((100vw-1253px)/2))]'
          : 'xl:px-[max(24px,calc((100vw-1068px)/2))]',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-labelledby="schedule-title"
    >
      <ScheduleStyles />

      <h2 id="schedule-title" className="sr-only">
        연간 계획
      </h2>

      <div
        className={[
          'mx-auto h-auto min-h-[683px] w-full rounded-[28px] bg-white shadow-schedule lg:rounded-[46px] xl:h-[683px]',
          viewMode === 'all' ? 'xl:w-[1253px]' : 'xl:w-[1068px]',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {viewMode === 'all' ? (
          <AllScheduleView
            year={year}
            yearOptions={yearOptions}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            scheduleMonthEntries={scheduleMonthEntries}
            isYearDropdownOpen={isYearDropdownOpen}
            onToggleYear={() => setOpenedDropdown(isYearDropdownOpen ? null : DROPDOWN_TYPE.YEAR)}
            onSelectYear={(yearOption) => {
              setYear(yearOption);
              setOpenedDropdown(null);
            }}
            yearListRef={yearListRef}
            yearTrackRef={yearTrackRef}
            yearThumbRef={yearThumbRef}
            onYearScroll={handleYearScroll}
            allScheduleListRef={allScheduleListRef}
            allScheduleTrackRef={allScheduleTrackRef}
            allScheduleThumbRef={allScheduleThumbRef}
            onAllScheduleScroll={handleAllScheduleScroll}
          />
        ) : (
          <CalendarScheduleView
            year={year}
            month={month}
            yearOptions={yearOptions}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            calendarDates={calendarDates}
            todayKey={todayKey}
            scheduleDateKeys={scheduleDateKeys}
            visibleSchedules={visibleSchedules}
            isMonthDropdownOpen={isMonthDropdownOpen}
            isYearDropdownOpen={isYearDropdownOpen}
            onToggleMonth={() =>
              setOpenedDropdown(isMonthDropdownOpen ? null : DROPDOWN_TYPE.MONTH)
            }
            onToggleYear={() => setOpenedDropdown(isYearDropdownOpen ? null : DROPDOWN_TYPE.YEAR)}
            onSelectMonth={(monthOption) => {
              setMonth(monthOption);
              setOpenedDropdown(null);
            }}
            onSelectYear={(yearOption) => {
              setYear(yearOption);
              setOpenedDropdown(null);
            }}
            monthListRef={monthListRef}
            monthTrackRef={monthTrackRef}
            monthThumbRef={monthThumbRef}
            yearListRef={yearListRef}
            yearTrackRef={yearTrackRef}
            yearThumbRef={yearThumbRef}
            onMonthScroll={handleMonthScroll}
            onYearScroll={handleYearScroll}
          />
        )}
      </div>
    </section>
  );
}

export default SchedulePage;
