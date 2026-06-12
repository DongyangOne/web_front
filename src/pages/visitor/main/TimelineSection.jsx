import useScrollReveal from '@/hooks/useScrollReveal';
import { TIMELINE_LIST } from '@/constants/homeData';

function TimelineCard({ event, isRight }) {
  return (
    <div
      className={`bg-white rounded-2xl px-7 py-5 border border-[#EDCFBC] ${isRight ? 'text-left' : 'text-right'}`}
    >
      <p className="text-sm text-brand font-bold m-0 mb-1">
        {event.year}
        {event.projectName ? `, ${event.projectName}` : ''}
      </p>
      <p className="text-base font-bold text-ink m-0 mb-1">{event.award}</p>
      <p className="text-xs text-[#AAAAAA] m-0">{event.activity}</p>
    </div>
  );
}

export default function TimelineSection() {
  const revealRef = useScrollReveal();

  return (
    <section className="py-20 px-6 bg-brand-soft">
      <div className="max-w-[860px] mx-auto">
        {/* 섹션 헤더 */}
        <div ref={revealRef} className="reveal-up text-center mb-16">
          <span className="block text-brand text-sm mb-4">▼</span>
          <h2 className="text-3xl font-bold text-ink m-0">ONE 활동 현황</h2>
        </div>

        {/* 타임라인 본체 */}
        <div className="relative">
          {/* 중앙 수직선 */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-[1.5px] left-1/2 -translate-x-1/2 bg-brand opacity-50"
          />

          {TIMELINE_LIST.map((event, index) => {
            const isRight = event.side === 'right';
            return (
              <div
                key={`${event.year}-${event.projectName}`}
                ref={revealRef}
                className="reveal-up grid items-center mb-10"
                style={{ gridTemplateColumns: '1fr 40px 1fr', transitionDelay: `${index * 90}ms` }}
              >
                {/* 왼쪽 */}
                <div className="pr-8">{!isRight && <TimelineCard event={event} isRight={false} />}</div>

                {/* 중앙 솔리드 도트 */}
                <div className="flex justify-center">
                  <div className="w-4 h-4 rounded-full flex-shrink-0 bg-brand" />
                </div>

                {/* 오른쪽 */}
                <div className="pl-8">{isRight && <TimelineCard event={event} isRight={true} />}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
