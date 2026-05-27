import { useState } from 'react';

import styles from './ApplicantListPage.module.css';

// 퍼블리싱 단계 UI 확인용 임시 신청자 데이터
const MOCK_APPLICANTS = [
  {
    id: 1,
    name: '최현우',
    studentId: '20771234',
    phone: '010-1111-2222',
    appliedAt: '2026.08.08',
    isNew: false,
    major: '웹응용소프트웨어공학과',
    gender: '남',
    birthDate: '2005.01.01',
    grade: '2',
    motivation:
      '동아리 활동을 하며 실무 경험을 길러 보고 싶어 지원했습니다.',
    skills: 'React, JavaScript, Java',
    goal: '프로젝트 경험 쌓기',
    message: '잘 부탁드립니다.',
  },
  {
    id: 2,
    name: '최우현',
    studentId: '20774567',
    phone: '010-0000-0000',
    appliedAt: '2026.08.10',
    isNew: true,
    major: '웹응용소프트웨어공학과',
    gender: '남',
    birthDate: '2004.03.12',
    grade: '3',
    motivation:
      '실제 협업 프로젝트를 경험해 보고 싶습니다.',
    skills: 'Python, React',
    goal: '협업 능력 향상',
    message: '열심히 하겠습니다.',
  },
  {
    id: 3,
    name: '우현최',
    studentId: '20779876',
    phone: '010-2222-3333',
    appliedAt: '2026.08.12',
    isNew: true,
    major: '웹응용소프트웨어공학과',
    gender: '여',
    birthDate: '2005.06.20',
    grade: '1',
    motivation:
      '개발 공부를 더 깊게 해보고 싶습니다.',
    skills: 'HTML, CSS',
    goal: '웹 프로젝트 참여',
    message: '잘 부탁드립니다.',
  },
];

function ApplicantListPage() {
  // 상세 정보 모달에 표시할 신청자 데이터
  const [selectedApplicant, setSelectedApplicant] =
    useState(null);

  return (
    <section className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h1>신청 부원 조회</h1>

          <p>
            총 {MOCK_APPLICANTS.length}명
          </p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>no</th>
                <th>이름</th>
                <th>학번</th>
                <th>전화번호</th>
                <th>신청날짜</th>
                <th>정보조회</th>
              </tr>
            </thead>

            <tbody>
              {MOCK_APPLICANTS.map(
                (applicant, index) => (
                  <tr key={applicant.id}>
                    <td>
                      {index + 1}
                    </td>

                    <td>
                      <div
                        className={
                          styles.nameCell
                        }
                      >
                        {/* 신규 신청자 구분용 표시 */}
                        {applicant.isNew && (
                          <span
                            className={
                              styles.newBadge
                            }
                          >
                            N
                          </span>
                        )}

                        {applicant.name}
                      </div>
                    </td>

                    <td>
                      {
                        applicant.studentId
                      }
                    </td>

                    <td>
                      {applicant.phone}
                    </td>

                    <td>
                      {
                        applicant.appliedAt
                      }
                    </td>

                    <td>
                      <button
                        type="button"
                        className={
                          styles.viewButton
                        }
                        onClick={() =>
                          setSelectedApplicant(
                            applicant
                          )
                        }
                      >
                        🔍
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <p className={styles.notice}>
          최근 1년 동안 신청한 부원의 정보만
          조회 가능합니다.
        </p>
      </div>

      {/* 신청자 선택 시 상세 정보 모달 표시 */}
      {selectedApplicant && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() =>
                setSelectedApplicant(null)
              }
            >
              ×
            </button>

            <h2>신청자 상세 정보</h2>

            <div className={styles.detailGrid}>
              <div>
                <strong>이름</strong>
                <span>
                  {
                    selectedApplicant.name
                  }
                </span>
              </div>

              <div>
                <strong>학번</strong>
                <span>
                  {
                    selectedApplicant.studentId
                  }
                </span>
              </div>

              <div>
                <strong>학과</strong>
                <span>
                  {
                    selectedApplicant.major
                  }
                </span>
              </div>

              <div>
                <strong>성별</strong>
                <span>
                  {
                    selectedApplicant.gender
                  }
                </span>
              </div>

              <div>
                <strong>생년월일</strong>
                <span>
                  {
                    selectedApplicant.birthDate
                  }
                </span>
              </div>

              <div>
                <strong>전화번호</strong>
                <span>
                  {
                    selectedApplicant.phone
                  }
                </span>
              </div>

              <div>
                <strong>학년</strong>
                <span>
                  {
                    selectedApplicant.grade
                  }
                </span>
              </div>

              <div className={styles.fullWidth}>
                <strong>지원동기</strong>
                <span>
                  {
                    selectedApplicant.motivation
                  }
                </span>
              </div>

              <div className={styles.fullWidth}>
                <strong>기술 스택</strong>
                <span>
                  {
                    selectedApplicant.skills
                  }
                </span>
              </div>

              <div className={styles.fullWidth}>
                <strong>활동 목표</strong>
                <span>
                  {
                    selectedApplicant.goal
                  }
                </span>
              </div>

              <div className={styles.fullWidth}>
                <strong>마지막 하고 싶은 말</strong>
                <span>
                  {
                    selectedApplicant.message
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ApplicantListPage;