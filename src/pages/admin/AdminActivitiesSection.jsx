import { useState } from 'react';

import ConfirmModal from '@/components/admin/ConfirmModal';
import { ACTIVITY_LIST } from '@/constants/homeData';
import editIcon from '@/assets/images/edit1.svg';
import deleteIcon from '@/assets/images/edit2.svg';

/**
 * 관리자용 '주요 활동' 섹션.
 * 방문자 ActivitiesSection과 동일한 카드 레이아웃에 카드별 수정/삭제 기능을 얹는다.
 * TODO: 백엔드 연동 후 활동 목록 API 응답으로 교체 (현재는 ACTIVITY_LIST 로컬 상태로 관리).
 */
function AdminActivitiesSection() {
  const [activities, setActivities] = useState(ACTIVITY_LIST);
  const [editingTitle, setEditingTitle] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });
  const [deleteTitle, setDeleteTitle] = useState(null);

  const handleEditOpen = (activity) => {
    setEditingTitle(activity.title);
    setEditForm({ title: activity.title, description: activity.description });
  };

  const handleEditSave = () => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.title === editingTitle ? { ...activity, ...editForm } : activity
      )
    );
    setEditingTitle(null);
  };

  const handleDeleteConfirm = () => {
    setActivities((prev) => prev.filter((activity) => activity.title !== deleteTitle));
    setDeleteTitle(null);
  };

  return (
    <section className="py-20 px-6 bg-brand-soft">
      <div className="max-w-[960px] mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-14">
          <span className="block text-brand text-sm mb-4">▼</span>
          <h2 className="text-3xl font-bold text-ink m-0">주요 활동</h2>
        </div>

        {/* 2×2 카드 그리드 */}
        <div className="grid grid-cols-2 gap-5">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="relative bg-white rounded-2xl p-12 border border-[#EDCFBC] flex flex-col items-center text-center"
            >
              {/* 카드별 수정/삭제 (시안 기준 카드 우측 상단) */}
              <div className="absolute right-5 top-5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEditOpen(activity)}
                  aria-label={`${activity.title} 수정`}
                  className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-brand-soft"
                >
                  <img src={editIcon} alt="" className="h-[15px] w-[15px]" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTitle(activity.title)}
                  aria-label={`${activity.title} 삭제`}
                  className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-brand-soft"
                >
                  <img src={deleteIcon} alt="" className="h-[18px] w-[18px]" />
                </button>
              </div>

              {/* 원형 아이콘 컨테이너 */}
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-7 bg-brand-soft">
                <img
                  src={activity.icon}
                  alt={activity.title}
                  className="w-[100px] h-[100px] object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-ink mb-5">{activity.title}</h3>
              <p className="text-sm text-ink-sub leading-7 m-0 whitespace-pre-line">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {editingTitle !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
          onClick={() => setEditingTitle(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-solid border-brand/20 bg-white p-8 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="mb-6 text-center text-lg font-bold text-ink">활동 카드 수정</h3>
            <label className="mb-4 block text-sm text-ink-sub">
              제목
              <input
                type="text"
                value={editForm.title}
                onChange={(event) =>
                  setEditForm((prev) => ({ ...prev, title: event.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-ink outline-none focus:border-brand"
              />
            </label>
            <label className="mb-6 block text-sm text-ink-sub">
              설명
              <textarea
                value={editForm.description}
                onChange={(event) =>
                  setEditForm((prev) => ({ ...prev, description: event.target.value }))
                }
                rows={3}
                className="mt-1 w-full resize-none rounded-lg border border-line px-3 py-2 text-ink outline-none focus:border-brand"
              />
            </label>
            <div className="flex justify-center gap-6">
              <button
                type="button"
                onClick={() => setEditingTitle(null)}
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

      {deleteTitle !== null && (
        <ConfirmModal
          message={`'${deleteTitle}' 활동을\n삭제하시겠습니까?`}
          confirmLabel="삭제"
          onCancel={() => setDeleteTitle(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </section>
  );
}

export default AdminActivitiesSection;
