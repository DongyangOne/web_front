import instance from './instance';

const flattenCalendarGroups = (calendarGroups) =>
  calendarGroups.flatMap(({ yearMonth, schedules }) =>
    schedules.map((schedule) => ({ ...schedule, yearMonth }))
  );

export const getVisitorCalendar = async (year) => {
  const response = await instance.get('/api/v1/visitor/calendar', {
    params: { year },
  });

  return flattenCalendarGroups(response.data.data);
};

export const getVisitorCalendarMonth = async ({ year, month }) => {
  const paddedMonth = String(month).padStart(2, '0');
  const response = await instance.get('/api/v1/visitor/calendar/month', {
    params: { year, month: paddedMonth },
  });

  return response.data.data.map((schedule) => ({
    ...schedule,
    yearMonth: `${year}-${paddedMonth}`,
  }));
};
