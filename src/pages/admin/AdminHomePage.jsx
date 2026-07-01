import Header from '@/components/layout/Header';
import HeroSection from '@/pages/visitor/main/HeroSection';
import AdminActivitiesSection from '@/pages/admin/AdminActivitiesSection';
import AdminTimelineSection from '@/pages/admin/AdminTimelineSection';
import AdminRecruitSection from '@/pages/admin/AdminRecruitSection';

/**
 * 관리자용 홈 화면.
 * 방문자 HomePage와 동일한 섹션 구성을 admin 히든 경로에서 재사용하되,
 * '주요 활동'/'ONE 활동 현황'/'신입 부원 모집' 섹션은 수정이 가능한 관리자 전용 버전을 사용한다.
 */
function AdminHomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <AdminActivitiesSection />
      <AdminTimelineSection />
      <AdminRecruitSection />
    </>
  );
}

export default AdminHomePage;
