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

/**
 * (관리자) 캘린더 연간 일정 조회
 * @param {number} year
 * @returns {Promise<Array>} 월별로 묶여있던 일정을 평탄화한 목록
 */
export const getAdminCalendar = async (year) => {
  const response = await instance.get('/api/v1/admin/calendar', {
    params: { year },
  });

  return flattenCalendarGroups(response.data?.data);
};

/**
 * (관리자) 캘린더 월별 일정 조회
 * @param {{ year: number, month: number }} params - month는 1부터 시작한다.
 * @returns {Promise<Array>}
 */
export const getAdminCalendarMonth = async ({ year, month }) => {
  const paddedMonth = String(month).padStart(2, '0');
  const response = await instance.get('/api/v1/admin/calendar/month', {
    params: { year, month: paddedMonth },
  });

  const schedules = response.data?.data;
  if (!Array.isArray(schedules)) return [];

  return schedules.map((schedule) => ({
    ...schedule,
    yearMonth: `${year}-${paddedMonth}`,
  }));
};

/**
 * (관리자) 캘린더 일정 등록
 * @param {{ title: string, startDate: string, endDate: string }} scheduleData
 * @returns {Promise<Object>} 등록된 일정
 */
export const createCalendarSchedule = async (scheduleData) => {
  const response = await instance.post('/api/v1/admin/calendar', scheduleData);

  return response.data?.data;
};

/**
 * (관리자) 캘린더 일정 수정
 * @param {number} calendarId - 수정할 일정 ID
 * @param {{ title: string, startDate: string, endDate: string }} scheduleData
 * @returns {Promise<Object>} 수정된 일정
 */
export const updateCalendarSchedule = async (calendarId, scheduleData) => {
  const response = await instance.patch(`/api/v1/admin/calendar/${calendarId}`, scheduleData);

  return response.data?.data;
};

/**
 * (관리자) 캘린더 일정 삭제 (복수 선택)
 * @param {number[]} calendarIds - 삭제할 일정 ID 목록 (최소 1개)
 * @returns {Promise}
 */
export const deleteCalendarSchedules = (calendarIds) =>
  instance.delete('/api/v1/admin/calendar', { params: { calendarIds } });
