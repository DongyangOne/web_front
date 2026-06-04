import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/visitor/HomePage';
import RecruitPage from '@/pages/visitor/RecruitPage';
import SchedulePage from '@/pages/visitor/SchedulePage';
import AboutPage from '@/pages/visitor/AboutPage';
import AdminPage from '@/pages/admin/AdminPage';
import MemberPage from '@/pages/admin/MemberPage';
import MemberRegisterPage from '@/pages/admin/MemberRegisterPage';
import MemberEditPage from '@/pages/admin/MemberEditPage';
import NotFoundPage from '@/pages/visitor/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.RECRUIT} element={<RecruitPage />} />
        <Route path={ROUTES.SCHEDULE} element={<SchedulePage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.ADMIN} element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* admin 명부 관리: 방문자 Layout(Header/Footer) 없이 렌더 */}
      <Route path={ROUTES.ADMIN_MEMBER} element={<MemberPage />} />
      <Route path={ROUTES.ADMIN_MEMBER_REGISTER} element={<MemberRegisterPage />} />
      <Route path={ROUTES.ADMIN_MEMBER_EDIT} element={<MemberEditPage />} />
    </Routes>
  );
}

export default App;
