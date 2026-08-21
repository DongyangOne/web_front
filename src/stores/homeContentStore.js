import { create } from 'zustand';
import { ACTIVITY_LIST, TIMELINE_LIST, RECRUIT_INFO_LIST } from '@/constants/homeData';

const formatMonth = (dateText) => (dateText ? dateText.slice(0, 7).replace('-', '.') : '');

const mapActivityCards = (activityCards) => {
  if (!Array.isArray(activityCards) || activityCards.length === 0) return null;

  return [...activityCards]
    .sort((a, b) => a.cardOrder - b.cardOrder)
    .map((card, index) => ({
      icon: ACTIVITY_LIST[index % ACTIVITY_LIST.length].icon,
      title: card.title,
      description: card.content,
    }));
};

const mapProjectDetails = (projectDetails) => {
  if (!Array.isArray(projectDetails) || projectDetails.length === 0) return null;

  return projectDetails.map((project, index) => ({
    year: project.year,
    projectName: project.projectName,
    award: project.award,
    activity: project.activity,
    side: index % 2 === 0 ? 'right' : 'left',
    period: `${formatMonth(project.startDate)} - ${formatMonth(project.endDate)}`,
    memberCount: project.participantCount ?? null,
    techStack: project.techStacks ?? [],
    description: project.description,
    images: (project.photos ?? []).map((photo) => photo.url),
  }));
};

/**
 * 메인페이지 콘텐츠(주요 활동/ONE 활동 현황/신입 부원 모집) 전역 상태.
 * 초기값은 homeData.jsx의 정적 배열이며, setHomeContent로 방문자 메인페이지 API(GET /api/v1/visitor/main)
 * 응답을 반영해 덮어쓴다.
 */
const useHomeContentStore = create((set) => ({
  logoUrl: '',
  mainDescription: '',
  activities: ACTIVITY_LIST.map((item) => ({ ...item })),
  timeline: TIMELINE_LIST.map((item) => ({
    ...item,
    techStack: [...item.techStack],
    images: [...item.images],
  })),
  recruitHeading: '단순히 배우는 것을 넘어,\n함께 성장할 ONE의 새로운 부원을 모집합니다.',
  recruitInfoList: RECRUIT_INFO_LIST.map((item) => ({ ...item })),

  setHomeContent: (data) =>
    set((state) => {
      if (!data) return state;

      const activities = mapActivityCards(data.activityCards);
      const timeline = mapProjectDetails(data.projectDetails);

      return {
        logoUrl: data.logoUrl ?? state.logoUrl,
        mainDescription: data.mainDescription ?? state.mainDescription,
        activities: activities ?? state.activities,
        timeline: timeline ?? state.timeline,
      };
    }),

  updateActivity: (index, patch) =>
    set((state) => ({
      activities: state.activities.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    })),

  updateTimelineItem: (index, patch) =>
    set((state) => ({
      timeline: state.timeline.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    })),
  deleteTimelineItem: (index) =>
    set((state) => ({
      timeline: state.timeline.filter((_, i) => i !== index),
    })),
  addTimelineItem: (item) =>
    set((state) => ({
      timeline: [...state.timeline, item],
    })),

  updateRecruitContent: (heading, values) =>
    set((state) => ({
      recruitHeading: heading,
      recruitInfoList: state.recruitInfoList.map((item, i) => ({ ...item, value: values[i] })),
    })),
}));

export default useHomeContentStore;
