import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

function RecruitCompleteCard() {
  return (
    <div className="mx-auto flex min-h-[620px] w-full max-w-[1253px] items-center justify-center rounded-[28px] bg-white px-5 py-12 shadow-recruit-complete sm:min-h-[700px] sm:rounded-[38px] sm:px-8 lg:min-h-[802px] lg:rounded-[50px]">
      <div className="w-full max-w-[1040px] text-center text-ink">
        <h2 className="whitespace-nowrap text-[clamp(32px,8vw,64px)] font-bold leading-tight">
          <span className="text-brand">신청</span>이 <span className="text-brand">접수</span>
          되었습니다!
        </h2>

        <div className="mx-auto mt-9 w-full max-w-[650px] space-y-5 text-left text-[clamp(16px,4.8vw,27px)] font-light leading-[1.45] sm:mt-12 sm:space-y-6 lg:mt-[54px] lg:w-fit lg:max-w-full lg:space-y-[29px] lg:leading-[1.35]">
          <p className="lg:whitespace-nowrap">
            <span className="font-normal text-brand">면접 기간: </span>
            2026년 4월 6일 ~ 4월 7일
          </p>
          <p className="lg:whitespace-nowrap">
            <span className="font-normal text-brand">합격 통보: </span>
            2026년 4월 7일 예정{' '}
            <span className="text-[clamp(13px,3.4vw,24px)] text-ink-sub">
              (해당 일정은 변동될 수 있습니다.)
            </span>
          </p>
          <p className="lg:whitespace-nowrap">
            <span className="font-normal text-brand">면접 장소: </span>
            3-511호 ONE 동아리방
          </p>

          <p className="pt-8 lg:whitespace-nowrap lg:pt-[42px]">
            회장의 연락을 통해 면접 일정이 조정될 예정이오니, 잠시 기다려 주세요.
          </p>
          <p className="lg:whitespace-nowrap">문의: 회장 최예은 010-1111-1111</p>
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
}

export default RecruitCompleteCard;
