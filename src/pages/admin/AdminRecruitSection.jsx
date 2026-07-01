import { useState } from 'react';
import { Link } from 'react-router-dom';

import { RECRUIT_INFO_LIST } from '@/constants/homeData';
import { ROUTES } from '@/constants/routes';
import editIcon from '@/assets/images/edit1.svg';

const INITIAL_HEADLINE = {
  line1: '단순히 배우는 것을 넘어,',
  line2Prefix: '함께 성장할 ',
  highlight: 'ONE',
  line2Suffix: '의 새로운 부원을 모집합니다.',
};

/**
 * 관리자용 '신입 부원 모집' 섹션.
 * 방문자 RecruitSection과 동일한 레이아웃에 모집 문구/정보 전체를 한 번에 편집하는 기능을 얹는다.
 * TODO: 백엔드 연동 후 모집 공고 API 응답으로 교체 (현재는 homeData 로컬 상태로 관리).
 */
function AdminRecruitSection() {
  const [headline, setHeadline] = useState(INITIAL_HEADLINE);
  const [infoList, setInfoList] = useState(RECRUIT_INFO_LIST);
  const [isEditing, setIsEditing] = useState(false);
  const [draftHeadline, setDraftHeadline] = useState(INITIAL_HEADLINE);
  const [draftInfoList, setDraftInfoList] = useState(RECRUIT_INFO_LIST);

  const handleEditOpen = () => {
    setDraftHeadline(headline);
    setDraftInfoList(infoList);
    setIsEditing(true);
  };

  const handleEditCancel = () => setIsEditing(false);

  const handleEditSave = () => {
    setHeadline(draftHeadline);
    setInfoList(draftInfoList);
    setIsEditing(false);
  };

  const handleInfoChange = (index, field, value) => {
    setDraftInfoList((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item))
    );
  };

  return (
    <section className="pb-28 px-6 bg-brand-soft">
      {/* 타임라인에서 이어지는 점선 */}
      <div className="flex justify-center pt-0 mb-20">
        <div
          className="w-[1.5px] h-24 opacity-50"
          style={{
            background:
              'repeating-linear-gradient(to bottom, #FF6B00 0px, #FF6B00 6px, transparent 6px, transparent 12px)',
          }}
        />
      </div>

      <div className="relative max-w-[680px] mx-auto text-center">
        <button
          type="button"
          onClick={handleEditOpen}
          aria-label="모집 안내 수정"
          className="absolute -top-2 right-0 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-brand-soft"
        >
          <img src={editIcon} alt="" className="h-4 w-4" />
        </button>

        {/* 메인 카피 */}
        <h2
          className="font-bold text-ink leading-relaxed mb-12"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}
        >
          {headline.line1}
          <br />
          {headline.line2Prefix}
          <span className="text-brand">{headline.highlight}</span>
          {headline.line2Suffix}
        </h2>

        {/* 모집 정보 – 카드 없이 텍스트 나열 */}
        <div className="mb-14 space-y-3">
          {infoList.map(({ label, value }) => (
            <p key={label} className="text-sm text-[#555] m-0">
              {label}: {value}
            </p>
          ))}
        </div>

        <Link
          to={ROUTES.RECRUIT}
          className="inline-flex items-center gap-3 bg-brand text-white rounded-full px-12 py-4 text-base font-bold no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,107,0,0.45)]"
        >
          지원하기
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M3.5 9h11M10 5l4 4-4 4"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {isEditing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
          onClick={handleEditCancel}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-solid border-brand/20 bg-white p-8 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="mb-6 text-center text-lg font-bold text-ink">모집 안내 수정</h3>

            <label className="mb-3 block text-sm text-ink-sub">
              문구 첫째 줄
              <input
                type="text"
                value={draftHeadline.line1}
                onChange={(event) =>
                  setDraftHeadline((prev) => ({ ...prev, line1: event.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-ink outline-none focus:border-brand"
              />
            </label>

            <div className="mb-3 flex gap-2">
              <label className="flex-1 text-sm text-ink-sub">
                둘째 줄 (앞)
                <input
                  type="text"
                  value={draftHeadline.line2Prefix}
                  onChange={(event) =>
                    setDraftHeadline((prev) => ({ ...prev, line2Prefix: event.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-ink outline-none focus:border-brand"
                />
              </label>
              <label className="w-24 text-sm text-ink-sub">
                강조 단어
                <input
                  type="text"
                  value={draftHeadline.highlight}
                  onChange={(event) =>
                    setDraftHeadline((prev) => ({ ...prev, highlight: event.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-brand outline-none focus:border-brand"
                />
              </label>
            </div>
            <label className="mb-6 block text-sm text-ink-sub">
              둘째 줄 (뒤)
              <input
                type="text"
                value={draftHeadline.line2Suffix}
                onChange={(event) =>
                  setDraftHeadline((prev) => ({ ...prev, line2Suffix: event.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-ink outline-none focus:border-brand"
              />
            </label>

            <p className="mb-2 text-sm font-bold text-ink">모집 정보</p>
            <div className="mb-6 space-y-2">
              {draftInfoList.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(event) => handleInfoChange(index, 'label', event.target.value)}
                    className="w-24 rounded-lg border border-line px-2 py-2 text-xs text-ink outline-none focus:border-brand"
                  />
                  <input
                    type="text"
                    value={item.value}
                    onChange={(event) => handleInfoChange(index, 'value', event.target.value)}
                    className="flex-1 rounded-lg border border-line px-2 py-2 text-xs text-ink outline-none focus:border-brand"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-6">
              <button
                type="button"
                onClick={handleEditCancel}
                className="flex h-10 w-[150px] items-center justify-center rounded-2xl border border-solid border-brand/25 bg-white text-base font-normal text-brand"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleEditSave}
                className="flex h-10 w-[150px] items-center justify-center rounded-2xl border border-solid border-brand/25 bg-brand text-base font-normal text-white"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminRecruitSection;
