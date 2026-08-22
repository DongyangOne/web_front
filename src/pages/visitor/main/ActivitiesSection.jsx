import { useState } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import useAuthStore from '@/stores/authStore';
import useHomeContentStore from '@/stores/homeContentStore';
import { updateActivityCard, clearActivityCard } from '@/apis/home';
import editIcon from '@/assets/images/editicon.svg';
import deleteIcon from '@/assets/images/deleteicon.svg';

export default function ActivitiesSection({ isEditable = false }) {
  const revealRef = useScrollReveal();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated) && isEditable;
  const activities = useHomeContentStore((state) => state.activities);
  const updateActivity = useHomeContentStore((state) => state.updateActivity);

  const [editingIndex, setEditingIndex] = useState(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDescription, setDraftDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const startEdit = (index) => {
    setEditingIndex(index);
    setDraftTitle(activities[index].title);
    setDraftDescription(activities[index].description);
  };

  const DESCRIPTION_LINE_LENGTH = 30;

  const handleDescriptionChange = (value) => {
    let [firstLine, ...restLines] = value.split('\n');
    let secondLine = restLines.join('');

    if (firstLine.length > DESCRIPTION_LINE_LENGTH) {
      secondLine = firstLine.slice(DESCRIPTION_LINE_LENGTH) + secondLine;
      firstLine = firstLine.slice(0, DESCRIPTION_LINE_LENGTH);
    }
    secondLine = secondLine.slice(0, DESCRIPTION_LINE_LENGTH);

    setDraftDescription(restLines.length > 0 || secondLine ? `${firstLine}\n${secondLine}` : firstLine);
  };

  const handleDescriptionKeyDown = (event) => {
    if (event.key === 'Enter' && draftDescription.includes('\n')) {
      event.preventDefault();
    }
  };

  const handleSaveClick = async (index) => {
    if (isSaving) return;
    if (!draftTitle.trim() || !draftDescription.trim()) {
      alert('내용을 입력해 주세요.');
      return;
    }

    const cardId = activities[index].cardId;
    setIsSaving(true);
    try {
      await updateActivityCard(cardId, { title: draftTitle, content: draftDescription });
      updateActivity(index, { title: draftTitle, description: draftDescription });
      setEditingIndex(null);
    } catch {
      alert('카드 수정에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteContent = async (index) => {
    if (isSaving) return;
    const cardId = activities[index].cardId;
    setIsSaving(true);
    try {
      await clearActivityCard(cardId);
      updateActivity(index, { title: '', description: '' });
      setEditingIndex((previous) => (previous === index ? null : previous));
    } catch {
      alert('카드 초기화에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-brand-soft">
      <div className="max-w-[960px] mx-auto">
        {/* 섹션 헤더 */}
        <div ref={revealRef} className="reveal-up text-center mb-14">
          <span className="block text-brand text-sm mb-4">▼</span>
          <h2 className="text-3xl font-bold text-ink m-0">주요 활동</h2>
        </div>

        {/* 2×2 카드 그리드 */}
        <div className="grid grid-cols-2 gap-5">
          {activities.map((activity, index) => {
            const isEditing = editingIndex === index;
            return (
              <div
                key={index}
                ref={revealRef}
                className="reveal-up relative bg-white rounded-2xl p-12 border border-[#EDCFBC] flex flex-col items-center text-center"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {isAuthenticated && (
                  <div className="absolute top-4 right-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => (isEditing ? handleSaveClick(index) : startEdit(index))}
                      disabled={isSaving}
                      aria-label={isEditing ? '저장' : '수정'}
                      className={`disabled:opacity-50 ${
                        isEditing
                          ? 'rounded-full bg-brand px-3 py-1 text-xs font-bold text-white'
                          : 'flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-brand-soft'
                      }`}
                    >
                      {isEditing ? '저장' : <img src={editIcon} alt="" className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteContent(index)}
                      disabled={isSaving}
                      aria-label="삭제"
                      className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-brand-soft disabled:opacity-50"
                    >
                      <img src={deleteIcon} alt="" className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* 원형 아이콘 컨테이너 */}
                <div className="w-24 h-24 rounded-full flex items-center justify-center mb-7 bg-brand-soft">
                  <img
                    src={activity.icon}
                    alt={activity.title}
                    className="w-[100px] h-[100px] object-cover"
                  />
                </div>

                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={draftTitle}
                      onChange={(event) => setDraftTitle(event.target.value)}
                      placeholder="활동 제목"
                      maxLength={20}
                      className="mb-5 w-full rounded-md border border-line px-3 py-2 text-center text-lg font-bold text-ink"
                    />
                    <textarea
                      value={draftDescription}
                      onChange={(event) => handleDescriptionChange(event.target.value)}
                      onKeyDown={handleDescriptionKeyDown}
                      placeholder="활동 설명 (최대 2줄)"
                      rows={2}
                      maxLength={61}
                      className="w-full resize-none rounded-md border border-line px-3 py-2 text-center text-sm text-ink-sub"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="w-full text-lg font-bold text-ink mb-5 break-words">{activity.title}</h3>
                    <p className="w-full text-sm text-ink-sub leading-7 m-0 whitespace-pre-line break-words">
                      {activity.description}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
