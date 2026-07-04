import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import useAuthStore from '@/stores/authStore';
import useHomeContentStore from '@/stores/homeContentStore';
import editIcon from '@/assets/images/editicon.svg';
import deleteIcon from '@/assets/images/deleteicon.svg';

function toMonthInputValue(monthText) {
  return monthText ? monthText.trim().replace('.', '-') : '';
}

function parsePeriod(period) {
  const trimmed = (period || '').trim();
  if (!trimmed) return { periodStart: '', periodEnd: '' };
  if (trimmed.endsWith('-')) {
    return { periodStart: toMonthInputValue(trimmed.slice(0, -1)), periodEnd: '' };
  }
  if (trimmed.startsWith('-')) {
    return { periodStart: '', periodEnd: toMonthInputValue(trimmed.slice(1)) };
  }
  const [start, end] = trimmed.split('-').map((part) => part.trim());
  return { periodStart: toMonthInputValue(start), periodEnd: toMonthInputValue(end) };
}

function formatPeriod(periodStart, periodEnd) {
  const start = periodStart ? periodStart.replace('-', '.') : '';
  const end = periodEnd ? periodEnd.replace('-', '.') : '';
  if (start && end) return `${start} - ${end}`;
  if (start) return `${start} -`;
  if (end) return `- ${end}`;
  return '';
}

const EMPTY_EVENT = {
  year: '',
  projectName: '',
  award: '',
  activity: '',
  period: '',
  memberCount: null,
  techStack: [],
  description: '',
  images: [],
};

