import { useState } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import { TIMELINE_LIST } from '@/constants/homeData';

function TimelineCard({ event, isRight, isExpanded, onToggle }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      className={`bg-white rounded-2xl px-9 py-6 border cursor-pointer select-none transition-all duration-300 ${
        isExpanded ? 'border-brand shadow-md' : 'border-[#EDCFBC] hover:border-brand hover:shadow-sm'
      } ${isRight ? 'text-left' : 'text-right'}`}
    >
      {/* 기본 정보 */}
      <div className={isRight ? '' : 'ml-auto'}>
        <p className="text-sm text-brand font-bold m-0 mb-2">
          {event.year}
          {event.projectName ? `, ${event.projectName}` : ''}
        </p>
        <p className="text-base font-bold text-ink m-0 mb-2">{event.award}</p>
        <p className="text-xs text-[#AAAAAA] m-0">{event.activity}</p>
      </div>

      {/* 펼쳐지는 상세 내용 */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${
          isExpanded ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <hr className="border-[#EDCFBC] mb-4" />

        {/* 기간 / 인원 */}
        <div className={`flex gap-6 mb-4 text-xs text-ink-sub ${isRight ? '' : 'justify-end'}`}>
          <span className="flex items-center gap-1">
            <span>📅</span> {event.period}
          </span>
          {event.memberCount && (
            <span className="flex items-center gap-1">
              <span>👥</span> {event.memberCount}명
            </span>
          )}
        </div>

        {/* 기술 스택 */}
        {event.techStack.length > 0 && (
          <div className={`mb-4 ${isRight ? '' : 'flex flex-col items-end'}`}>
            <p className="text-xs text-[#AAAAAA] m-0 mb-2">기술 스택</p>
            <div className={`flex flex-wrap gap-2 ${isRight ? '' : 'justify-end'}`}>
              {event.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-brand-soft text-brand text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 프로젝트 소개 */}
        <div className={`mb-4 ${isRight ? '' : 'text-right'}`}>
          <p className="text-xs text-[#AAAAAA] m-0 mb-2">프로젝트 소개</p>
          <p className="text-sm text-ink leading-6 m-0 whitespace-pre-line">{event.description}</p>
        </div>

        {/* 이미지 */}
        {event.images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-2">
            {event.images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`${event.projectName} 이미지 ${index + 1}`}
                className="w-full aspect-[4/3] object-cover rounded-lg bg-[#F0F0F0]"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TimelineSection() {
  const revealRef = useScrollReveal();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex((previous) => (previous === index ? null : index));
  };

  return (
    <section className="pt-20 pb-0 px-6 bg-brand-soft">
      <div className="max-w-[1100px] mx-auto">
        {/* 섹션 헤더 */}
        <div ref={revealRef} className="reveal-up text-center mb-16">
          <span className="block text-brand text-sm mb-4">▼</span>
          <h2 className="text-3xl font-bold text-ink m-0">ONE 활동 현황</h2>
        </div>

        {/* 타임라인 본체 */}
        <div className="relative flex flex-col gap-10">
          {/* 중앙 수직선 */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-[1.5px] left-1/2 -translate-x-1/2 bg-brand opacity-50"
          />

          {TIMELINE_LIST.map((event, index) => {
            const isRight = event.side === 'right';
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={`${event.year}-${event.projectName}`}
                ref={revealRef}
                className="reveal-up grid items-start"
                style={{ gridTemplateColumns: '1fr 40px 1fr', transitionDelay: `${index * 90}ms` }}
              >
                {/* 왼쪽 */}
                <div className="pr-8">
                  {!isRight && (
                    <TimelineCard
                      event={event}
                      isRight={false}
                      isExpanded={isExpanded}
                      onToggle={() => handleToggle(index)}
                    />
                  )}
                </div>

                {/* 중앙 도트 */}
                <div className="flex justify-center pt-5">
                  <div className="w-4 h-4 rounded-full flex-shrink-0 bg-brand" />
                </div>

                {/* 오른쪽 */}
                <div className="pl-8">
                  {isRight && (
                    <TimelineCard
                      event={event}
                      isRight={true}
                      isExpanded={isExpanded}
                      onToggle={() => handleToggle(index)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단 연결선 — RecruitSection 점선과 이어짐 */}
        <div className="flex justify-center">
          <div className="w-[1.5px] h-40 bg-brand opacity-50" />
        </div>
      </div>
    </section>
  );
}
