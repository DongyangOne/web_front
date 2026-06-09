import { useRef, useEffect } from 'react';

/**
 * IntersectionObserver로 요소가 뷰포트에 진입하면 'revealed' 클래스를 추가한다.
 * global.css의 .reveal-up / .revealed 클래스와 함께 사용.
 * @returns {Function} ref 콜백 — 감시할 DOM 요소에 ref={revealRef} 로 전달
 */
export default function useScrollReveal() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };
}
