import { useEffect, useMemo, useRef, useState } from 'react';

import Header from '@/components/layout/Header';
import AllScheduleView from '@/components/schedule/AllScheduleView';
import AdminCalendarView from '@/pages/admin/AdminCalendarView';
import ScheduleStyles from '@/styles/ScheduleStyles';
import { DROPDOWN_TYPE, SCHEDULES } from '@/constants/schedule';
import {
  formatAdminDate,
  formatDateKey,
  getCalendarDates,
  getScheduleDateKeys,
  groupSchedulesByMonth,
  isScheduleInMonth,
  parseLocalDate,
  sortByStartDate,
  updateScrollThumb,
} from '@/utils/schedule';

function AdminSchedulePage() {
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [schedulesToDelete, setSchedulesToDelete] = useState([]);
  const [localSchedules, setLocalSchedules] = useState([]);

  const allSchedules = useMemo(() => [...SCHEDULES, ...localSchedules], [localSchedules]);

  const calendarDates = useMemo(() => getCalendarDates(year, month), [year, month]);
  const scheduleDateKeys = useMemo(() => getScheduleDateKeys(allSchedules), [allSchedules]);
  const visibleSchedules = useMemo(() => {
    const filteredSchedules =
      viewMode === 'all'
        ? allSchedules.filter((schedule) => parseLocalDate(schedule.startDate).getFullYear() === year)
        : allSchedules.filter((schedule) => isScheduleInMonth(schedule, year, month));
    return [...filteredSchedules].sort(sortByStartDate);
  }, [allSchedules, month, viewMode, year]);
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

  const handleAddSchedule = ({ dateKey, title }) => {
    setLocalSchedules((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, startDate: dateKey, endDate: dateKey, title },
    ]);
  };

  const handleSaveEdits = (updatedSchedules) => {
    setLocalSchedules((prev) =>
      prev.map((s) => {
        const edited = updatedSchedules.find((u) => u.id === s.id);
        return edited ? { ...s, title: edited.title } : s;
      })
    );
  };
  const handleDeleteSchedule = (toDelete) => {
    if (!toDelete || toDelete.length === 0) return;
    setSchedulesToDelete(toDelete);
    setIsDeleteModalOpen(true);
  };
  const handleDeleteConfirm = () => {
    setLocalSchedules((prev) =>
      prev.filter(
        (s) =>
          !schedulesToDelete.some(
            (d) => d.startDate === s.startDate && d.endDate === s.endDate && d.title === s.title
          )
      )
    );
    setIsDeleteModalOpen(false);
    setSchedulesToDelete([]);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const rafIds = [];
    if (isMonthDropdownOpen) rafIds.push(requestAnimationFrame(() => handleMonthScroll()));
    if (isYearDropdownOpen) rafIds.push(requestAnimationFrame(() => handleYearScroll()));
    if (viewMode === 'all') rafIds.push(requestAnimationFrame(() => handleAllScheduleScroll()));
    return () => {
      rafIds.forEach(cancelAnimationFrame);
    };
  }, [isMonthDropdownOpen, isYearDropdownOpen, viewMode, scheduleMonthEntries]);

  return (
    <>
      <Header />
      <section
        className={[
          'min-h-screen bg-brand-soft px-4 py-7 lg:px-6 lg:py-12 xl:min-h-[1024px] xl:py-[77px]',
          viewMode === 'all'
            ? 'xl:px-[max(24px,calc((100vw-1253px)/2))]'
            : 'xl:px-[max(24px,calc((100vw-1068px)/2))]',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-labelledby="admin-schedule-title"
      >
        <ScheduleStyles />
        <h2 id="admin-schedule-title" className="sr-only">
          연간 계획 (관리자)
        </h2>

      <div
        className="relative mx-auto"
        style={{ width: viewMode === 'all' ? '1253px' : '1068px', maxWidth: '100%' }}
      >

        <div className="h-auto min-h-[683px] w-full rounded-[50px] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] xl:h-[683px]">
          {viewMode === 'all' ? (
            <AllScheduleView
              yearDropdown={{
                year,
                yearOptions,
                isOpen: isYearDropdownOpen,
                handlers: {
                  onToggle: () =>
                    setOpenedDropdown(isYearDropdownOpen ? null : DROPDOWN_TYPE.YEAR),
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
              onDeleteSchedule={handleDeleteSchedule}
            />
          ) : (
        <AdminCalendarView
        calendar={{ year, month, yearOptions, calendarDates, todayKey }}
        view={{ viewMode, onViewModeChange: handleViewModeChange }}
        schedules={{ scheduleDateKeys, visibleSchedules }}
        monthDropdown={{
            isOpen: isMonthDropdownOpen,
            handlers: {
            onToggle: () => setOpenedDropdown(isMonthDropdownOpen ? null : DROPDOWN_TYPE.MONTH),
            onSelect: (monthOption) => { setMonth(monthOption); setOpenedDropdown(null); },
            onScroll: handleMonthScroll,
            },
            scrollRefs: { listRef: monthListRef, trackRef: monthTrackRef, thumbRef: monthThumbRef },
        }}
        yearDropdown={{
            isOpen: isYearDropdownOpen,
            handlers: {
            onToggle: () => setOpenedDropdown(isYearDropdownOpen ? null : DROPDOWN_TYPE.YEAR),
            onSelect: (yearOption) => { setYear(yearOption); setOpenedDropdown(null); },
            onScroll: handleYearScroll,
            },
            scrollRefs: { listRef: yearListRef, trackRef: yearTrackRef, thumbRef: yearThumbRef },
        }}
        onAddSchedule={handleAddSchedule}
        onDeleteSchedule={handleDeleteSchedule}
        onSaveEdits={handleSaveEdits}
        />
          )}
        </div>
      </div>

      {/* 일정 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[305px] overflow-hidden rounded-[10px] bg-white shadow-[1px_1px_40px_0px_rgba(0,0,0,0.35)]">
            {/* 헤더 */}
            <div className="flex items-center justify-between border-b border-[#ccc] px-[22px] py-[14px]">
              <span className="text-[14px] font-medium text-ink">
                {schedulesToDelete.length > 0
                  ? `${formatAdminDate(schedulesToDelete[0].startDate)} ~ ${formatAdminDate(schedulesToDelete[0].endDate)}`
                  : `${month + 1}월 일정`}
              </span>
              <button
                type="button"
                onClick={handleDeleteCancel}
                className="flex h-[22px] w-[22px] items-center justify-center text-ink"
                aria-label="닫기"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11 3L3 11M3 3L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* 본문 */}
            <div className="px-[22px] py-[24px]">
              <p className="text-[14px] text-ink">일정을 삭제하시겠습니까?</p>
            </div>

            {/* 푸터 버튼 */}
            <div className="flex items-center justify-end gap-[6px] bg-brand-soft px-[12px] py-[13px]">
              <button
                type="button"
                onClick={handleDeleteCancel}
                className="h-[34px] rounded-[6px] border border-brand bg-white px-[16px] text-[14px] text-ink"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="h-[34px] rounded-[6px] bg-brand px-[16px] text-[14px] text-white"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      </section>
    </>
  );
}

export default AdminSchedulePage;