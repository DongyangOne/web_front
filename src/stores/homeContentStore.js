import { create } from 'zustand';
import { ACTIVITY_LIST, TIMELINE_LIST, RECRUIT_INFO_LIST } from '@/constants/homeData';

/**
 * 메인페이지 콘텐츠(주요 활동/ONE 활동 현황/신입 부원 모집) 전역 상태.
 * 백엔드 API가 아직 없어 homeData.jsx의 정적 배열을 초기값으로 복사해 사용한다.
 * 새로고침 시 초기값으로 되돌아간다(영구 저장 아님).
 */
const useHomeContentStore = create((set) => ({
  activities: ACTIVITY_LIST.map((item) => ({ ...item })),
  timeline: TIMELINE_LIST.map((item) => ({
    ...item,
    techStack: [...item.techStack],
    images: [...item.images],
  })),
  recruitHeading: '단순히 배우는 것을 넘어,\n함께 성장할 ONE의 새로운 부원을 모집합니다.',
  recruitInfoList: RECRUIT_INFO_LIST.map((item) => ({ ...item })),

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

  updateRecruitHeading: (heading) => set({ recruitHeading: heading }),
  updateRecruitInfoItem: (index, value) =>
    set((state) => ({
      recruitInfoList: state.recruitInfoList.map((item, i) => (i === index ? { ...item, value } : item)),
    })),
}));

export default useHomeContentStore;
