/**
 * 명부 목록 페이지네이션.
 * @param {Object} props
 * @param {number} props.currentPage - 현재 페이지(1부터)
 * @param {number} props.totalPages - 전체 페이지 수
 * @param {Function} props.onPageChange - 페이지 변경 핸들러
 */
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePrev = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

  return (
    <div className="mt-10 flex items-center justify-center gap-5 text-xl">
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="text-ink disabled:opacity-30"
        aria-label="이전 페이지"
      >
        <ChevronLeftIcon />
      </button>
      {pageNumbers.map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? 'font-bold text-brand' : 'text-ink'}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="text-ink disabled:opacity-30"
        aria-label="다음 페이지"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default Pagination;
