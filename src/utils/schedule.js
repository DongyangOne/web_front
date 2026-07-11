export function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const KO_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export function formatAdminDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${mm}.${dd} (${KO_DAYS[date.getDay()]})`;
}

export function formatScheduleDate(dateString) {
  const [, month, day] = dateString.split('-').map(Number);
  return `${month}월 ${day}일`;
}

export function getCalendarDates(year, month) {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const dates = [];

  const prevDaysCount = (firstDayOfWeek + 6) % 7;
  for (let i = prevDaysCount - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    dates.push({
      day,
      key: `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    dates.push({
      day,
      key: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      isCurrentMonth: true,
    });
  }

  const remaining = (7 - (dates.length % 7)) % 7;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  for (let day = 1; day <= remaining; day++) {
    dates.push({
      day,
      key: `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      isCurrentMonth: false,
    });
  }

  return dates;
}

export function getScheduleDateKeys(schedules) {
  const keys = new Set();
  schedules.forEach(({ startDate, endDate }) => {
    const start = parseLocalDate(startDate);
    const end = parseLocalDate(endDate);
    for (const current = new Date(start); current <= end; current.setDate(current.getDate() + 1)) {
      keys.add(formatDateKey(current));
    }
  });
  return keys;
}

export function isScheduleInMonth(schedule, year, month) {
  const start = parseLocalDate(schedule.startDate);
  const end = parseLocalDate(schedule.endDate);
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  return start <= monthEnd && end >= monthStart;
}

export function groupSchedulesByMonth(schedules) {
  return schedules.reduce((groups, schedule) => {
    const monthKey = schedule.startDate.slice(0, 7);
    if (!groups[monthKey]) groups[monthKey] = [];
    groups[monthKey].push(schedule);
    return groups;
  }, {});
}

export function sortByStartDate(a, b) {
  return a.startDate.localeCompare(b.startDate);
}

export function updateScrollThumb(listElement, trackElement, thumbElement) {
  if (!listElement || !trackElement || !thumbElement) return;
  const { scrollHeight, clientHeight, scrollTop } = listElement;
  if (scrollHeight <= clientHeight) {
    thumbElement.style.display = 'none';
    return;
  }
  thumbElement.style.display = 'block';
  const ratio = clientHeight / scrollHeight;
  const thumbHeight = Math.max(20, ratio * trackElement.clientHeight);
  const thumbTop =
    (scrollTop / (scrollHeight - clientHeight)) * (trackElement.clientHeight - thumbHeight);
  thumbElement.style.height = `${thumbHeight}px`;
  thumbElement.style.top = `${thumbTop}px`;
}
