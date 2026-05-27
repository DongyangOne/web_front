import { NavLink } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      {/* 로고 클릭 시 메인 페이지로 이동 */}      
      <NavLink to={ROUTES.HOME} className={styles.title}>
        ONE
      </NavLink>

      <nav className={styles.nav} aria-label="주요 메뉴">
        <NavLink
          to={ROUTES.SCHEDULE}
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M7 2v3" />
            <path d="M17 2v3" />
            <path d="M4 8h16" />
            <rect x="4" y="5" width="16" height="17" rx="2" />
          </svg>
          <span>연간 계획</span>
        </NavLink>

        <NavLink
          to={ROUTES.RECRUIT}
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M5 22a7 7 0 0 1 14 0" />
          </svg>
          <span>신입 부원 모집</span>
        </NavLink>

        {/* 관리자 확인용 임시 메뉴 */}
        <NavLink
          to={ROUTES.ADMIN_APPLICANTS}
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          <span className={styles.smallMenu}>
            신청 부원 조회
          </span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;