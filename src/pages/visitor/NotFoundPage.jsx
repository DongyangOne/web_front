import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

function NotFoundPage() {
  return (
    <section>
      <h2>404 - 페이지를 찾을 수 없습니다</h2>
      <Link to={ROUTES.HOME}>홈으로 돌아가기</Link>
    </section>
  );
}

export default NotFoundPage;
