import { useState } from 'react';
import memberGroupIcon from '@/assets/images/member-group.svg';
import searchIcon from '@/assets/images/search.svg';

const APPLICANTS = [
  {
    id: 1,
    name: '최현우',
    studentId: '20301234',
    department: '웹응용소프트웨어학과',
    birthDate: '2025.01.01',
    grade: '2',
    phone: '010-1111-2222',
    appliedAt: '2026.08.08',
    motivation:
      '동아리 활동을 하며 실무경험을 길러 보고 싶어 지원하게 되었습니다.',
    usedTool: 'React, Figma',
    goal: '프로젝트 경험 쌓기',
    isNew: false,
  },
  {
    id: 2,
    name: '최현우',
    studentId: '20301234',
    department: '웹응용소프트웨어학과',
    birthDate: '2025.01.01',
    grade: '2',
    phone: '010-1111-2222',
    appliedAt: '2026.08.08',
    motivation:
      '프로젝트를 함께 진행하며 성장하고 싶습니다.',
    usedTool: 'JavaScript',
    goal: '협업 능력 향상',
    isNew: false,
  },
  {
    id: 3,
    name: '최현우',
    studentId: '20301234',
    department: '웹응용소프트웨어학과',
    birthDate: '2025.01.01',
    grade: '2',
    phone: '010-1111-2222',
    appliedAt: '2026.08.08',
    motivation:
      '프론트엔드 개발 경험을 쌓고 싶어 지원했습니다.',
    usedTool: 'HTML, CSS',
    goal: '웹 프로젝트 참여',
    isNew: false,
  },
  {
    id: 4,
    name: '최현우',
    studentId: '20301234',
    department: '웹응용소프트웨어학과',
    birthDate: '2025.01.01',
    grade: '2',
    phone: '010-1111-2222',
    appliedAt: '2026.08.08',
    motivation:
      '팀 프로젝트에서 맡은 역할을 책임감 있게 수행하고 싶습니다.',
    usedTool: 'React',
    goal: '실무 경험 확보',
    isNew: true,
  },
  {
    id: 5,
    name: '최현우',
    studentId: '20301234',
    department: '웹응용소프트웨어학과',
    birthDate: '2025.01.01',
    grade: '2',
    phone: '010-1111-2222',
    appliedAt: '2026.08.08',
    motivation:
      '동아리 활동을 통해 협업과 개발 역량을 키우고 싶습니다.',
    usedTool: 'Figma',
    goal: '포트폴리오 제작',
    isNew: true,
  },
];

const TD_CLASS =
  'h-[89px] border-b border-line text-[20px] font-normal text-ink';

function RecruitManagePage() {
  const [selectedApplicant, setSelectedApplicant] =
    useState(null);

  const handleOpenDetail = (applicant) => setSelectedApplicant(applicant);
  const handleCloseDetail = () => setSelectedApplicant(null);

  return (
    <section className="min-h-[calc(100vh-112px)] bg-brand-soft px-[5.75rem] py-7 max-lg:px-6">
      <div className="mx-auto min-h-[842px] max-w-[1254px] rounded-card bg-white px-[60px] pt-[52px] pb-[28px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">

<div className="mb-6 flex items-start justify-between gap-8 max-lg:flex-col">
  <div className="flex items-center gap-3">
    <img src={memberGroupIcon} alt="" className="flex-shrink-0" />
    <div>
      <h1 className="text-[40px] font-bold text-ink">
        신청 부원 조회
      </h1>
      <p className="text-[24px] font-[350] text-ink">
        총 <span className="text-brand">{APPLICANTS.length}</span>명
      </p>
    </div>
  </div>

  <p className="text-[18px] text-ink-sub self-end max-lg:self-auto">
    최근 1년 동안 신청한 부원의 정보만 조회가능합니다
  </p>
</div>

        <div className="overflow-hidden rounded-[50px] border border-tag max-lg:overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-center text-[20px] text-ink">
            <thead className="bg-brand-soft">
              <tr>
                {[
                  'NO',
                  '이름',
                  '학번',
                  '전화번호',
                  '신청날짜',
                  '정보조회',
                ].map((col) => (
                  <th
                    key={col}
                    className="h-16 text-[24px] font-[350]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {APPLICANTS.map((applicant) => (
                <tr key={applicant.id}>
                  <td className={TD_CLASS}>
                    <span className="inline-flex items-center gap-2">
                      <span className="w-5 text-center">{applicant.id}</span>
                      <span className="inline-flex h-[18px] w-[19px] items-center justify-center">
                        {applicant.isNew && (
                          <span className="inline-flex h-[18px] w-[19px] items-center justify-center rounded-sm bg-brand text-[14px] font-bold text-white">
                            N
                          </span>
                        )}
                      </span>
                    </span>
                  </td>

                  <td className={TD_CLASS}>{applicant.name}</td>
                  <td className={TD_CLASS}>{applicant.studentId}</td>
                  <td className={TD_CLASS}>{applicant.phone}</td>
                  <td className={TD_CLASS}>{applicant.appliedAt}</td>
                                    <td className={TD_CLASS}>
                    <button
                      type="button"
                      className="inline-flex h-[56px] w-[56px] items-center justify-center rounded-full bg-brand-soft text-brand"
                      onClick={() => handleOpenDetail(applicant)}
                    >
                      <img src={searchIcon} alt="" className="w-[27px] h-[27px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav className="mt-8 flex items-center justify-center gap-9">
          <button type="button" aria-label="이전 페이지">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="text-[20px] text-brand">1</button>
          <button type="button" className="text-[20px]">2</button>
          <button type="button" className="text-[20px]">3</button>
          <button type="button" className="text-[20px]">4</button>
          <button type="button" aria-label="다음 페이지">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </nav>
      </div>

      {selectedApplicant && (
        <div
          className="fixed inset-x-0 bottom-0 top-[112px] flex items-center justify-center bg-[rgba(238,238,238,0.78)] p-8"
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
                ['생년월일', selectedApplicant.birthDate],
                ['전화번호', selectedApplicant.phone],
                ['학년', selectedApplicant.grade],
                ['지원동기', selectedApplicant.motivation],
                ['기술 스택', selectedApplicant.usedTool],
                ['활동 목표', selectedApplicant.goal],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[8.5rem_1fr] gap-6 max-sm:grid-cols-1"
                >
                  <dt className="text-[24px] font-bold text-brand">
                    {label}
                  </dt>

                  <dd className="m-0 text-[20px] leading-[1.5] text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      )}
    </section>
  );
}

export default RecruitManagePage;