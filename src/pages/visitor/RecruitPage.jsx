import { useState } from 'react';

import Button from '@/components/common/Button';

import styles from './RecruitPage.module.css';

// 신청 흐름을 단계별로 보여주기 위한 표시용 데이터
const STEPS = [
  '기본정보 입력',
  '지원정보 입력',
  '개인정보 동의',
  '신청 완료',
];

// 폼 초기 상태를 한 곳에서 관리해서 초기화/확장 쉽게 처리
const INITIAL_FORM = {
  name: '',
  major: '',
  studentId: '',
  birthDate: '',
  grade: '',
  phone: '',
  gender: '',
  motivation: '',
  skills: '',
  clubGoal: '',
  lastMessage: '',
  privacyAgreed: false,
};

function RecruitPage() {
  // 현재 사용자가 어느 단계에 있는지 관리
  const [currentStep, setCurrentStep] = useState(0);

  // 입력값 전체를 한 객체로 관리
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    // 작성 중 페이지를 벗어날 경우 입력 데이터 유실 여부 확인용
    localStorage.setItem('recruitFormDirty', 'true');

    let nextValue =
      type === 'checkbox' ? checked : value;

    // 전화번호 입력 형식을 자동으로 맞춰서 사용자 입력 부담 줄임
    if (name === 'phone') {
      const onlyNumbers = value.replace(
        /[^0-9]/g,
        ''
      );

      if (onlyNumbers.length <= 3) {
        nextValue = onlyNumbers;
      } else if (onlyNumbers.length <= 7) {
        nextValue = `${onlyNumbers.slice(
          0,
          3
        )}-${onlyNumbers.slice(3)}`;
      } else {
        nextValue = `${onlyNumbers.slice(
          0,
          3
        )}-${onlyNumbers.slice(
          3,
          7
        )}-${onlyNumbers.slice(7, 11)}`;
      }
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: nextValue,
    }));
  };

  // 다음 단계 이동
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // 이전 단계 이동
  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // 신청 완료 후 작성 상태 정리 후 메인으로 이동
  const handleMoveHome = () => {
    localStorage.removeItem('recruitFormDirty');
    window.location.href = '/';
  };

  return (
    <section className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <p className={styles.category}>
            ONE 신입 부원 모집
          </p>

          <h1>신입 부원 모집 신청</h1>
        </div>

        {/* 현재 진행 단계 시각적으로 표시 */}
        <ol
          className={styles.stepList}
          aria-label="신청 단계"
        >
          {STEPS.map((step, index) => (
            <li
              key={step}
              className={
                index <= currentStep
                  ? `${styles.step} ${styles.activeStep}`
                  : styles.step
              }
            >
              <span>{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>

        {/* 1단계: 기본정보 */}
        {currentStep === 0 && (
          <div className={styles.stepContent}>
            <div className={styles.sectionTitle}>
              <h2>
                기본정보를 입력해 주세요.
              </h2>

              <p>
                신청자 확인을 위해 필요한
                정보를 정확히 입력해 주세요.
              </p>
            </div>

            <div className={styles.formGrid}>
              <label className={styles.field}>
                이름 *
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="이름 입력"
                />
              </label>

              <label className={styles.field}>
                학과 *
                {/* 현재 학과 선택지는 디자인 단계 기준 임시 고정 */}
                <select
                  name="major"
                  value={form.major}
                  onChange={handleChange}
                >
                  <option value="">
                    학과를 선택해 주세요.
                  </option>

                  <option value="웹응용소프트웨어공학과">
                    웹응용소프트웨어공학과
                  </option>
                </select>
              </label>

              <label className={styles.field}>
                학번 *
                <input
                  name="studentId"
                  value={form.studentId}
                  onChange={handleChange}
                  placeholder="20251234"
                />
              </label>

              <label className={styles.field}>
                생년월일 *
                <input
                  type="date"
                  name="birthDate"
                  value={form.birthDate}
                  onChange={handleChange}
                />
              </label>

              <label className={styles.field}>
                학년 *
                <input
                  name="grade"
                  value={form.grade}
                  onChange={handleChange}
                  placeholder="1"
                />
              </label>

              <label className={styles.field}>
                전화번호 *
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  maxLength={13}
                />
              </label>

              <div
                className={`${styles.field} ${styles.fullField}`}
              >
                <span>성별 *</span>

                <div className={styles.genderGroup}>
                  <label
                    className={styles.radioLabel}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={
                        form.gender === 'male'
                      }
                      onChange={handleChange}
                    />
                    남자
                  </label>

                  <label
                    className={styles.radioLabel}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={
                        form.gender === 'female'
                      }
                      onChange={handleChange}
                    />
                    여자
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.actionArea}>
              <Button onClick={handleNext}>
                제출하기
              </Button>
            </div>
          </div>
        )}

        {/* 2단계: 지원정보 */}
        {currentStep === 1 && (
          <div className={styles.stepContent}>
            <div className={styles.sectionTitle}>
              <h2>
                지원정보를 입력해 주세요.
              </h2>

              <p>
                지원 정보를 작성해 주세요.
              </p>
            </div>

            <div className={styles.formGrid}>
              <label
                className={`${styles.field} ${styles.fullField}`}
              >
                지원 동기 *
                <textarea
                  name="motivation"
                  value={form.motivation}
                  onChange={handleChange}
                  placeholder="지원 동기를 작성해 주세요."
                />
              </label>

              <label className={styles.field}>
                사용해봤거나 들어본 언어 및 라이브러리 *
                <input
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="예) React, Java"
                />
              </label>

              <label className={styles.field}>
                동아리에서 해 보고 싶은 것 *
                <input
                  name="clubGoal"
                  value={form.clubGoal}
                  onChange={handleChange}
                  placeholder="예) 프로젝트"
                />
              </label>

              <label
                className={`${styles.field} ${styles.fullField}`}
              >
                마지막으로 하고 싶은 말
                <input
                  name="lastMessage"
                  value={form.lastMessage}
                  onChange={handleChange}
                  placeholder="자유롭게 작성해 주세요."
                />
              </label>
            </div>

            <div className={styles.actionArea}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={handlePrevious}
              >
                이전
              </button>

              <Button onClick={handleNext}>
                제출하기
              </Button>
            </div>
          </div>
        )}

        {/* 3단계: 개인정보 동의 */}
        {currentStep === 2 && (
          <div className={styles.stepContent}>
            <div className={styles.sectionTitle}>
              <h2>
                개인정보 수집 및 이용 동의
              </h2>

              <p>
                신청 진행을 위해 아래 내용을
                확인해 주세요.
              </p>
            </div>

            <div className={styles.privacyBox}>
              <dl>
                <div>
                  <dt>수집 항목</dt>
                  <dd>
                    이름, 학과, 학번,
                    생년월일, 전화번호,
                    학년, 성별, 지원 동기,
                    기술 스택, 활동 목표
                  </dd>
                </div>

                <div>
                  <dt>수집 목적</dt>
                  <dd>
                    신입부원 선발 및
                    동아리 활동 운영
                  </dd>
                </div>

                <div>
                  <dt>보유 기간</dt>
                  <dd>
                    지원 일자로부터 1년
                  </dd>
                </div>

                <div>
                  <dt>안내 사항</dt>
                  <dd>
                    동의하지 않을 시
                    불이익이 있을 수
                    있습니다.
                  </dd>
                </div>
              </dl>
            </div>

            <label className={styles.checkField}>
              <input
                type="checkbox"
                name="privacyAgreed"
                checked={form.privacyAgreed}
                onChange={handleChange}
              />

              개인정보 수집 및 이용에
              동의합니다.
            </label>

            <div className={styles.actionArea}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={handlePrevious}
              >
                이전
              </button>

              <Button onClick={handleNext}>
                신청하기
              </Button>
            </div>
          </div>
        )}

        {/* 4단계: 완료 화면 */}
        {currentStep === 3 && (
          <div
            className={`${styles.stepContent} ${styles.completeContent}`}
          >
            <div className={styles.completeMark}>
              완료
            </div>

            <h2>
              신청이 접수되었습니다!
            </h2>

            <p>
              면접 일정 및 결과는
              추후 공지될 예정입니다.
            </p>

            <div className={styles.actionArea}>
              <Button onClick={handleMoveHome}>
                메인으로 이동
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecruitPage;