import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import useAuthStore from '@/stores/authStore';
import useHomeContentStore from '@/stores/homeContentStore';
import { createProject, updateProject, deleteProject } from '@/apis/home';
import { uploadFile } from '@/apis/upload';
import editIcon from '@/assets/images/editicon.svg';
import deleteIcon from '@/assets/images/deleteicon.svg';

function toMonthInputValue(monthText) {
  return monthText ? monthText.trim().replace('.', '-') : '';
}

function formatMonth(dateText) {
  return dateText ? dateText.slice(0, 7).replace('-', '.') : '';
}

function toApiDate(monthInputValue) {
  return monthInputValue ? `${monthInputValue}-01` : null;
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
  photoIds: [],
};

const TimelineEditForm = forwardRef(function TimelineEditForm(
  { event, onSave, onCancel, showSaveButton = false, disabled = false },
  ref
) {
  const [year, setYear] = useState(event.year ?? '');
  const [projectName, setProjectName] = useState(event.projectName ?? '');
  const [award, setAward] = useState(event.award ?? '');
  const [activity, setActivity] = useState(event.activity ?? '');
  const initialPeriod = parsePeriod(event.period);
  const [periodStart, setPeriodStart] = useState(initialPeriod.periodStart);
  const [periodEnd, setPeriodEnd] = useState(initialPeriod.periodEnd);
  const [memberCount, setMemberCount] = useState(
    event.memberCount === null || event.memberCount === undefined ? '' : String(event.memberCount)
  );
  const [techStack, setTechStack] = useState(event.techStack.length > 0 ? [...event.techStack] : ['']);
  const [description, setDescription] = useState(event.description ?? '');
  const [photoDrafts, setPhotoDrafts] = useState(
    event.images.map((url, i) => ({ url, id: event.photoIds?.[i] ?? null, file: null }))
  );
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
    setPhotoDrafts((previous) => [...previous, { url, id: null, file }]);
  };

  const handleRemoveImage = (index) => {
    const removed = photoDrafts[index];
    if (removed && createdObjectUrlsRef.current.has(removed.url)) {
      URL.revokeObjectURL(removed.url);
      createdObjectUrlsRef.current.delete(removed.url);
    }
    setPhotoDrafts((previous) => previous.filter((_, i) => i !== index));
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

    onSave({
      year,
      projectName,
      award,
      activity,
      period: formatPeriod(periodStart, periodEnd),
      periodStart,
      periodEnd,
      memberCount: memberCount === '' ? null : Number(memberCount),
      techStack: validTechStack,
      description,
      photoDrafts,
    });
  };

  useImperativeHandle(ref, () => ({ requestSave: handleSave }));

  return (
    <div className="flex flex-col gap-4 text-left" onClick={(e) => e.stopPropagation()}>
      <div className="grid grid-cols-2 gap-3">
        <input
          className={inputClass}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="연도"
          maxLength={9}
        />
        <input
          className={inputClass}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="프로젝트명"
          maxLength={30}
        />
      </div>
      <input
        className={inputClass}
        value={award}
        onChange={(e) => setAward(e.target.value)}
        placeholder="수상 내역"
        maxLength={50}
      />
      <input
        className={inputClass}
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        placeholder="주요 활동 요약"
        maxLength={60}
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-ink-sub">기간</span>
          <div className="flex items-center gap-2">
            <input
              type="month"
              className={`${inputClass} min-w-0 flex-1`}
              value={periodStart}
              onChange={(e) => setPeriodStart(e.target.value)}
            />
            <span className="shrink-0 text-ink-sub">-</span>
            <input
              type="month"
              className={`${inputClass} min-w-0 flex-1`}
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
              maxLength={3}
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
                maxLength={20}
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
          maxLength={300}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-ink-sub">이미지</span>
        <div className="flex gap-3">
          {photoDrafts.map((draft, index) => (
            <div key={index} className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-schedule-scroll-track">
              <img src={draft.url} alt="" className="h-full w-full object-cover" />
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
          {photoDrafts.length < 3 && (
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
          <button
            type="button"
            onClick={handleSave}
            disabled={disabled}
            className="rounded-full bg-brand px-5 py-1.5 text-sm font-bold text-white disabled:opacity-50"
          >
            저장
          </button>
        )}
      </div>
    </div>
  );
});

function TimelineControls({ isRight, isEditing, onEdit, onDelete, disabled = false }) {
  const editButton = (
    <button
      type="button"
      onClick={onEdit}
      disabled={disabled}
      aria-label={isEditing ? '저장' : '수정'}
      className={`disabled:opacity-50 ${
        isEditing ? 'whitespace-nowrap text-sm font-bold text-brand' : 'flex h-6 w-6 items-center justify-center'
      }`}
    >
      {isEditing ? '저장' : <img src={editIcon} alt="" className="h-3.5 w-3.5" />}
    </button>
  );
  const deleteButton = (
    <button
      type="button"
      onClick={onDelete}
      disabled={disabled}
      aria-label="삭제"
      className="flex h-6 w-6 items-center justify-center disabled:opacity-50"
    >
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
            <p className="text-sm text-brand font-bold m-0 mb-2 break-words">
              {event.year}
              {event.projectName ? `, ${event.projectName}` : ''}
            </p>
            <p className="text-base font-bold text-ink m-0 mb-2 break-words">{event.award}</p>
            <p className="text-xs text-[#AAAAAA] m-0 break-words">{event.activity}</p>
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
                      className="max-w-full break-words px-3 py-1 rounded-full bg-brand-soft text-brand text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={`mb-4 ${isRight ? '' : 'text-right'}`}>
              <p className="text-xs text-[#AAAAAA] m-0 mb-2">프로젝트 소개</p>
              <p className="text-sm text-ink leading-6 m-0 whitespace-pre-line break-words">{event.description}</p>
            </div>

            {event.images && event.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-2">
                {event.images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`${event.projectName} 이미지 ${index + 1}`}
                    className="w-full aspect-[4/3] object-cover rounded-lg bg-schedule-scroll-track"
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

  const [editingProjectId, setEditingProjectId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const editFormRefs = useRef({});

  const resolvePhotoKeys = async (photoDrafts) => {
    const keepPhotoIds = [];
    const newPhotoKeys = [];
    for (const draft of photoDrafts) {
      if (draft.id !== null && draft.id !== undefined) {
        keepPhotoIds.push(draft.id);
      } else if (draft.file) {
        const objectKey = await uploadFile('project', draft.file);
        newPhotoKeys.push(objectKey);
      }
    }
    return { keepPhotoIds, newPhotoKeys };
  };

  const toStoreItem = (project, side) => ({
    projectId: project.projectId,
    year: project.year,
    projectName: project.projectName,
    award: project.award,
    activity: project.activity,
    side,
    period: `${formatMonth(project.startDate)} - ${formatMonth(project.endDate)}`,
    memberCount: project.participantCount ?? null,
    techStack: project.techStacks ?? [],
    description: project.description,
    images: (project.photos ?? []).map((photo) => photo.url),
    photoIds: (project.photos ?? []).map((photo) => photo.id),
  });

  const handleDelete = async (index) => {
    if (isSaving) return;
    if (!window.confirm('삭제하시겠습니까?')) return;

    const projectId = timeline[index].projectId;
    setIsSaving(true);
    try {
      await deleteProject(projectId);
      const currentIndex = useHomeContentStore.getState().timeline.findIndex((item) => item.projectId === projectId);
      if (currentIndex !== -1) deleteTimelineItem(currentIndex);
      setEditingProjectId((previous) => (previous === projectId ? null : previous));
    } catch {
      alert('프로젝트 삭제에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditButtonClick = (index) => {
    const projectId = timeline[index].projectId;
    if (editingProjectId === projectId) {
      editFormRefs.current[index]?.requestSave();
    } else {
      setEditingProjectId(projectId);
    }
  };

  const handleSaveEdit = async (index, patch) => {
    if (isSaving) return;
    const projectId = timeline[index].projectId;
    setIsSaving(true);
    try {
      const { keepPhotoIds, newPhotoKeys } = await resolvePhotoKeys(patch.photoDrafts);
      const project = await updateProject(projectId, {
        year: patch.year,
        projectName: patch.projectName,
        award: patch.award,
        activity: patch.activity,
        startDate: toApiDate(patch.periodStart),
        endDate: toApiDate(patch.periodEnd),
        participantCount: patch.memberCount,
        techStacks: patch.techStack,
        description: patch.description,
        keepPhotoIds,
        newPhotoKeys,
      });
      const currentTimeline = useHomeContentStore.getState().timeline;
      const currentIndex = currentTimeline.findIndex((item) => item.projectId === projectId);
      if (currentIndex !== -1) {
        updateTimelineItem(currentIndex, toStoreItem(project, currentTimeline[currentIndex].side));
      }
      setEditingProjectId(null);
    } catch {
      alert('프로젝트 수정에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNew = async (patch) => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const { newPhotoKeys } = await resolvePhotoKeys(patch.photoDrafts);
      const project = await createProject({
        year: patch.year,
        projectName: patch.projectName,
        award: patch.award,
        activity: patch.activity,
        startDate: toApiDate(patch.periodStart),
        endDate: toApiDate(patch.periodEnd),
        participantCount: patch.memberCount,
        techStacks: patch.techStack,
        description: patch.description,
        photoKeys: newPhotoKeys,
      });
      const nextSide = timeline.length % 2 === 0 ? 'right' : 'left';
      addTimelineItem(toStoreItem(project, nextSide));
      setIsAdding(false);
    } catch {
      alert('프로젝트 등록에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
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
            const isEditing = editingProjectId === event.projectId;
            const card = (
              <TimelineCard
                event={event}
                isRight={isRight}
                isEditing={isEditing}
                formRef={(el) => {
                  editFormRefs.current[index] = el;
                }}
                onSaveEdit={(patch) => handleSaveEdit(index, patch)}
                onCancelEdit={() => setEditingProjectId(null)}
              />
            );
            const controls = isAuthenticated && (
              <TimelineControls
                isRight={isRight}
                isEditing={isEditing}
                onEdit={() => handleEditButtonClick(index)}
                onDelete={() => handleDelete(index)}
                disabled={isSaving}
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
                    disabled={isSaving}
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
