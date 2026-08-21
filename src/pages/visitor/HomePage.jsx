import { useEffect } from 'react';
import HeroSection from './main/HeroSection';
import ActivitiesSection from './main/ActivitiesSection';
import TimelineSection from './main/TimelineSection';
import RecruitSection from './main/RecruitSection';
import { getVisitorMain } from '@/apis/home';
import useHomeContentStore from '@/stores/homeContentStore';

export default function HomePage() {
  const setHomeContent = useHomeContentStore((state) => state.setHomeContent);

  useEffect(() => {
    let ignore = false;

    getVisitorMain()
      .then((data) => {
        if (!ignore) setHomeContent(data);
      })
      .catch(() => {});

    return () => {
      ignore = true;
    };
  }, [setHomeContent]);

  return (
    <>
      <HeroSection />
      <ActivitiesSection />
      <TimelineSection />
      <RecruitSection />
    </>
  );
}
