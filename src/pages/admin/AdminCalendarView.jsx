import { useState } from 'react';
import { MONTH_OPTIONS, WEEKDAYS } from '@/constants/schedule';
import { formatAdminDate } from '@/utils/schedule';
import ScheduleCheckbox from '@/components/schedule/ScheduleCheckbox';
import ScheduleDropdown from '@/components/schedule/ScheduleDropdown';
import ScheduleTabs from '@/components/schedule/ScheduleTabs';

function AdminCalendarView({
  calendar,
  view,
  schedules,
  monthDropdown,
  yearDropdown,
  onAddSchedule,
  onDeleteSchedule,
  onSaveEdits,
}) {
  const { year, month, yearOptions, calendarDates, todayKey } = calendar;
  const weeksCount = calendarDates.length / 7;
  const { viewMode, onViewModeChange } = view;
  const { scheduleDateKeys, visibleSchedules } = schedules;

  const [selectedDateKey, setSelectedDateKey] = useState(todayKey);
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [newScheduleTitle, setNewScheduleTitle] = useState('');
  const [selectedIndexes, setSelectedIndexes] = useState(new Set());
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedSchedules, setEditedSchedules] = useState([]);

  const handleDateClick = (dateKey) => {
    setSelectedDateKey(dateKey);
  };

  const handleAddClick = () => {
    setIsEditMode(false);
    setEditedSchedules([]);
    setIsAddingSchedule(true);
    setNewScheduleTitle('');
  };

  const handleConfirm = () => {
    if (isAddingSchedule) {
      if (newScheduleTitle.trim()) {
        onAddSchedule?.({ dateKey: selectedDateKey, title: newScheduleTitle });
      }
      setIsAddingSchedule(false);
      setNewScheduleTitle('');
    } else if (isEditMode) {
      onSaveEdits?.(editedSchedules);
      setIsEditMode(false);
      setEditedSchedules([]);
    } else {
      setEditedSchedules([...visibleSchedules]);
      setIsEditMode(true);
    }
  };

  const handleToggleSelect = (index) => {
    setSelectedIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleDeleteClick = () => {
    const toDelete = visibleSchedules.filter((_, i) => selectedIndexes.has(i));
    onDeleteSchedule?.(toDelete);
    setSelectedIndexes(new Set());
  };

  const handleCancel = () => {
    setIsAddingSchedule(false);
    setNewScheduleTitle('');
    setIsEditMode(false);
    setEditedSchedules([]);
  };

  const handleEditTitle = (index, value) => {
    setEditedSchedules((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], title: value };
      return next;
    });
  };

  const displayList = isEditMode ? editedSchedules : visibleSchedules;

  return (
    /* h-full + flex-col: 카드 전체 높이를 채워 수정 버튼을 하단에 고정 */
    <div className="flex h-full flex-col px-[18px] py-11 sm:px-11 sm:py-[72px] xl:px-[60px] xl:pb-[60px] xl:pt-[52px]">

      {/* 콘텐츠 그리드: flex-1 로 남은 높이 전부 차지 */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-y-8 xl:grid-cols-[505px_24px_1fr] xl:items-stretch xl:gap-y-0">

        {/* 왼쪽: 드롭다운 + 탭 + 캘린더 */}
        <div className="h-auto w-full max-w-[505px] xl:self-start">
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
                itemHeightClass: 'h-[40px]',
                itemTextClass: 'text-[20px]',
                panelWidthClass: 'w-[424px]',
                scrollTrackRightClass: 'right-[6px]',
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
                itemHeightClass: 'h-[73px]',
                itemTextClass: 'text-[20px]',
                panelWidthClass: 'w-[455px]',
                scrollTrackRightClass: 'right-[22px]',
              }}
            />
            <ScheduleTabs viewMode={viewMode} onChange={onViewModeChange} className="ml-auto" />
          </div>

          <div
            className={[
              'grid h-auto grid-cols-7 items-center justify-items-center gap-y-[22px] sm:gap-y-[26px] xl:h-[340px] xl:gap-y-0',
              weeksCount === 4 && 'xl:grid-rows-[52px_repeat(4,minmax(0,1fr))]',
              weeksCount === 5 && 'xl:grid-rows-[52px_repeat(5,minmax(0,1fr))]',
              weeksCount === 6 && 'xl:grid-rows-[52px_repeat(6,minmax(0,1fr))]',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-label={`${year}년 ${month + 1}월 달력`}
          >
            {WEEKDAYS.map((weekday) => (
              <div
                key={weekday}
                className="h-6 w-[34px] text-center text-[18px] font-semibold leading-6 text-ink-sub sm:w-10 xl:h-[30px] xl:w-[52px] xl:self-start xl:leading-[30px]"
              >
                {weekday}
              </div>
            ))}

            {calendarDates.map((date) => {
              const isSelected = date.key === selectedDateKey;
              const hasSchedule = date.isCurrentMonth && scheduleDateKeys.has(date.key);

              return (
                <button
                  key={date.key}
                  type="button"
                  onClick={() => date.isCurrentMonth && handleDateClick(date.key)}
                  className={[
                    'relative grid h-[31px] w-[34px] place-items-center text-[18px] font-normal leading-none sm:w-10 xl:h-[40px] xl:w-[40px]',
                    isSelected
                      ? 'h-10 w-10 rounded-[11px] bg-brand font-bold text-white shadow-schedule-day xl:h-10 xl:w-10'
                      : '',
                    hasSchedule && !isSelected
                      ? 'after:absolute after:left-1/2 after:-top-3 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:rounded-full after:bg-brand after:content-[""]'
                      : '',
                    !isSelected && !date.isCurrentMonth ? 'text-schedule-inactive' : '',
                    !isSelected && date.isCurrentMonth ? 'text-ink' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span>{date.day}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div />

        {/* 오른쪽: 일정 목록 + 수정 버튼 */}
        {/* h-full + flex-col: 그리드 셀 전체 높이를 채워 수정 버튼을 하단에 고정 */}
        <div className="flex h-full min-w-0 flex-col xl:pt-[12px]">

          {/* 추가 / 삭제 버튼 */}
          <div className="mb-4 flex shrink-0 justify-end gap-2">
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

          {/* 일정 목록: flex-1 로 남은 공간 채우고 넘치면 스크롤 */}
          <ol className="min-h-0 flex-1 list-none overflow-y-auto p-0" aria-label="주요 일정">
            <div className="flex flex-col gap-[26px]">
              {displayList.map((schedule, index) => {
                const isChecked = selectedIndexes.has(index);
                return (
                  <li
                    key={`${schedule.startDate}-${schedule.endDate}-${schedule.title}-${index}`}
                    className="flex min-w-0 items-center gap-4 text-[16px] leading-[1.3]"
                  >
                    {/* 편집 모드일 때 체크박스 숨김 */}
                    {!isEditMode && (
                      <ScheduleCheckbox
                        checked={isChecked}
                        onClick={() => handleToggleSelect(index)}
                        label={`${schedule.title} 선택`}
                      />
                    )}
                    <time className="w-[190px] shrink-0 font-bold text-ink">
                      {formatAdminDate(schedule.startDate)} ~ {formatAdminDate(schedule.endDate)}
                    </time>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={editedSchedules[index]?.title ?? schedule.title}
                        onChange={(e) => handleEditTitle(index, e.target.value)}
                        className="min-w-0 flex-1 border-b border-brand bg-transparent text-[16px] text-ink outline-none"
                      />
                    ) : (
                      <span className="min-w-0 truncate font-normal text-ink-sub">{schedule.title}</span>
                    )}
                  </li>
                );
              })}

              {isAddingSchedule && (
                <li className="flex min-w-0 items-center gap-4 text-[16px] leading-[1.3]">
                  <div className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border border-brand bg-white">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d="M4.5 1V8M1 4.5H8" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <time className="w-[190px] shrink-0 font-bold text-ink">
                    {formatAdminDate(selectedDateKey)} ~
                  </time>
                  <input
                    type="text"
                    autoFocus
                    value={newScheduleTitle}
                    onChange={(e) => setNewScheduleTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
                    placeholder="새로운 일정을 작성하세요"
                    className="min-w-0 flex-1 border-b border-brand bg-transparent text-[16px] text-ink outline-none placeholder:text-[#9f9f9f]"
                  />
                </li>
              )}
            </div>
          </ol>

          {/* 취소/수정/완료 버튼: shrink-0 으로 항상 하단 고정 */}
          <div className="flex shrink-0 justify-end gap-2 pt-8">
            {(isEditMode || isAddingSchedule) && (
              <button
                type="button"
                onClick={handleCancel}
                className="h-[32px] w-[96px] rounded-[6px] border border-brand bg-white px-[14px] py-[6px] text-[14px] text-brand transition-opacity hover:opacity-80"
              >
                취소
              </button>
            )}
            <button
              type="button"
              onClick={handleConfirm}
              className="h-[32px] w-[96px] rounded-[6px] bg-brand px-[14px] py-[6px] text-[14px] text-white transition-opacity hover:opacity-80"
            >
              {isEditMode || isAddingSchedule ? '완료' : '수정'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCalendarView;
