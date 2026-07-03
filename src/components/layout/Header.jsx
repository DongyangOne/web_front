import { NavLink } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { COLORS } from '@/constants/theme';
import calendarBlackIcon from '@/assets/images/Date_today_duotone_line1.svg'; //검정 아이콘
import calendarOrangeIcon from '@/assets/images/Date_today_duotone_line2.svg'; //주황 아이콘

import userBlackIcon from '@/assets/images/User1.svg'; //검정 아이콘
import userOrangeIcon from '@/assets/images/User2.svg'; //주황 아이콘

function Header() {
  return (
    <header className="relative z-10 w-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
      <nav className="flex items-center justify-center gap-20 px-6 py-6">
        <NavLink to={ROUTES.SCHEDULE}>
          {({ isActive }) => (
            <div className="flex items-center gap-3">
              <img
                src={isActive ? calendarOrangeIcon : calendarBlackIcon}
                alt=""
                className="h-10 w-10 object-contain"
              />

              <span
                className="text-xl font-medium"
                style={{
                  color: isActive ? COLORS.orange : '#000000',
                }}
              >
                연간 계획
              </span>
            </div>
          )}
        </NavLink>

        <NavLink to={ROUTES.RECRUIT}>
          {({ isActive }) => (
            <div className="flex items-center gap-3">
              <img
                src={isActive ? userOrangeIcon : userBlackIcon}
                alt=""
                className="h-10 w-10 object-contain"
              />

              <span
                className="text-xl font-medium"
                style={{
                  color: isActive ? COLORS.orange : '#000000',
                }}
              >
                신입 부원 모집
              </span>
            </div>
          )}
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
