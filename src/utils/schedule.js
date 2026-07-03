export const parseLocalDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatScheduleDate = (dateKey) => {
  const date = parseLocalDate(dateKey);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date);

  return `${month}.${day} (${weekday})`;
};

export const formatAllScheduleDate = ({ startDate, endDate }) => {
  const start = formatScheduleDate(startDate);
  const end = formatScheduleDate(endDate);

  return startDate === endDate ? start : `${start} ~ ${end}`;
};

const getMondayBasedDay = (date) => {
  const day = date.getDay();

  return day === 0 ? 6 : day - 1;
};

export const getCalendarDates = (year, month) => {
  const firstDate = new Date(year, month, 1);
  const startDate = new Date(firstDate);
  startDate.setDate(firstDate.getDate() - getMondayBasedDay(firstDate));

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return {
      key: formatDateKey(date),
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
    };
  });
};

export const getScheduleDateKeys = (scheduleList) =>
  new Set(
    scheduleList.flatMap(({ startDate, endDate }) => {
      const start = parseLocalDate(startDate);
      const end = parseLocalDate(endDate);
      const keys = [];

      for (const date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        keys.push(formatDateKey(date));
      }

      return keys;
    })
  );

export const isScheduleInMonth = ({ startDate, endDate }, year, month) => {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  const scheduleStart = parseLocalDate(startDate);
  const scheduleEnd = parseLocalDate(endDate);

  return scheduleStart <= monthEnd && scheduleEnd >= monthStart;
};

export const sortByStartDate = (firstSchedule, secondSchedule) =>
  firstSchedule.startDate.localeCompare(secondSchedule.startDate);

export const groupSchedulesByMonth = (scheduleList) =>
  scheduleList.reduce((groups, schedule) => {
    const scheduleMonth = parseInt(schedule.startDate.split('-')[1], 10);
    const key = `${scheduleMonth}월`;

    return {
      ...groups,
      [key]: [...(groups[key] || []), schedule],
    };
  }, {});

export const updateScrollThumb = (scrollElement, trackElement, thumbElement) => {
  if (!scrollElement || !trackElement || !thumbElement) return;

  const { scrollTop, scrollHeight, clientHeight } = scrollElement;
  const trackHeight = trackElement.clientHeight;

  if (scrollHeight <= clientHeight) {
    thumbElement.style.opacity = '1';
    thumbElement.style.height = `${trackHeight}px`;
    thumbElement.style.transform = 'translateY(0)';
    return;
  }

  thumbElement.style.opacity = '1';

  const heightRatio = clientHeight / scrollHeight;
  const thumbHeight = Math.max(heightRatio * trackHeight, 36);
  const maxScrollTop = scrollHeight - clientHeight;
  const maxThumbTop = trackHeight - thumbHeight;
  const thumbTop = (scrollTop / maxScrollTop) * maxThumbTop;

  thumbElement.style.height = `${thumbHeight}px`;
  thumbElement.style.transform = `translateY(${thumbTop}px)`;
};