const TimelineEditForm = forwardRef(function TimelineEditForm({ event, onSave, onCancel, showSaveButton = false }, ref) {
  const [year, setYear] = useState(event.year);
  const [projectName, setProjectName] = useState(event.projectName);
  const [award, setAward] = useState(event.award);
  const [activity, setActivity] = useState(event.activity);
  const initialPeriod = parsePeriod(event.period);
  const [periodStart, setPeriodStart] = useState(initialPeriod.periodStart);
  const [periodEnd, setPeriodEnd] = useState(initialPeriod.periodEnd);
  const [memberCount, setMemberCount] = useState(
    event.memberCount === null || event.memberCount === undefined ? '' : String(event.memberCount)
  );
  const [techStack, setTechStack] = useState(event.techStack.length > 0 ? [...event.techStack] : ['']);
  const [description, setDescription] = useState(event.description);
  const [images, setImages] = useState([...event.images]);
  const createdObjectUrlsRef = useRef(new Set());

  useEffect(() => {
    const createdObjectUrls = createdObjectUrlsRef.current;
    return () => {
      createdObjectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const inputClass = 'w-full rounded-md border border-line px-3 py-2 text-sm text-ink';

  const handleMemberCountChange = (value) => {
    setMemberCount(value.replace(/\D/g, ''));
  };

  const handleTechStackChange = (index, value) => {
    setTechStack((previous) => previous.map((tech, i) => (i === index ? value : tech)));
  };

  const handleTechStackKeyDown = (index, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setTechStack((previous) => [...previous.slice(0, index + 1), '', ...previous.slice(index + 1)]);
    }
  };

  const handleAddTechStack = () => {
    setTechStack((previous) => [...previous, '']);
  };

  const handleRemoveTechStack = (index) => {
    setTechStack((previous) => previous.filter((_, i) => i !== index));
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }
    const url = URL.createObjectURL(file);
    createdObjectUrlsRef.current.add(url);
    setImages((previous) => [...previous, url]);
  };

  const handleRemoveImage = (index) => {
    setImages((previous) => {
      const removed = previous[index];
      if (createdObjectUrlsRef.current.has(removed)) {
        URL.revokeObjectURL(removed);
        createdObjectUrlsRef.current.delete(removed);
      }
      return previous.filter((_, i) => i !== index);
    });
  };

  const handleSave = () => {
    if (periodStart && periodEnd && periodStart > periodEnd) {
      alert('기간 설정이 잘못되었습니다.');
      return;
    }

    const validTechStack = techStack.map((tech) => tech.trim()).filter(Boolean);
    if (validTechStack.length === 0) {
      alert('기술 스택을 입력해주세요.');
      return;
    }

    createdObjectUrlsRef.current.clear();
    onSave({
      year,
      projectName,
      award,
      activity,
      period: formatPeriod(periodStart, periodEnd),
      memberCount: memberCount === '' ? null : Number(memberCount),
      techStack: validTechStack,
      description,
      images,
    });
  };

  useImperativeHandle(ref, () => ({ requestSave: handleSave }));

  return (
    <div className="flex flex-col gap-4 text-left" onClick={(e) => e.stopPropagation()}>
      <div className="grid grid-cols-2 gap-3">
        <input className={inputClass} value={year} onChange={(e) => setYear(e.target.value)} placeholder="연도" />
        <input
          className={inputClass}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="프로젝트명"
        />
      </div>
      <input className={inputClass} value={award} onChange={(e) => setAward(e.target.value)} placeholder="수상 내역" />
      <input
        className={inputClass}
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        placeholder="주요 활동 요약"
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-ink-sub">기간</span>
          <div className="flex items-center gap-2">
            <input
              type="month"
              className={inputClass}
              value={periodStart}
              onChange={(e) => setPeriodStart(e.target.value)}
            />
            <span className="text-ink-sub">-</span>
            <input
              type="month"
              className={inputClass}
              value={periodEnd}
              onChange={(e) => setPeriodEnd(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-ink-sub">팀원</span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              value={memberCount}
              onChange={(e) => handleMemberCountChange(e.target.value)}
              placeholder="숫자만 입력"
            />
            <span className="shrink-0 text-sm text-ink-sub">명</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-ink-sub">기술 스택</span>
        <div className="flex flex-wrap items-center gap-2">
          {techStack.map((tech, index) => (
            <div key={index} className="flex items-center gap-1 rounded-full bg-brand-soft px-3 py-1">
              <input
                value={tech}
                onChange={(e) => handleTechStackChange(index, e.target.value)}
                onKeyDown={(e) => handleTechStackKeyDown(index, e)}
                placeholder="기술 스택"
                className="w-24 bg-transparent text-xs text-brand outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveTechStack(index)}
                aria-label="기술 스택 삭제"
                className="text-xs text-brand/60"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTechStack}
            aria-label="기술 스택 추가"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-ink-sub"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-ink-sub">프로젝트 소개</span>
        <textarea
          className={`${inputClass} resize-none`}
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="프로젝트 소개를 입력해 주세요."
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-ink-sub">이미지</span>
        <div className="flex gap-3">
          {images.map((src, index) => (
            <div key={index} className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-[#F0F0F0]">
              <img src={src} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                aria-label="이미지 삭제"
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-xs text-white"
              >
                ✕
              </button>
            </div>
          ))}
          {images.length < 3 && (
            <label className="flex h-16 w-24 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-dashed border-line text-xs text-ink-sub">
              이미지 추가
              <input type="file" accept="image/*" className="hidden" onChange={handleAddImage} />
            </label>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="rounded-full border border-line px-5 py-1.5 text-sm text-ink-sub">
          취소
        </button>
        {showSaveButton && (
          <button type="button" onClick={handleSave} className="rounded-full bg-brand px-5 py-1.5 text-sm font-bold text-white">
            저장
          </button>
        )}
      </div>
    </div>
  );
});

function TimelineControls({ isRight, isEditing, onEdit, onDelete }) {
  const editButton = (
    <button
      type="button"
      onClick={onEdit}
      aria-label={isEditing ? '저장' : '수정'}
      className={
        isEditing ? 'whitespace-nowrap text-sm font-bold text-brand' : 'flex h-6 w-6 items-center justify-center'
      }
    >
      {isEditing ? '저장' : <img src={editIcon} alt="" className="h-3.5 w-3.5" />}
    </button>
  );
  const deleteButton = (
    <button type="button" onClick={onDelete} aria-label="삭제" className="flex h-6 w-6 items-center justify-center">
      <img src={deleteIcon} alt="" className="h-4 w-4" />
    </button>
  );

  return (
    <div className="flex shrink-0 items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
      {isRight ? (
        <>
          {editButton}
          {deleteButton}
        </>
      ) : (
        <>
          {deleteButton}
          {editButton}
        </>
      )}
    </div>
  );
}

function TimelineCard({ event, isRight, isEditing, formRef, onSaveEdit, onCancelEdit }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <div
      onClick={() => !isEditing && setIsExpanded((prev) => !prev)}
      onKeyDown={handleKeyDown}
      role={isEditing ? undefined : 'button'}
      tabIndex={isEditing ? undefined : 0}
      aria-expanded={isExpanded}
      className={`relative bg-white rounded-2xl px-9 py-6 border shadow-md transition-all duration-300 ${
        isExpanded ? 'border-brand' : 'border-[#EDCFBC]'
      } ${isRight ? 'text-left' : 'text-right'} ${isEditing ? '' : 'cursor-pointer select-none'}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-6 h-3 w-3 rotate-45 bg-white ${isRight ? '-left-1.5' : '-right-1.5'}`}
      />

      {isEditing ? (
        <TimelineEditForm ref={formRef} event={event} onSave={onSaveEdit} onCancel={onCancelEdit} />
      ) : (
        <>
          <div className={isRight ? '' : 'ml-auto'}>
            <p className="text-sm text-brand font-bold m-0 mb-2">
              {event.year}
              {event.projectName ? `, ${event.projectName}` : ''}
            </p>
            <p className="text-base font-bold text-ink m-0 mb-2">{event.award}</p>
            <p className="text-xs text-[#AAAAAA] m-0">{event.activity}</p>
          </div>

          <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
              isExpanded ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <hr className="border-[#EDCFBC] mb-4" />

            <div className={`flex gap-6 mb-4 text-xs text-ink-sub ${isRight ? '' : 'justify-end'}`}>
              <span className="flex items-center gap-1">
                <span>📅</span> {event.period}
              </span>
              {event.memberCount && (
                <span className="flex items-center gap-1">
                  <span>👥</span> {event.memberCount}명
                </span>
              )}
            </div>

            {event.techStack && event.techStack.length > 0 && (
              <div className={`mb-4 ${isRight ? '' : 'flex flex-col items-end'}`}>
                <p className="text-xs text-[#AAAAAA] m-0 mb-2">기술 스택</p>
                <div className={`flex flex-wrap gap-2 ${isRight ? '' : 'justify-end'}`}>
                  {event.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-brand-soft text-brand text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={`mb-4 ${isRight ? '' : 'text-right'}`}>
              <p className="text-xs text-[#AAAAAA] m-0 mb-2">프로젝트 소개</p>
              <p className="text-sm text-ink leading-6 m-0 whitespace-pre-line">{event.description}</p>
            </div>

            {event.images && event.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-2">
                {event.images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`${event.projectName} 이미지 ${index + 1}`}
                    className="w-full aspect-[4/3] object-cover rounded-lg bg-[#F0F0F0]"
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function TimelineSection({ isEditable = false }) {
  const revealRef = useScrollReveal();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated) && isEditable;
  const timeline = useHomeContentStore((state) => state.timeline);
  const updateTimelineItem = useHomeContentStore((state) => state.updateTimelineItem);
  const deleteTimelineItem = useHomeContentStore((state) => state.deleteTimelineItem);
  const addTimelineItem = useHomeContentStore((state) => state.addTimelineItem);

  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const editFormRefs = useRef({});

  const handleDelete = (index) => {
    if (window.confirm('삭제하시겠습니까?')) {
      deleteTimelineItem(index);
      setEditingIndex((previous) => (previous === index ? null : previous));
    }
  };

  const handleEditButtonClick = (index) => {
    if (editingIndex === index) {
      editFormRefs.current[index]?.requestSave();
    } else {
      setEditingIndex(index);
    }
  };

  const handleSaveNew = (item) => {
    const nextSide = timeline.length % 2 === 0 ? 'right' : 'left';
    addTimelineItem({ ...item, side: nextSide });
    setIsAdding(false);
  };

  return (
    <section className="pt-20 pb-0 px-6 bg-brand-soft">
      <div className="max-w-[1100px] mx-auto">
        {/* 섹션 헤더 */}
        <div ref={revealRef} className="reveal-up text-center mb-16">
          <span className="block text-brand text-sm mb-4">▼</span>
          <h2 className="text-3xl font-bold text-ink m-0">ONE 활동 현황</h2>
        </div>

        {/* 타임라인 본체 */}
        <div className="relative flex flex-col gap-10">
          {/* 중앙 수직선 */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-[1.5px] left-1/2 -translate-x-1/2 bg-brand opacity-50"
          />

          {timeline.map((event, index) => {
            const isRight = event.side === 'right';
            const isEditing = editingIndex === index;
            const card = (
              <TimelineCard
                event={event}
                isRight={isRight}
                isEditing={isEditing}
                formRef={(el) => {
                  editFormRefs.current[index] = el;
                }}
                onSaveEdit={(patch) => {
                  updateTimelineItem(index, patch);
                  setEditingIndex(null);
                }}
                onCancelEdit={() => setEditingIndex(null)}
              />
            );
            const controls = isAuthenticated && (
              <TimelineControls
                isRight={isRight}
                isEditing={isEditing}
                onEdit={() => handleEditButtonClick(index)}
                onDelete={() => handleDelete(index)}
              />
            );

            return (
              <div
                key={`${event.year}-${event.projectName}-${index}`}
                ref={revealRef}
                className="reveal-up grid items-start"
                style={{ gridTemplateColumns: '1fr 40px 1fr', transitionDelay: `${index * 90}ms` }}
              >
                {/* 왼쪽 */}
                <div className="pr-8">
                  {!isRight && (
                    <div className="flex items-start gap-2">
                      {controls}
                      <div className="flex-1">{card}</div>
                    </div>
                  )}
                </div>

                {/* 중앙 도트 */}
                <div className="flex justify-center pt-5">
                  <div className="w-4 h-4 rounded-full flex-shrink-0 bg-brand" />
                </div>

                {/* 오른쪽 */}
                <div className="pl-8">
                  {isRight && (
                    <div className="flex items-start gap-2">
                      <div className="flex-1">{card}</div>
                      {controls}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isAdding && (
            <div className="grid items-start" style={{ gridTemplateColumns: '1fr 40px 1fr' }}>
              <div className="pr-8" />
              <div className="flex justify-center pt-5">
                <div className="w-4 h-4 rounded-full flex-shrink-0 bg-brand" />
              </div>
              <div className="pl-8">
                <div className="relative bg-white rounded-2xl px-9 py-6 shadow-md">
                  <TimelineEditForm
                    event={EMPTY_EVENT}
                    onSave={handleSaveNew}
                    onCancel={() => setIsAdding(false)}
                    showSaveButton
                  />
                </div>
              </div>
            </div>
          )}

          {isAuthenticated && !isAdding && (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="absolute top-full right-0 mt-4 text-sm font-bold text-brand"
            >
              + 프로젝트 추가하기
            </button>
          )}
        </div>

        {/* 하단 연결선 — RecruitSection 점선과 이어짐 */}
        <div className="flex justify-center">
          <div className="w-[1.5px] h-40 bg-brand opacity-50" />
        </div>
      </div>
    </section>
  );
}
