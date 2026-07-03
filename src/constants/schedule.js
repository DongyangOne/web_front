export const SCHEDULES = [
  { startDate: '2026-03-01', endDate: '2026-03-01', title: '삼일절' },
  { startDate: '2026-03-02', endDate: '2026-03-02', title: '삼일절 대체휴일' },
  { startDate: '2026-03-03', endDate: '2026-03-03', title: '[2026학년도 1학기] 개강' },
  { startDate: '2026-03-06', endDate: '2026-03-09', title: '수강신청 정정' },
  {
    startDate: '2026-03-16',
    endDate: '2026-03-16',
    title: '졸업보류, 졸업유예 등록',
    status: '완료',
  },
  { startDate: '2026-04-01', endDate: '2026-04-01', title: '학기개시 후 30일차' },
  { startDate: '2026-04-15', endDate: '2026-04-16', title: '삽입절' },
  { startDate: '2026-04-21', endDate: '2026-04-21', title: 'Expo' },
  { startDate: '2026-04-30', endDate: '2026-04-30', title: '사이드 프로젝트 발표' },
  { startDate: '2026-04-30', endDate: '2026-04-30', title: 'Expo', status: '완료' },
  { startDate: '2026-05-05', endDate: '2026-05-05', title: '어린이날' },
  { startDate: '2026-05-11', endDate: '2026-05-11', title: '동아리 정기 회의' },
  { startDate: '2026-05-15', endDate: '2026-05-15', title: '프로젝트 중간 점검' },
  { startDate: '2026-05-22', endDate: '2026-05-22', title: '기술 세미나' },
  { startDate: '2026-05-29', endDate: '2026-05-29', title: '월간 회고' },
];

export const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
export const MONTH_OPTIONS = Array.from({ length: 12 }, (_, index) => index);
export const CLUB_START_YEAR = 2022;

export const VIEW_MODE = {
  CALENDAR: 'calendar',
  ALL: 'all',
};

export const DROPDOWN_TYPE = {
  MONTH: 'month',
  YEAR: 'year',
};
