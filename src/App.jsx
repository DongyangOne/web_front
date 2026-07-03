import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

import ScrollToTop from '@/components/common/ScrollToTop';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/visitor/HomePage';
import RecruitPage from '@/pages/visitor/RecruitPage';
import RecruitCompletePage from '@/pages/visitor/RecruitCompletePage';
import SchedulePage from '@/pages/visitor/SchedulePage';
import AboutPage from '@/pages/visitor/AboutPage';
import AdminPage from '@/pages/admin/AdminPage';
import RecruitManagePage from '@/pages/admin/RecruitManagePage';
import AdminLogin from '@/pages/admin/AdminLogin';
import MemberPage from '@/pages/admin/MemberPage';
import MemberRegisterPage from '@/pages/admin/MemberRegisterPage';
import MemberEditPage from '@/pages/admin/MemberEditPage';
import NotFoundPage from '@/pages/visitor/NotFoundPage';
import AdminSchedulePage from '@/pages/admin/AdminSchedulePage';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.RECRUIT} element={<RecruitPage />} />
          <Route path={ROUTES.RECRUIT_COMPLETE} element={<RecruitCompletePage />} />
          <Route path={ROUTES.SCHEDULE} element={<SchedulePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.ADMIN} element={<AdminPage />} />
          <Route path={ROUTES.ADMIN_RECRUIT} element={<RecruitManagePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        {/* admin 전용: 방문자 Layout(Header/Footer) 없이 렌더. URL 직접 입력으로만 접근 */}
        <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
        <Route path={ROUTES.ADMIN_MEMBER} element={<MemberPage />} />
        <Route path={ROUTES.ADMIN_MEMBER_REGISTER} element={<MemberRegisterPage />} />
        <Route path={ROUTES.ADMIN_MEMBER_EDIT} element={<MemberEditPage />} />
        <Route path={ROUTES.ADMIN_SCHEDULE} element={<AdminSchedulePage />} />
      </Routes>
    </>
  );
}

export default App;
