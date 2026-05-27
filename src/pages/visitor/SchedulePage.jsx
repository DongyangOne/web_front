import { useMemo, useState } from 'react';

import Button from '@/components/common/Button';

import styles from './SchedulePage.module.css';

const WEEK_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

// 퍼블리싱 단계에서 일정 UI 확인용 임시 데이터
const INITIAL_EVENTS = [
  {
    id: 1,
    title: '신입 부원 모집 프로젝트(가안)',
    start: '04.01',
    end: '04.13',
  },
  {
    id: 2,
    title: '중간고사',
    start: '04.21',
    end: '04.27',
  },
];

function SchedulePage() {
  // 현재 선택된 연/월 상태
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(4);

  // 화면에 표시할 일정 목록
  const [events, setEvents] = useState(INITIAL_EVENTS);

  // 드롭다운/모달 UI 상태 관리
  const [showMonthDropdown, setShowMonthDropdown] =
    useState(false);
  const [showYearDropdown, setShowYearDropdown] =
    useState(false);
  const [showAddModal, setShowAddModal] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  // 삭제 대상 일정 식별용
  const [selectedEventId, setSelectedEventId] =
    useState(null);

  // 캘린더 뷰 / 전체 목록 뷰 전환
  const [isListView, setIsListView] = useState(false);

  // 일정 추가 모달 입력값
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
  });

  // 현재는 퍼블리싱 단계라 고정된 31일 캘린더로 UI만 구성
  const calendarDays = useMemo(() => {
    const days = [];

    for (let i = 1; i <= 31; i += 1) {
      days.push(i);
    }

    return days;
  }, []);

  // 월 이동 시 연도 변경도 함께 처리
  const handlePreviousMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((prev) => prev - 1);
      return;
    }

    setMonth((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((prev) => prev + 1);
      return;
    }

    setMonth((prev) => prev + 1);
  };

  // 일정 추가 퍼블리싱 테스트용 임시 처리
  const handleAddEvent = () => {
    if (!newEvent.title) {
      setShowAddModal(false);
      return;
    }

    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newEvent.title,
        start: newEvent.start || '00.00',
        end: newEvent.end || '00.00',
      },
    ]);

    setNewEvent({
      title: '',
      start: '',
      end: '',
    });

    setShowAddModal(false);
  };

  // 삭제 확인 모달 표시
  const handleDeleteClick = (id) => {
    setSelectedEventId(id);
    setShowDeleteModal(true);
  };

  // 선택된 일정 삭제
  const handleDeleteConfirm = () => {
    setEvents((prev) =>
      prev.filter(
        (event) => event.id !== selectedEventId
      )
    );

    setShowDeleteModal(false);
    setSelectedEventId(null);
  };

  return (
    <section className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.toolbar}>
          <div className={styles.dateControls}>
            <button
              type="button"
              onClick={handlePreviousMonth}
            >
              ◀
            </button>

            {/* 월 선택 드롭다운 */}
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                onClick={() =>
                  setShowMonthDropdown(
                    !showMonthDropdown
                  )
                }
              >
                {month}월
              </button>

              {showMonthDropdown && (
                <div
                  className={styles.dropdown}
                >
                  {Array.from(
                    { length: 12 },
                    (_, index) => (
                      <button
                        key={index + 1}
                        type="button"
                        onClick={() => {
                          setMonth(index + 1);
                          setShowMonthDropdown(
                            false
                          );
                        }}
                      >
                        {index + 1}월
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* 연도 선택 드롭다운 */}
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                onClick={() =>
                  setShowYearDropdown(
                    !showYearDropdown
                  )
                }
              >
                {year}
              </button>

              {showYearDropdown && (
                <div
                  className={styles.dropdown}
                >
                  {[2023, 2024, 2025, 2026].map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setYear(item);
                          setShowYearDropdown(
                            false
                          );
                        }}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
            >
              ▶
            </button>
          </div>

          <div className={styles.actions}>
            {/* 피그마 기준 전체 보기 UI 전환 */}
            <button
              type="button"
              onClick={() =>
                setIsListView(!isListView)
              }
            >
              {isListView
                ? '캘린더 보기'
                : '전체 보기'}
            </button>

            <button
              type="button"
              onClick={() =>
                setShowAddModal(true)
              }
            >
              일정 추가
            </button>
          </div>
        </div>

        {!isListView && (
          <div className={styles.calendarLayout}>
            <div className={styles.calendar}>
              <div
                className={styles.weekHeader}
              >
                {WEEK_DAYS.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div
                className={styles.dayGrid}
              >
                {calendarDays.map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={
                      day === 2
                        ? styles.activeDay
                        : ''
                    }
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.eventList}>
              {events.map((event) => (
                <div
                  key={event.id}
                  className={
                    styles.eventItem
                  }
                >
                  <div>
                    <p>
                      {event.start} ~
                      {event.end}
                    </p>

                    <span>
                      {event.title}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteClick(
                        event.id
                      )
                    }
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 월별 일정 전체 조회 화면 */}
        {isListView && (
          <div className={styles.listView}>
            <div>
              <h3>3월</h3>

              {events.map((event) => (
                <div
                  key={event.id}
                  className={
                    styles.listItem
                  }
                >
                  <span>
                    {event.title}
                  </span>

                  <small>
                    {event.start} ~
                    {event.end}
                  </small>
                </div>
              ))}
            </div>

            <div>
              <h3>4월</h3>

              {events.map((event) => (
                <div
                  key={`${event.id}-4`}
                  className={
                    styles.listItem
                  }
                >
                  <span>
                    {event.title}
                  </span>

                  <small>
                    {event.start} ~
                    {event.end}
                  </small>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 일정 추가 모달 */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>일정 추가</h3>

            <input
              placeholder="일정명"
              value={newEvent.title}
              onChange={(event) =>
                setNewEvent({
                  ...newEvent,
                  title:
                    event.target.value,
                })
              }
            />

            <input
              placeholder="시작일"
              value={newEvent.start}
              onChange={(event) =>
                setNewEvent({
                  ...newEvent,
                  start:
                    event.target.value,
                })
              }
            />

            <input
              placeholder="종료일"
              value={newEvent.end}
              onChange={(event) =>
                setNewEvent({
                  ...newEvent,
                  end:
                    event.target.value,
                })
              }
            />

            <div className={styles.modalActions}>
              <button
                type="button"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                취소
              </button>

              <Button
                onClick={handleAddEvent}
              >
                등록
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 일정 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>
              해당 일정을
              삭제하시겠습니까?
            </h3>

            <div className={styles.modalActions}>
              <button
                type="button"
                onClick={() =>
                  setShowDeleteModal(
                    false
                  )
                }
              >
                취소
              </button>

              <Button
                onClick={
                  handleDeleteConfirm
                }
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SchedulePage;