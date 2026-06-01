import { useState } from 'react';

import styles from './AdminPage.module.css';

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
    motivation: '동아리 활동을 하며 실무경험을 길러 보고 싶어 지원하게 되었습니다.',
    usedTool: 'React, Figma',
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
    motivation: '프로젝트를 함께 진행하며 성장하고 싶습니다.',
    usedTool: 'JavaScript',
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
    motivation: '프론트엔드 개발 경험을 쌓고 싶어 지원했습니다.',
    usedTool: 'HTML, CSS',
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
    motivation: '팀 프로젝트에서 맡은 역할을 책임감 있게 수행하고 싶습니다.',
    usedTool: 'React',
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
    motivation: '동아리 활동을 통해 협업과 개발 역량을 키우고 싶습니다.',
    usedTool: 'Figma',
    isNew: true,
  },
];

function AdminPage() {
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const handleOpenDetail = (applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleCloseDetail = () => {
    setSelectedApplicant(null);
  };

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <svg className={styles.peopleIcon} viewBox="0 0 72 56" aria-hidden="true">
              <circle cx="28" cy="16" r="11" />
              <path d="M8 52c0-15 9-25 20-25s20 10 20 25" />
              <circle cx="51" cy="19" r="8" />
              <path d="M43 35c5-5 18-4 21 11" />
            </svg>
            <div>
              <h1>신청 부원 조회</h1>
              <p>
                총 <strong>{APPLICANTS.length}</strong>명
              </p>
            </div>
          </div>

          <p className={styles.notice}>최근 1년 동안 신청한 부원의 정보만 조회 가능합니다</p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>NO</th>
                <th>이름</th>
                <th>학번</th>
                <th>전화번호</th>
                <th>신청날짜</th>
                <th>정보조회</th>
              </tr>
            </thead>
            <tbody>
              {APPLICANTS.map((applicant) => (
                <tr key={applicant.id}>
                  <td>
                    <span className={styles.noCell}>
                      {applicant.id}
                      {applicant.isNew && <span className={styles.newBadge}>N</span>}
                    </span>
                  </td>
                  <td>{applicant.name}</td>
                  <td>{applicant.studentId}</td>
                  <td>{applicant.phone}</td>
                  <td>{applicant.appliedAt}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.detailButton}
                      aria-label={`${applicant.name} 정보 조회`}
                      onClick={() => handleOpenDetail(applicant)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m16 16 5 5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav className={styles.pagination} aria-label="페이지 이동">
          <button type="button" aria-label="이전 페이지">
            ‹
          </button>
          <button type="button" className={styles.currentPage}>
            1
          </button>
          <button type="button">2</button>
          <button type="button">3</button>
          <button type="button">4</button>
          <button type="button" aria-label="다음 페이지">
            ›
          </button>
        </nav>
      </div>

      {selectedApplicant && (
        <div className={styles.modalBackdrop} role="presentation">
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label="신청 부원 상세 정보"
          >
            <button
              type="button"
              className={styles.closeButton}
              aria-label="상세 정보 닫기"
              onClick={handleCloseDetail}
            >
              ×
            </button>

            <dl className={styles.detailList}>
              <div>
                <dt>이름</dt>
                <dd>{selectedApplicant.name}</dd>
              </div>
              <div>
                <dt>학번</dt>
                <dd>{selectedApplicant.studentId}</dd>
              </div>
              <div>
                <dt>학과</dt>
                <dd>{selectedApplicant.department}</dd>
              </div>
              <div>
                <dt>생년월일</dt>
                <dd>{selectedApplicant.birthDate}</dd>
              </div>
              <div>
                <dt>전화번호</dt>
                <dd>{selectedApplicant.phone}</dd>
              </div>
              <div>
                <dt>학년</dt>
                <dd>{selectedApplicant.grade}</dd>
              </div>
              <div>
                <dt>지원동기</dt>
                <dd>{selectedApplicant.motivation}</dd>
              </div>
              <div>
                <dt>사용해봤거나</dt>
                <dd>{selectedApplicant.usedTool}</dd>
              </div>
            </dl>
          </section>
        </div>
      )}
    </section>
  );
}

export default AdminPage;
