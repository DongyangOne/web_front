import mainProject from '@/assets/images/main-project.svg';
import mainStudy from '@/assets/images/main-study.svg';
import mainTutoring from '@/assets/images/main-tutoring.svg';
import mainPlaying from '@/assets/images/main-playing.svg';

export const ACTIVITY_LIST = [
  {
    icon: mainProject,
    title: '프로젝트',
    description: '매년마다 동양미래 EXPO 및 다양한 대회에 출전하며\n프로젝트를 진행합니다.',
  },
  {
    icon: mainStudy,
    title: '스터디',
    description: '전공 지식과 최신 기술을 함께 공부하며\n꾸준한 성장을 목표로 합니다.',
  },
  {
    icon: mainTutoring,
    title: '세미나 및 튜터링',
    description: '선후배 간 지식 공유와 튜터링을 통해\n함께 배우는 문화를 만들어갑니다.',
  },
  {
    icon: mainPlaying,
    title: 'MT 및 회식',
    description: '다양한 친목 활동을 통해\n즐겁고 편안한 동아리 분위기를 만들어갑니다.',
  },
];

export const TIMELINE_LIST = [
  {
    year: '2023',
    projectName: 'Around Music',
    award: '동양미래 EXPO 장려상',
    activity: '2023 하계 MT · 정기 세미나 및 튜터링 운영',
    side: 'right',
  },
  {
    year: '2024',
    projectName: 'Motion Kiosk',
    award: '동양미래 EXPO 장려상',
    activity: '2024 하계 MT · 정기 세미나 및 튜터링 운영',
    side: 'left',
  },
  {
    year: '2025',
    projectName: 'AInterview',
    award: '동양미래 EXPO 장려상',
    activity: '2025 하계 MT · 정기 세미나 및 튜터링 운영',
    side: 'right',
  },
  {
    year: '2026',
    projectName: '',
    award: '동양미래 EXPO 출품 준비중',
    activity: '2026 하계 MT · 정기 세미나 및 튜터링 운영',
    side: 'left',
  },
];

export const RECRUIT_INFO_LIST = [
  { label: '지원 대상', value: '웹응용소프트웨어공학과 1, 2학년' },
  { label: '지원 분야', value: 'Backend, Frontend, AI, Design' },
  { label: '신청 기간', value: '2026년 4월 1일 ~ 4월 5일' },
  { label: '면접 기간', value: '2026년 4월 6일 ~ 4월 7일' },
  { label: '합격 통보', value: '2026년 4월 7일 예정 (해당 일정은 변동될 수 있습니다.)' },
];
