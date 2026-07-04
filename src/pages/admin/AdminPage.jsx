import ActivitiesSection from '@/pages/visitor/main/ActivitiesSection';
import TimelineSection from '@/pages/visitor/main/TimelineSection';
import RecruitSection from '@/pages/visitor/main/RecruitSection';
import HeroSection from '../visitor/main/HeroSection';

/**
 * 관리자 홈 콘텐츠 관리 페이지.
 * 주요 활동/ONE 활동 현황/신입 부원 모집 섹션을 그대로 재사용한다.
 * isEditable을 켜서 렌더링하므로, 관리자 로그인 상태(isAuthenticated)일 때만 수정/삭제 아이콘을 노출한다.
 * 방문자용 HomePage는 isEditable을 넘기지 않아 로그인 여부와 무관하게 항상 일반 화면만 보인다.
 */
function AdminPage() {
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