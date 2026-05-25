import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/constants/theme';

/**
 * 현재 뷰포트가 모바일인지 여부를 반환하는 훅.
 * Three.js 성능 옵션 분기에 활용한다.
 * @returns {boolean} 모바일이면 true
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < BREAKPOINTS.md
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

export default useIsMobile;
