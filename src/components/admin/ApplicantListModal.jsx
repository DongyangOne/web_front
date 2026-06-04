/**
 * 신청 부원 목록 모달.
 * 신청서를 제출한 부원 목록(이름/학번)을 보여주고, 행의 '선택'을 누르면
 * 해당 부원 정보를 등록 폼으로 가져온다. 세로 스크롤되며 우측 '선택' 열은 피치 배경이다.
 * @param {Object} props
 * @param {Array} props.applicants - 신청 부원 목록 ({ id, name, studentId, ... })
 * @param {Function} props.onSelect - 행 '선택' 클릭 시 해당 부원 객체로 호출
 * @param {Function} props.onClose - 닫기(×) 또는 배경 클릭 시 호출
 */
function ApplicantListModal({ applicants, onSelect, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onClick={onClose}
    >
      <div
        className="flex h-[599px] w-[513px] flex-col overflow-hidden rounded-modal bg-white shadow-md"
        onClick={(event) => event.stopPropagation()}
      >
        {/* 헤더: 제목(가운데) + 닫기(×, 우측) */}
        <div className="relative flex h-[85px] shrink-0 items-center justify-center">
          <h2 className="text-lg font-bold text-ink">신청 부원 목록</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="absolute right-6 text-ink"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 목록: 세로 스크롤. 우측 '선택' 열은 피치 배경(brand-soft). */}
        <ul className="flex-1 overflow-y-auto border-t border-solid border-line">
          {applicants.map((applicant) => (
            <li
              key={applicant.id}
              className="grid grid-cols-applicants items-stretch border-b border-solid border-line text-sm text-ink"
            >
              <span className="flex items-center justify-center py-3.5">{applicant.name}</span>
              <span className="flex items-center justify-center py-3.5">{applicant.studentId}</span>
              <button
                type="button"
                onClick={() => onSelect(applicant)}
                className="flex items-center justify-center bg-brand-soft text-brand hover:bg-brand/10"
              >
                선택
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ApplicantListModal;
