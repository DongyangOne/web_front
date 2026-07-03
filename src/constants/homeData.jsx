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
    period: '2023.03 - 2023.10',
    memberCount: 8,
    techStack: ['Android Studio', 'React Native', 'Spring Boot'],
    description:
      'Around Music는 음악과 AR를 통해 사용자의 순간과 감정을 공유하는 서비스이다.\n음악을 들었던 장소와 시간을 AR로 기록하고,\n주변 사람들이 공유한 음악도 함께 경험할 수 있다.',
    images: [
      'https://picsum.photos/seed/around1/400/225',
      'https://picsum.photos/seed/around2/400/225',
      'https://picsum.photos/seed/around3/400/225',
    ],
  },
  {
    year: '2024',
    projectName: 'Motion Kiosk',
    award: '동양미래 EXPO 장려상',
    activity: '2024 하계 MT · 정기 세미나 및 튜터링 운영',
    side: 'left',
    period: '2024.03 - 2024.10',
    memberCount: 10,
    techStack: ['React', 'Spring Boot', 'MediaPipe'],
    description:
      'Motion Kiosk는 손동작 인식을 활용한 비접촉 키오스크 서비스이다.\n카메라로 손의 움직임을 감지하여 터치 없이 메뉴를 조작할 수 있다.',
    images: [
      'https://picsum.photos/seed/kiosk1/400/225',
      'https://picsum.photos/seed/kiosk2/400/225',
      'https://picsum.photos/seed/kiosk3/400/225',
    ],
  },
  {
    year: '2025',
    projectName: 'AInterview',
    award: '동양미래 EXPO 장려상',
    activity: '2025 하계 MT · 정기 세미나 및 튜터링 운영',
    side: 'right',
    period: '2025.03 - 2025.10',
    memberCount: 9,
    techStack: ['React', 'FastAPI', 'OpenAI API'],
    description:
      'AInterview는 AI 면접관과 실전처럼 면접을 연습할 수 있는 서비스이다.\n답변을 분석하고 피드백을 제공하여 취업 준비를 돕는다.',
    images: [
      'https://picsum.photos/seed/ainterview1/400/225',
      'https://picsum.photos/seed/ainterview2/400/225',
      'https://picsum.photos/seed/ainterview3/400/225',
    ],
  },
  {
    year: '2026',
    projectName: '',
    award: '동양미래 EXPO 출품 준비 중',
    activity: '2026 하계 MT · 정기 세미나 및 튜터링 운영',
    side: 'left',
    period: '2026.03 - 2026.10',
    memberCount: null,
    techStack: [],
    description: '현재 프로젝트를 기획 중입니다.',
    images: [],
  },
];

export const RECRUIT_INFO_LIST = [
  { label: '지원 대상', value: '웹응용소프트웨어공학과 1, 2학년' },
  { label: '지원 분야', value: 'Backend, Frontend, AI, Design' },
  { label: '신청 기간', value: '2026년 4월 1일 ~ 4월 5일' },
  { label: '면접 기간', value: '2026년 4월 6일 ~ 4월 7일' },
  { label: '합격 통보', value: '2026년 4월 7일 예정 (해당 일정은 변동될 수 있습니다.)' },
];
