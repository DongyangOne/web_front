import { useCallback, useEffect, useState } from 'react';
import ActivitiesSection from '@/pages/visitor/main/ActivitiesSection';
import TimelineSection from '@/pages/visitor/main/TimelineSection';
import RecruitSection from '@/pages/visitor/main/RecruitSection';
import { getVisitorMain } from '@/apis/home';
import useHomeContentStore from '@/stores/homeContentStore';
import { HOME_CONTENT_FETCH_ERROR_MESSAGE } from '@/constants/messages';

import HeroSection from '../visitor/main/HeroSection';

/**
 * 관리자 홈 콘텐츠 관리 페이지.
 * 주요 활동/ONE 활동 현황/신입 부원 모집 섹션을 그대로 재사용한다.
 * isEditable을 켜서 렌더링하므로, 관리자 로그인 상태(isAuthenticated)일 때만 수정/삭제 아이콘을 노출한다.
 * 방문자용 HomePage는 isEditable을 넘기지 않아 로그인 여부와 무관하게 항상 일반 화면만 보인다.
 */
function AdminPage() {
  const setHomeContent = useHomeContentStore((state) => state.setHomeContent);
  const [status, setStatus] = useState('loading');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let ignore = false;
    setStatus('loading');

    getVisitorMain()
      .then((data) => {
        if (ignore) return;
        setHomeContent(data);
        setStatus('success');
      })
      .catch((error) => {
        if (ignore) return;
        console.error('[AdminPage] 메인페이지 콘텐츠 조회 실패', error);
        setStatus('error');
      });

    return () => {
      ignore = true;
    };
  }, [setHomeContent, retryCount]);

  const handleRetry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  if (status === 'loading') {
    return <section>콘텐츠를 불러오는 중입니다...</section>;
  }

  if (status === 'error') {
    return (
      <section>
        {HOME_CONTENT_FETCH_ERROR_MESSAGE}
        <button type="button" onClick={handleRetry}>
          다시 시도
        </button>
      </section>
    );
  }

  return (
    <section>
      <HeroSection />
      <ActivitiesSection isEditable />
      <TimelineSection isEditable />
      <RecruitSection isEditable />
    </section>
  );
}

export default AdminPage;