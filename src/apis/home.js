import instance from './instance';

export const getVisitorMain = async () => {
  const response = await instance.get('/api/v1/visitor/main');
  return response.data?.data;
};
