import { useRef, useState } from 'react';

import ConfirmModal from '@/components/admin/ConfirmModal';
import { TIMELINE_LIST } from '@/constants/homeData';
import editIcon from '@/assets/images/edit1.svg';
import deleteIcon from '@/assets/images/edit2.svg';
import calendarIcon from '@/assets/images/Date_today_duotone_line1.svg';
import memberIcon from '@/assets/images/User1.svg';

const IMAGE_SLOT_COUNT = 3;

/**
 * TIMELINE_LIST(방문자용)에는 없는 관리자 편집 전용 필드를 기본값으로 채운다.
 * TODO: 백엔드 연동 후 프로젝트 상세(기간/인원/기술스택/소개/이미지) API 응답으로 교체.
 */
function withEditableDefaults(event) {
  return {
    dateStart: '',
    dateEnd: '',
    memberCount: '',
    techStack: [],
    description: '',
    images: Array(IMAGE_SLOT_COUNT).fill(null),
    ...event,
  };
}

function getEntryKey(entry) {
  return entry.key;
}

function ImageSlot({ image, onChange }) {
  const fileInputRef = useRef(null);

  const handlePick = () => fileInputRef.current?.click();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <button
      type="button"
      onClick={handlePick}
      className="flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden border border-[#A8A8A8] bg-[#E4E4E4] text-[12px] text-black"
    >
      {image ? (
        <img src={image} alt="" className="h-full w-full object-cover" />
      ) : (
        '이미지'
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </button>
  );
}

function TimelineCardView({ entry, isRight, onEdit, onDelete }) {
  return (
    <div
      className={`relative bg-white rounded-2xl px-7 py-5 border border-[#EDCFBC] ${isRight ? 'text-left' : 'text-right'}`}
    >
      <div className={`absolute top-3 flex items-center gap-1 ${isRight ? 'right-3' : 'left-3'}`}>
        <button
          type="button"
          onClick={onEdit}
          aria-label={`${entry.year} 프로젝트 수정`}
          className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-brand-soft"
        >
          <img src={editIcon} alt="" className="h-[13px] w-[13px]" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label={`${entry.year} 프로젝트 삭제`}
          className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-brand-soft"
        >
          <img src={deleteIcon} alt="" className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm text-brand font-bold m-0 mb-1">
        {entry.year}
        {entry.projectName ? `, ${entry.projectName}` : ''}
      </p>
      <p className="text-base font-bold text-ink m-0 mb-1">{entry.award}</p>
      <p className="text-xs text-[#AAAAAA] m-0">{entry.activity}</p>
    </div>
  );
}

function TimelineCardEdit({ draft, onChange, onCancel, onSave }) {
  const [techInput, setTechInput] = useState('');

  const handleField = (field) => (event) =>
    onChange({ ...draft, [field]: event.target.value });

  const handleImageChange = (slotIndex) => (dataUrl) => {
    const images = [...draft.images];
    images[slotIndex] = dataUrl;
    onChange({ ...draft, images });
  };

  const handleAddTech = () => {
    const value = techInput.trim();
    if (!value || draft.techStack.includes(value)) {
      setTechInput('');
      return;
    }
    onChange({ ...draft, techStack: [...draft.techStack, value] });
    setTechInput('');
  };

  const handleRemoveTech = (tech) => {
    onChange({ ...draft, techStack: draft.techStack.filter((item) => item !== tech) });
  };

  return (
    <div className="relative w-full rounded-[30px] bg-white p-7 shadow-[0px_4px_4px_0px_rgba(217,217,217,0.3)] text-left">
      <div className="absolute right-6 top-5 flex items-center gap-3">
        <button type="button" onClick={onSave} className="text-lg font-medium text-brand">
          저장
        </button>
        <button
          type="button"
          onClick={onCancel}
          aria-label="편집 취소"
          className="flex h-6 w-6 items-center justify-center"
        >
          <img src={deleteIcon} alt="" className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <input
          type="text"
          value={draft.year}
          onChange={handleField('year')}
          placeholder="연도"
          className="w-16 border-b border-brand bg-transparent text-sm font-bold text-brand outline-none"
        />
        <span className="text-sm font-bold text-brand">,</span>
        <input
          type="text"
          value={draft.projectName}
          onChange={handleField('projectName')}
          placeholder="프로젝트명"
          className="flex-1 border-b border-brand bg-transparent text-sm font-bold text-brand outline-none"
        />
      </div>

      <input
        type="text"
        value={draft.award}
        onChange={handleField('award')}
        placeholder="수상 내역"
        className="mb-1 w-full border-b border-line bg-transparent text-base font-bold text-ink outline-none"
      />
      <input
        type="text"
        value={draft.activity}
        onChange={handleField('activity')}
        placeholder="활동 내역"
        className="mb-4 w-full border-b border-line bg-transparent text-xs text-[#AAAAAA] outline-none"
      />

      <div className="mb-4 flex items-center gap-6 border-b border-line pb-4">
        <div className="flex items-center gap-2">
          <img src={calendarIcon} alt="" className="h-[18px] w-[18px]" />
          <input
            type="text"
            value={draft.dateStart}
            onChange={handleField('dateStart')}
            placeholder="2023.03"
            className="w-20 bg-transparent text-xs text-[#666] outline-none"
          />
          <span className="text-xs text-[#666]">-</span>
          <input
            type="text"
            value={draft.dateEnd}
            onChange={handleField('dateEnd')}
            placeholder="2023.10"
            className="w-20 bg-transparent text-xs text-[#666] outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <img src={memberIcon} alt="" className="h-[18px] w-[18px]" />
          <input
            type="text"
            value={draft.memberCount}
            onChange={handleField('memberCount')}
            placeholder="인원"
            className="w-12 bg-transparent text-xs text-[#666] outline-none"
          />
          <span className="text-xs text-[#666]">명</span>
        </div>
      </div>

      <p className="mb-2 text-xs text-[#A19D9D]">기술 스택</p>
      {draft.techStack.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {draft.techStack.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1 rounded-full bg-[#fff1e7] px-3 py-1 text-[10px] text-brand"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTech(tech)}
                aria-label={`${tech} 삭제`}
                className="text-brand"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={techInput}
          onChange={(event) => setTechInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleAddTech();
            }
          }}
          placeholder="기술 스택 입력 후 추가"
          className="flex-1 rounded-lg border border-line px-3 py-2 text-xs text-ink outline-none focus:border-brand"
        />
        <button
          type="button"
          onClick={handleAddTech}
          className="rounded-lg border border-brand px-4 text-xs font-medium text-brand"
        >
          추가
        </button>
      </div>

      <p className="mb-2 text-xs text-[#A19D9D]">프로젝트 소개</p>
      <textarea
        value={draft.description}
        onChange={handleField('description')}
        rows={3}
        placeholder="프로젝트 소개를 입력하세요"
        className="mb-4 w-full resize-none rounded-lg border border-line px-3 py-2 text-xs text-ink outline-none focus:border-brand"
      />

      <div className="flex gap-3">
        {draft.images.map((image, index) => (
          <ImageSlot key={index} image={image} onChange={handleImageChange(index)} />
        ))}
      </div>
    </div>
  );
}

/**
 * 관리자용 'ONE 활동 현황' 타임라인 섹션.
 * 카드별 수정(상세 정보 편집)/삭제와, 하단 '프로젝트 추가하기'를 지원한다.
 */
function AdminTimelineSection() {
  const [entries, setEntries] = useState(() =>
    TIMELINE_LIST.map((event, index) => ({
      key: `${event.year}-${event.projectName}-${index}`,
      ...withEditableDefaults(event),
    }))
  );
  const [editingKey, setEditingKey] = useState(null);
  const [draft, setDraft] = useState(null);
  const [deleteKey, setDeleteKey] = useState(null);

  const handleEditOpen = (entry) => {
    setEditingKey(getEntryKey(entry));
    setDraft({ ...entry });
  };

  const handleEditCancel = () => {
    setEditingKey(null);
    setDraft(null);
  };

  const handleEditSave = () => {
    setEntries((prev) => prev.map((entry) => (getEntryKey(entry) === editingKey ? draft : entry)));
    setEditingKey(null);
    setDraft(null);
  };

  const handleDeleteConfirm = () => {
    setEntries((prev) => prev.filter((entry) => getEntryKey(entry) !== deleteKey));
    setDeleteKey(null);
  };

  const handleAddProject = () => {
    const nextEntry = {
      key: `new-${Date.now()}`,
      ...withEditableDefaults({
        year: String(new Date().getFullYear()),
        projectName: '',
        award: '',
        activity: '',
        side: entries.length % 2 === 0 ? 'right' : 'left',
      }),
    };
    setEntries((prev) => [...prev, nextEntry]);
    handleEditOpen(nextEntry);
  };

  const deleteTarget = entries.find((entry) => getEntryKey(entry) === deleteKey);

  return (
    <section className="py-20 px-6 bg-brand-soft">
      <div className="max-w-[860px] mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="block text-brand text-sm mb-4">▼</span>
          <h2 className="text-3xl font-bold text-ink m-0">ONE 활동 현황</h2>
        </div>

        {/* 타임라인 본체 */}
        <div className="relative">
          {/* 중앙 수직선 */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-[1.5px] left-1/2 -translate-x-1/2 bg-brand opacity-50"
          />

          {entries.map((entry) => {
            const isRight = entry.side === 'right';
            const isEditing = editingKey === getEntryKey(entry);

            return (
              <div
                key={getEntryKey(entry)}
                className="relative grid items-center mb-10"
                style={{ gridTemplateColumns: isEditing ? '1fr' : '1fr 40px 1fr' }}
              >
                {isEditing ? (
                  <TimelineCardEdit
                    draft={draft}
                    onChange={setDraft}
                    onCancel={handleEditCancel}
                    onSave={handleEditSave}
                  />
                ) : (
                  <>
                    <div className="pr-8">
                      {!isRight && (
                        <TimelineCardView
                          entry={entry}
                          isRight={false}
                          onEdit={() => handleEditOpen(entry)}
                          onDelete={() => setDeleteKey(getEntryKey(entry))}
                        />
                      )}
                    </div>
                    <div className="flex justify-center">
                      <div className="w-4 h-4 rounded-full flex-shrink-0 bg-brand" />
                    </div>
                    <div className="pl-8">
                      {isRight && (
                        <TimelineCardView
                          entry={entry}
                          isRight={true}
                          onEdit={() => handleEditOpen(entry)}
                          onDelete={() => setDeleteKey(getEntryKey(entry))}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {/* 프로젝트 추가하기 */}
          <div className="flex justify-end pr-8">
            <button
              type="button"
              onClick={handleAddProject}
              className="flex items-center gap-2 text-lg font-medium text-brand"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-brand text-brand">
                +
              </span>
              프로젝트 추가하기
            </button>
          </div>
        </div>
      </div>

      {deleteTarget && (
        <ConfirmModal
          message={`'${deleteTarget.year}${deleteTarget.projectName ? `, ${deleteTarget.projectName}` : ''}' 항목을\n삭제하시겠습니까?`}
          confirmLabel="삭제"
          onCancel={() => setDeleteKey(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </section>
  );
}

export default AdminTimelineSection;
