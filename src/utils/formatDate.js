/**
 * ISO 8601 날짜 문자열을 한국어 형식으로 변환
 * @param {string} dateString - ISO 8601 형식의 날짜 문자열
 * @returns {string} "YYYY년 MM월 DD일" 형식
 *
 * @example
 * formatKoreanDate('2026-04-07') // '2026년 04월 07일'
 */
export function formatKoreanDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
}
