import { useRef, useEffect, useCallback } from 'react';

/**
 * IntersectionObserver로 요소가 뷰포트에 진입하면 'revealed' 클래스를 추가한다.
 * global.css의 .reveal-up / .revealed 클래스와 함께 사용.
 * @returns {Function} ref 콜백 — 감시할 DOM 요소에 ref={revealRef} 로 전달
 */
export default function useScrollReveal() {
  const observerRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observerRef.current = observer;

    elementsRef.current.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, []);

  return useCallback((element) => {
    if (!element) return;
    if (!elementsRef.current.includes(element)) {
      elementsRef.current.push(element);
    }
    observerRef.current?.observe(element);
  }, []);
}
