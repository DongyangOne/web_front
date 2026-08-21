import instance from './instance';

/**
 * Presigned 업로드 URL 발급
 * @param {'logo'|'project'} type - 업로드 대상 유형
 * @returns {Promise<{ uploadUrl: string, objectKey: string }>}
 */
export const getUploadUrl = async (type) => {
  const response = await instance.get('/api/v1/files/upload-url', { params: { type } });
  return response.data?.data;
};

/**
 * 발급받은 Presigned URL에 파일을 MinIO로 직접 업로드
 * instance를 거치지 않는다 — baseURL/Authorization 헤더가 MinIO 요청에는 맞지 않기 때문.
 * @param {string} uploadUrl
 * @param {File} file
 */
const uploadFileToPresignedUrl = async (uploadUrl, file) => {
  const response = await fetch(uploadUrl, { method: 'PUT', body: file });
  if (!response.ok) {
    throw new Error('파일 업로드에 실패했습니다.');
  }
};

/**
 * 파일을 업로드하고 objectKey를 반환한다.
 * @param {'logo'|'project'} type
 * @param {File} file
 * @returns {Promise<string>} objectKey
 */
export const uploadFile = async (type, file) => {
  const { uploadUrl, objectKey } = await getUploadUrl(type);
  await uploadFileToPresignedUrl(uploadUrl, file);
  return objectKey;
};
