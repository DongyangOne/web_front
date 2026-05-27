import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/visitor/HomePage';
import RecruitPage from '@/pages/visitor/RecruitPage';
import SchedulePage from '@/pages/visitor/SchedulePage';
import AboutPage from '@/pages/visitor/AboutPage';
import AdminPage from '@/pages/admin/AdminPage';
import ApplicantListPage from '@/pages/admin/ApplicantListPage';  //어드민페이지 추가
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
        <Route path={ROUTES.ADMIN_APPLICANTS} element={<ApplicantListPage />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
