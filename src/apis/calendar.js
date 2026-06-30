import instance from './instance';

const flattenCalendarGroups = (calendarGroups) => {
  if (!Array.isArray(calendarGroups)) return [];

  return calendarGroups.flatMap(({ yearMonth, schedules }) => {
    if (!Array.isArray(schedules)) return [];

    return schedules.map((schedule) => ({ ...schedule, yearMonth }));
  });
};

export const getVisitorCalendar = async (year) => {
  const response = await instance.get('/api/v1/visitor/calendar', {
    params: { year },
  });

  return flattenCalendarGroups(response.data?.data);
};

export const getVisitorCalendarMonth = async ({ year, month }) => {
  const paddedMonth = String(month).padStart(2, '0');
  const response = await instance.get('/api/v1/visitor/calendar/month', {
    params: { year, month: paddedMonth },
  });

  const schedules = response.data?.data;
  if (!Array.isArray(schedules)) return [];

  return schedules.map((schedule) => ({
    ...schedule,
    yearMonth: `${year}-${paddedMonth}`,
  }));
};
