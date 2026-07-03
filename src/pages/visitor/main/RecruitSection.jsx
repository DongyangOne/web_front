import { Link } from 'react-router-dom';

import useScrollReveal from '@/hooks/useScrollReveal';
import { RECRUIT_INFO_LIST } from '@/constants/homeData';
import { ROUTES } from '@/constants/routes';

export default function RecruitSection() {
  const revealRef = useScrollReveal();

  return (
    <section className="pb-28 px-6 bg-brand-soft">
      {/* 타임라인에서 이어지는 점선 */}
      <div className="flex justify-center pt-0 mb-20">
        <div
          className="w-[1.5px] h-24 opacity-50"
          style={{
            background:
              'repeating-linear-gradient(to bottom, #FF6B00 0px, #FF6B00 6px, transparent 6px, transparent 12px)',
          }}
        />
      </div>

      <div ref={revealRef} className="reveal-up max-w-[680px] mx-auto text-center">
        {/* 메인 카피 */}
        <h2
          className="font-bold text-ink leading-relaxed mb-12"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}
        >
          단순히 배우는 것을 넘어,
          <br />
          함께 성장할 <span className="text-brand">ONE</span>의 새로운 부원을 모집합니다.
        </h2>

        {/* 모집 정보 – 카드 없이 텍스트 나열 */}
        <div className="mb-14 space-y-3">
          {RECRUIT_INFO_LIST.map(({ label, value }) => (
            <p key={label} className="text-base text-[#555] m-0">
              {label}: {value}
            </p>
          ))}
        </div>

        <Link
          to={ROUTES.RECRUIT}
          className="inline-flex items-center gap-3 bg-brand text-white rounded-full px-12 py-4 text-base font-bold no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,107,0,0.45)]"
        >
          지원하기
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M3.5 9h11M10 5l4 4-4 4"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
