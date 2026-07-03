import HeroScene from '@/three/scenes/HeroScene';

// clamp()는 Tailwind 임의 값으로 표현 불가 → inline 유지
const ONE_LETTER_BASE_STYLE = {
  fontSize: 'clamp(5rem, 16vw, 12rem)',
  fontWeight: 900,
  letterSpacing: '-0.04em',
  display: 'inline-block',
  textShadow: '0 4px 24px rgba(196,120,64,0.18)',
};

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #FAE5D0 0%, #F5D4B8 40%, #FAEADA 100%)' }}
    >
      {/* Three.js 캔버스 – 스크롤을 막지 않도록 pointer-events 차단 */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroScene />
      </div>

      {/* 배경 워터마크 */}
      <span
        aria-hidden="true"
        className="absolute bottom-[-20px] right-[-10px] select-none pointer-events-none leading-none font-black"
        style={{ fontSize: 'clamp(8rem, 20vw, 18rem)', color: 'rgba(196,120,64,0.08)' }}
      >
        ONE
      </span>

      {/* 메인 텍스트 */}
      <div className="relative z-10 text-center px-6">
        <div className="flex items-end justify-center gap-[0.1em] leading-none mb-8">
          {[
            { char: 'O', color: '#FF6B00' },
            { char: 'N', color: '#C47840', transform: 'translateY(-0.12em) scale(0.82)' },
            { char: 'E', color: '#FF6B00' },
          ].map(({ char, color, transform }) => (
            <span key={char} style={{ ...ONE_LETTER_BASE_STYLE, color, transform }}>
              {char}
            </span>
          ))}
        </div>

        <p
          className="flex items-center justify-center gap-2 font-medium text-[#7A4A28]"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)' }}
        >
          아이디어를 현실로 구현하는 공간,
          <strong className="text-brand">ONE</strong>
        </p>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#C47840] text-xs font-medium opacity-70">
        <span>scroll</span>
        <div
          className="w-[1.5px] h-10 rounded-sm animate-scroll-pulse"
          style={{ background: 'linear-gradient(to bottom, #FF6B00, transparent)' }}
        />
      </div>
    </section>
  );
}
