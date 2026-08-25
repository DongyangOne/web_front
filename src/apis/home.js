import instance from './instance';

export const getVisitorMain = async () => {
  const response = await instance.get('/api/v1/visitor/main');
  return response.data?.data;
};

/**
 * (관리자) 주요활동 카드 수정
 * @param {number} cardId - 수정할 카드 ID
 * @param {{ title: string, content: string }} data
 * @returns {Promise<Object>} { cardId, title, content, cardOrder }
 */
export const updateActivityCard = async (cardId, { title, content }) => {
  const response = await instance.patch(`/api/v1/admin/main/activity/${cardId}`, { title, content });
  return response.data?.data;
};

/**
 * (관리자) 주요활동 카드 초기화
 * @param {number} cardId - 초기화할 카드 ID
 * @returns {Promise}
 */
export const clearActivityCard = (cardId) =>
  instance.patch(`/api/v1/admin/main/activity/${cardId}/clear`);

/**
 * (관리자) 프로젝트 생성
 * @param {{ year, projectName, award, activity, startDate, endDate, participantCount, techStacks, description, photoKeys }} data
 * @returns {Promise<Object>} { projectId, year, projectName, award, activity, startDate, endDate, participantCount, techStacks, description, photos }
 */
export const createProject = async (data) => {
  const response = await instance.post('/api/v1/admin/project', data);
  return response.data?.data;
};

/**
 * (관리자) 프로젝트 수정
 * keepPhotoIds로 유지할 기존 사진을, newPhotoKeys로 새로 추가할 사진의 objectKey를 전달한다.
 * @param {number} projectId
 * @param {{ year, projectName, award, activity, startDate, endDate, participantCount, techStacks, description, keepPhotoIds, newPhotoKeys }} data
 * @returns {Promise<Object>} { projectId, year, projectName, award, activity, startDate, endDate, participantCount, techStacks, description, photos }
 */
export const updateProject = async (projectId, data) => {
  const response = await instance.patch(`/api/v1/admin/project/${projectId}`, data);
  return response.data?.data;
};

/**
 * (관리자) 프로젝트 삭제
 * @param {number} projectId
 * @returns {Promise}
 */
export const deleteProject = (projectId) => instance.delete(`/api/v1/admin/project/${projectId}`);
