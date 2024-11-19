import { greenListApi } from '@/api/green-list-api';

interface Params {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
}

export const getSites = async ({
  page = 1,
  pageSize = 10000,
  sortBy = 'url',
  sortOrder = 'ASC',
}: Params = {}) => {
  const offset = (page - 1) * pageSize;
  const { data } = await greenListApi('urls/get-all', {
    params: {
      limit: pageSize,
      offset,
      sortBy,
      sortOrder,
    },
  });
  return data;
};

export const downloadSites = async () => {
  return await greenListApi.get('csv-file/download-urls', {
    responseType: 'blob',
  });
};

export const uploadUrls = async (file: File) => {
  const formData = new FormData();

  formData.append('file', file);
  const headers = { 'Content-Type': 'multipart/form-data' };
  const { data } = await greenListApi.post('csv-file/upload-urls', formData, {
    headers,
  });
  return data?.payload;
};
