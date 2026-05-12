import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

function Header() {
  return (
    <header>
      <nav>
        <Link to={ROUTES.HOME}>ONE</Link>
        <Link to={ROUTES.ABOUT}>동아리 소개</Link>
        <Link to={ROUTES.SCHEDULE}>연간 계획</Link>
        <Link to={ROUTES.RECRUIT}>모집 신청</Link>
      </nav>
    </header>
  );
}

export default Header;
