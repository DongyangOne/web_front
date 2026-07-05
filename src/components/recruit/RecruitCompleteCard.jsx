import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getMainRecruitment } from '@/apis/recruit';
import { ROUTES } from '@/constants/routes';

const COMPLETE_MESSAGE = '회장의 연락을 통해 면접 일정이 조정될 예정이오니, 잠시 기다려 주세요.';

const EMPTY_RECRUITMENT_NOTICE = '모집 공고 정보를 불러오지 못했습니다.';

const formatKoreanDate = (dateText, shouldIncludeYear = true) => {
  if (!dateText) return '';

  const [year, month, day] = dateText.split('-');
  if (!year || !month || !day) return dateText;

  const formattedMonth = Number(month);
  const formattedDay = Number(day);
  const monthDayText = `${formattedMonth}월 ${formattedDay}일`;

  return shouldIncludeYear ? `${year}년 ${monthDayText}` : monthDayText;
};

const createDateRangeText = (startDate, endDate) => {
  if (!startDate && !endDate) return '';
  if (!startDate) return formatKoreanDate(endDate);
  if (!endDate || startDate === endDate) return formatKoreanDate(startDate);

  const startYear = startDate.split('-')[0];
  const endYear = endDate.split('-')[0];
  const shouldShowEndYear = startYear !== endYear;

  return `${formatKoreanDate(startDate)} ~ ${formatKoreanDate(endDate, shouldShowEndYear)}`;
};

const RecruitCompleteCard = () => {
  const [recruitment, setRecruitment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRecruitmentError, setHasRecruitmentError] = useState(false);

  useEffect(() => {
    const fetchMainRecruitment = async () => {
      try {
        const response = await getMainRecruitment();
        setRecruitment(response.data?.data ?? null);
        setHasRecruitmentError(false);
      } catch (error) {
        console.error('[RecruitCompleteCard] 모집 공고 조회 실패', error);
        setHasRecruitmentError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMainRecruitment();
  }, []);

  const interviewPeriod = createDateRangeText(
    recruitment?.interviewStart,
    recruitment?.interviewEnd
  );
  const notificationDate = formatKoreanDate(recruitment?.notificationDate);
  const contactText = [recruitment?.bossName, recruitment?.contactNumber].filter(Boolean).join(' ');

  return (
    <div className="mx-auto flex min-h-[620px] w-full max-w-[1253px] items-center justify-center rounded-[28px] bg-white px-5 py-12 shadow-recruit-complete sm:min-h-[700px] sm:rounded-[38px] sm:px-8 lg:min-h-[802px] lg:rounded-[50px]">
      <div className="w-full max-w-[1040px] text-center text-ink">
        <h2 className="whitespace-nowrap text-[clamp(32px,8vw,64px)] font-bold leading-tight">
          <span className="text-brand">신청</span>이 <span className="text-brand">접수</span>
          되었습니다!
        </h2>

        <div className="mx-auto mt-9 w-full max-w-[650px] space-y-5 text-left text-[clamp(16px,4.8vw,27px)] font-light leading-[1.45] sm:mt-12 sm:space-y-6 lg:mt-[54px] lg:w-fit lg:max-w-full lg:space-y-[29px] lg:leading-[1.35]">
          {isLoading && <p className="text-center">모집 공고 정보를 불러오는 중입니다.</p>}

          {!isLoading && hasRecruitmentError && (
            <p className="text-center text-error" role="alert">
              {EMPTY_RECRUITMENT_NOTICE}
            </p>
          )}

          {!isLoading && !hasRecruitmentError && recruitment && (
            <>
              {interviewPeriod && (
                <p className="lg:whitespace-nowrap">
                  <span className="font-normal text-brand">면접 기간: </span>
                  {interviewPeriod}
                </p>
              )}
              {notificationDate && (
                <p className="lg:whitespace-nowrap">
                  <span className="font-normal text-brand">합격 통보: </span>
                  {notificationDate} 예정{' '}
                  <span className="text-[clamp(13px,3.4vw,24px)] text-ink-sub">
                    (해당 일정은 변동될 수 있습니다.)
                  </span>
                </p>
              )}
              {recruitment.roomLocation && (
                <p className="lg:whitespace-nowrap">
                  <span className="font-normal text-brand">면접 장소: </span>
                  {recruitment.roomLocation}
                </p>
              )}
            </>
          )}

          <p className="pt-8 lg:whitespace-nowrap lg:pt-[42px]">{COMPLETE_MESSAGE}</p>
          {contactText && <p className="lg:whitespace-nowrap">문의: 회장 {contactText}</p>}
        </div>

        <Link
          to={ROUTES.HOME}
          className="mx-auto mt-12 flex h-[46px] w-[190px] items-center justify-center rounded-[25px] bg-brand text-[16px] font-bold text-white sm:h-[52px] sm:w-[220px] sm:text-[18px] lg:mt-[70px] lg:h-[56px] lg:w-[250px] lg:rounded-[18px] lg:text-[20px]"
        >
          메인으로
        </Link>
      </div>
    </div>
  );
};

export default RecruitCompleteCard;
