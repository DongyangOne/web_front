import { useCallback, useEffect, useState } from 'react';

import { getApplicantDetail, getApplicantList } from '@/apis/applicant';
import { APPLICANT_PAGE_SIZE } from '@/constants/member';
import Pagination from '@/components/admin/Pagination';
import AlertModal from '@/components/admin/AlertModal';
import memberGroupIcon from '@/assets/images/member-group.svg';
import searchIcon from '@/assets/images/search.svg';

const TD_CLASS = 'h-[89px] border-b border-line text-[20px] font-normal text-ink';

// 화면에는 5명씩 보여주지만, 서버 size는 15로 고정이라 15개씩 받아서 5개씩 3페이지로 쪼갠다.
const DISPLAY_PAGE_SIZE = 5;
const SERVER_PAGES_PER_GROUP = APPLICANT_PAGE_SIZE / DISPLAY_PAGE_SIZE;

const GENDER_LABEL = {
  MALE: '남',
  FEMALE: '여',
};

function formatAppliedDate(isoString) {
  const date = new Date(isoString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}

/**
 * 신청 부원 조회 페이지.
 * admin 히든 경로 하위에서 동작하며, 최근 1년 신청 부원 목록을 조회한다.
 * 서버 size는 15로 고정되어 있어 15개씩 받아오고, 화면에는 5명씩 나눠 보여준다
 * (페이지 3개당 한 번씩 서버에서 새로 받아옴).
 */
function RecruitManagePage() {
  const [serverContent, setServerContent] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const serverPageIndex = Math.floor((currentPage - 1) / SERVER_PAGES_PER_GROUP);

  // 신청 부원 목록 조회. 화면 페이지가 다음 서버 묶음(15개)으로 넘어갈 때만 새로 받아온다.
  const fetchApplicants = useCallback(async () => {
    try {
      const paging = await getApplicantList({
        page: serverPageIndex,
        size: APPLICANT_PAGE_SIZE,
      });
      setServerContent(paging?.content ?? []);
      setTotalElements(paging?.totalElements ?? 0);
    } catch (error) {
      console.error('[RecruitManagePage] 신청 부원 목록 조회 실패', error);
      setServerContent([]);
      setTotalElements(0);
      setAlertMessage('신청 부원 목록을 불러오지 못했습니다.\n잠시 후 다시 시도해주세요.');
    }
  }, [serverPageIndex]);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  const totalPages = Math.max(1, Math.ceil(totalElements / DISPLAY_PAGE_SIZE));
  const offsetWithinServerPage = ((currentPage - 1) % SERVER_PAGES_PER_GROUP) * DISPLAY_PAGE_SIZE;
  const applicants = serverContent.slice(
    offsetWithinServerPage,
    offsetWithinServerPage + DISPLAY_PAGE_SIZE
  );

  // 정보조회: 신청 부원 상세 정보 API를 호출해 상세 모달에 보여준다.
  const handleOpenDetail = async (applicant) => {
    try {
      const detail = await getApplicantDetail(applicant.applicantId);
      setSelectedApplicant(detail);
    } catch (error) {
      console.error('[RecruitManagePage] 신청 부원 상세 조회 실패', error);
      setAlertMessage('상세 정보를 불러오지 못했습니다.\n잠시 후 다시 시도해주세요.');
    }
  };

  const handleCloseDetail = () => setSelectedApplicant(null);

  return (
    <section className="min-h-[calc(100vh-112px)] bg-brand-soft px-[5.75rem] py-7 max-lg:px-6">
      <div className="relative mx-auto min-h-[842px] max-w-[1254px] rounded-card bg-white px-[60px] pt-[52px] pb-[28px] shadow-card">
        <div className="mb-6 flex items-start justify-between gap-8 max-lg:flex-col">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-28 w-40 items-center justify-center">
                <img
                  src={memberGroupIcon}
                  alt=""
                  className="h-[165px] w-[248px] max-w-none object-contain"
                />
              </div>
              <p className="-mt-2 whitespace-nowrap text-[24px] font-[350] text-ink">
                총 <span className="text-brand">{totalElements}</span>명
              </p>
            </div>
            <h1 className="text-[40px] font-bold text-ink">신청 부원 조회</h1>
          </div>
          <p className="self-end text-[18px] text-ink-sub max-lg:self-auto">
            최근 1년 동안 신청한 부원의 정보만 조회 가능합니다
          </p>
        </div>

        <div className="overflow-hidden rounded-card border border-tag max-lg:overflow-x-auto">
          <table className="w-full min-w-[900px] table-fixed border-collapse text-center text-[20px] text-ink">
            <colgroup>
              <col className="w-[15%]" />
              <col className="w-[10%]" />
              <col className="w-[14%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
              <col className="w-[21%]" />
            </colgroup>
            <thead className="bg-brand-soft">
              <tr>
                <th className="h-16 text-[24px] font-[350]">NO</th>
                <th className="h-16 text-[24px] font-[350]">이름</th>
                <th className="h-16 text-[24px] font-[350]">학번</th>
                <th className="h-16 text-[24px] font-[350]">전화번호</th>
                <th className="h-16 text-[24px] font-[350]">신청날짜</th>
                <th className="h-16 text-[24px] font-[350]">정보조회</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant, index) => (
                <tr key={applicant.applicantId}>
                  <td className={TD_CLASS}>
                    <span className="relative inline-block">
                      {(currentPage - 1) * DISPLAY_PAGE_SIZE + index + 1}
                      {applicant.isFirstView && (
                        <span className="absolute left-full top-1/2 ml-3 -translate-y-1/2 inline-flex h-[18px] w-[19px] items-center justify-center rounded-sm bg-brand text-[14px] font-bold text-white">
                          N
                        </span>
                      )}
                    </span>
                  </td>
                  <td className={TD_CLASS}>{applicant.name}</td>
                  <td className={TD_CLASS}>{applicant.studentId}</td>
                  <td className={TD_CLASS}>{applicant.phoneNum}</td>
                  <td className={TD_CLASS}>{formatAppliedDate(applicant.createdAt)}</td>
                  <td className={TD_CLASS}>
                    <button
                      type="button"
                      className="inline-flex h-[56px] w-[56px] items-center justify-center rounded-full bg-brand-soft text-brand"
                      onClick={() => handleOpenDetail(applicant)}
                    >
                      <img src={searchIcon} alt="" className="h-[27px] w-[27px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {selectedApplicant && (
        <div
          className="fixed inset-x-0 bottom-0 top-[112px] flex items-center justify-center bg-line/[0.78] p-8"
          onClick={handleCloseDetail}
        >
          <section
            className="relative max-h-[555px] w-full max-w-[514px] overflow-y-auto rounded-modal bg-white px-[36px] pt-[48px] pb-[32px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-6 top-6 text-[32px]"
              onClick={handleCloseDetail}
            >
              ×
            </button>

            <dl className="grid gap-7">
              {[
                ['이름', selectedApplicant.name],
                ['학번', selectedApplicant.studentId],
                ['학과', selectedApplicant.department],
                ['생년월일', selectedApplicant.birthday],
                ['전화번호', selectedApplicant.phoneNumber],
                ['학년', selectedApplicant.grade],
                ['성별', GENDER_LABEL[selectedApplicant.gender] ?? selectedApplicant.gender],
                ['지원동기', selectedApplicant.motivation],
                ['사용해봤거나 들어본 언어 및 라이브러리', selectedApplicant.techStack],
                ['동아리에서 해 보고 싶은 것', selectedApplicant.desiredActivity],
                ['마지막으로 하고 싶은 말', selectedApplicant.finalWords],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[8.5rem_1fr] gap-6 max-sm:grid-cols-1">
                  <dt className="text-[18px] font-bold text-brand/70">{label}</dt>
                  <dd className="m-0 text-[20px] leading-[1.5] text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      )}

      {alertMessage && (
        <AlertModal message={alertMessage} onConfirm={() => setAlertMessage(null)} />
      )}
    </section>
  );
}

export default RecruitManagePage;
