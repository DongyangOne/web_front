import { useState } from 'react';
import { Link } from 'react-router-dom';

import useScrollReveal from '@/hooks/useScrollReveal';
import { ROUTES } from '@/constants/routes';
import useAuthStore from '@/stores/authStore';
import useHomeContentStore from '@/stores/homeContentStore';
import editIcon from '@/assets/images/editicon.svg';

function highlightOne(text) {
  if (typeof text !== 'string') return null;
  return text.split('\n').map((line, lineIndex) => (
    <span key={lineIndex}>
      {lineIndex > 0 && <br />}
      {line.split(/(ONE)/g).map((chunk, chunkIndex) =>
        chunk === 'ONE' ? (
          <span key={chunkIndex} className="text-brand">
            {chunk}
          </span>
        ) : (
          chunk
        )
      )}
    </span>
  ));
}

function RecruitEditForm({ heading, infoList, onSave, onCancel }) {
  const [headingValue, setHeadingValue] = useState(heading);
  const [values, setValues] = useState(infoList.map((item) => item.value));

  const handleValueChange = (index, value) => {
    setValues((previous) => previous.map((item, i) => (i === index ? value : item)));
  };

  return (
    <div className="mx-auto flex max-w-[560px] flex-col gap-3 text-left">
      <textarea
        value={headingValue}
        onChange={(event) => setHeadingValue(event.target.value)}
        rows={2}
        maxLength={100}
        className="resize-none rounded-md border border-line px-3 py-2 text-center text-base font-bold text-ink"
      />

      {infoList.map((item, index) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="w-20 shrink-0 text-right text-sm text-ink-sub">{item.label}</span>
          <input
            value={values[index]}
            onChange={(event) => handleValueChange(index, event.target.value)}
            maxLength={50}
            className="flex-1 rounded-md border border-line px-3 py-2 text-sm text-ink"
          />
        </div>
      ))}

      <div className="mt-2 flex justify-center gap-3">
        <button type="button" onClick={onCancel} className="rounded-full border border-line px-5 py-1.5 text-sm text-ink-sub">
          취소
        </button>
        <button
          type="button"
          onClick={() => onSave(headingValue, values)}
          className="rounded-full bg-brand px-5 py-1.5 text-sm font-bold text-white"
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default function RecruitSection({ isEditable = false }) {
  const revealRef = useScrollReveal();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated) && isEditable;
  const recruitHeading = useHomeContentStore((state) => state.recruitHeading);
  const recruitInfoList = useHomeContentStore((state) => state.recruitInfoList);
  const updateRecruitContent = useHomeContentStore((state) => state.updateRecruitContent);

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (heading, values) => {
    updateRecruitContent(heading, values);
    setIsEditing(false);
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

      <div ref={revealRef} className="reveal-up relative max-w-[680px] mx-auto text-center">
        {isAuthenticated && !isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label="수정"
            className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full hover:bg-brand-soft"
          >
            <img src={editIcon} alt="" className="h-3.5 w-3.5" />
          </button>
        )}

        {isEditing ? (
          <RecruitEditForm heading={recruitHeading} infoList={recruitInfoList} onSave={handleSave} onCancel={() => setIsEditing(false)} />
        ) : (
          <>
            {/* 메인 카피 */}
            <h2
              className="break-words font-bold text-ink leading-relaxed mb-12"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}
            >
              {highlightOne(recruitHeading)}
            </h2>

            {/* 모집 정보 – 카드 없이 텍스트 나열 */}
            <div className="mb-14 space-y-3">
              {recruitInfoList.map(({ label, value }) => (
                <p key={label} className="break-words text-base text-[#555] m-0">
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
          </>
        )}
      </div>
    </section>
  );
}
