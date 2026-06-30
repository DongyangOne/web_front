import { useEffect, useMemo, useRef, useState } from 'react';

import AllScheduleView from '@/components/schedule/AllScheduleView';
import CalendarScheduleView from '@/components/schedule/CalendarScheduleView';
import ScheduleStyles from '@/styles/ScheduleStyles';
import { getVisitorCalendar, getVisitorCalendarMonth } from '@/apis/calendar';
import { DROPDOWN_TYPE } from '@/constants/schedule';
import {
  formatDateKey,
  getCalendarDates,
  getScheduleDateKeys,
  groupSchedulesByMonth,
  isScheduleInMonth,
  parseLocalDate,
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
  const [yearSchedules, setYearSchedules] = useState([]);
  const [monthSchedules, setMonthSchedules] = useState([]);

  const calendarDates = useMemo(() => getCalendarDates(year, month), [year, month]);
  const scheduleDateKeys = useMemo(() => getScheduleDateKeys(monthSchedules), [monthSchedules]);
  const visibleSchedules = useMemo(() => {
    const filteredSchedules =
      viewMode === 'all'
        ? yearSchedules.filter(
            (schedule) => parseLocalDate(schedule.startDate).getFullYear() === year
          )
        : monthSchedules.filter((schedule) => isScheduleInMonth(schedule, year, month));

    return [...filteredSchedules].sort(sortByStartDate);
  }, [month, monthSchedules, viewMode, year, yearSchedules]);
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
    let ignore = false;

    const fetchYearSchedules = async () => {
      if (viewMode !== 'all') return;

      try {
        const scheduleList = await getVisitorCalendar(year);

        if (!ignore) {
          setYearSchedules(scheduleList);
        }
      } catch {
        if (!ignore) {
          setYearSchedules([]);
        }
      }
    };

    fetchYearSchedules();

    return () => {
      ignore = true;
    };
  }, [viewMode, year]);

  useEffect(() => {
    let ignore = false;

    const fetchMonthSchedules = async () => {
      if (viewMode !== 'calendar') return;

      try {
        const scheduleList = await getVisitorCalendarMonth({ year, month: month + 1 });

        if (!ignore) {
          setMonthSchedules(scheduleList);
        }
      } catch {
        if (!ignore) {
          setMonthSchedules([]);
        }
      }
    };

    fetchMonthSchedules();

    return () => {
      ignore = true;
    };
  }, [month, viewMode, year]);

  useEffect(() => {
    const rafIds = [];

    if (isMonthDropdownOpen) {
      rafIds.push(requestAnimationFrame(() => handleMonthScroll()));
    }
    if (isYearDropdownOpen) {
      rafIds.push(requestAnimationFrame(() => handleYearScroll()));
    }
    if (viewMode === 'all') {
      rafIds.push(requestAnimationFrame(() => handleAllScheduleScroll()));
    }

    return () => {
      rafIds.forEach(cancelAnimationFrame);
    };
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
            yearDropdown={{
              year,
              yearOptions,
              isOpen: isYearDropdownOpen,
              handlers: {
                onToggle: () => setOpenedDropdown(isYearDropdownOpen ? null : DROPDOWN_TYPE.YEAR),
                onSelect: (yearOption) => {
                  setYear(yearOption);
                  setOpenedDropdown(null);
                },
                onScroll: handleYearScroll,
              },
              scrollRefs: {
                listRef: yearListRef,
                trackRef: yearTrackRef,
                thumbRef: yearThumbRef,
              },
            }}
            view={{ viewMode, onViewModeChange: handleViewModeChange }}
            scheduleMonthEntries={scheduleMonthEntries}
            scheduleScroll={{
              listRef: allScheduleListRef,
              trackRef: allScheduleTrackRef,
              thumbRef: allScheduleThumbRef,
              onScroll: handleAllScheduleScroll,
            }}
          />
        ) : (
          <CalendarScheduleView
            calendar={{ year, month, yearOptions, calendarDates, todayKey }}
            view={{ viewMode, onViewModeChange: handleViewModeChange }}
            schedules={{ scheduleDateKeys, visibleSchedules }}
            monthDropdown={{
              isOpen: isMonthDropdownOpen,
              handlers: {
                onToggle: () => setOpenedDropdown(isMonthDropdownOpen ? null : DROPDOWN_TYPE.MONTH),
                onSelect: (monthOption) => {
                  setMonth(monthOption);
                  setOpenedDropdown(null);
                },
                onScroll: handleMonthScroll,
              },
              scrollRefs: {
                listRef: monthListRef,
                trackRef: monthTrackRef,
                thumbRef: monthThumbRef,
              },
            }}
            yearDropdown={{
              isOpen: isYearDropdownOpen,
              handlers: {
                onToggle: () => setOpenedDropdown(isYearDropdownOpen ? null : DROPDOWN_TYPE.YEAR),
                onSelect: (yearOption) => {
                  setYear(yearOption);
                  setOpenedDropdown(null);
                },
                onScroll: handleYearScroll,
              },
              scrollRefs: {
                listRef: yearListRef,
                trackRef: yearTrackRef,
                thumbRef: yearThumbRef,
              },
            }}
          />
        )}
      </div>
    </section>
  );
}

export default SchedulePage;
