import { useCallback, useEffect, useState } from 'react';
import { getVisitorMain } from '@/apis/home';
import useHomeContentStore from '@/stores/homeContentStore';

import HeroSection from './main/HeroSection';
import ActivitiesSection from './main/ActivitiesSection';
import TimelineSection from './main/TimelineSection';
import RecruitSection from './main/RecruitSection';

export default function HomePage() {
  const setHomeContent = useHomeContentStore((state) => state.setHomeContent);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let ignore = false;
    setHasError(false);

    getVisitorMain()
      .then((data) => {
        if (ignore) return;
        setHomeContent(data);
      })
      .catch((error) => {
        if (ignore) return;
        console.error('메인페이지 콘텐츠 조회 실패', error);
        setHasError(true);
      });

    return () => {
      ignore = true;
    };
  }, [setHomeContent, retryCount]);

  const handleRetry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  return (
    <>
      {hasError && (
        <div>
          콘텐츠를 불러오지 못했습니다.
          <button type="button" onClick={handleRetry}>
            다시 시도
          </button>
        </div>
      )}
      <HeroSection />
      <ActivitiesSection />
      <TimelineSection />
      <RecruitSection />
    </>
  );
}
