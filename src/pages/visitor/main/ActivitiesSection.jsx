import useScrollReveal from '@/hooks/useScrollReveal';
import { ACTIVITY_LIST } from '@/constants/homeData';

export default function ActivitiesSection() {
  const revealRef = useScrollReveal();

  return (
    <section className="py-20 px-6 bg-brand-soft">
      <div className="max-w-[960px] mx-auto">
        {/* 섹션 헤더 */}
        <div ref={revealRef} className="reveal-up text-center mb-14">
          <span className="block text-brand text-sm mb-4">▼</span>
          <h2 className="text-3xl font-bold text-ink m-0">주요 활동</h2>
        </div>

        {/* 2×2 카드 그리드 */}
        <div className="grid grid-cols-2 gap-5">
          {ACTIVITY_LIST.map((activity, index) => (
            <div
              key={activity.title}
              ref={revealRef}
              className="reveal-up bg-white rounded-2xl p-12 border border-[#EDCFBC] flex flex-col items-center text-center"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* 원형 아이콘 컨테이너 */}
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-7 bg-brand-soft">
                <img
                  src={activity.icon}
                  alt={activity.title}
                  className="w-[100px] h-[100px] object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-ink mb-5">{activity.title}</h3>
              <p className="text-sm text-ink-sub leading-7 m-0 whitespace-pre-line">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
