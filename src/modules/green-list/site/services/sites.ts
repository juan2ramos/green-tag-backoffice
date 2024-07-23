import { greenListApi } from '@/api/green-list-api';

interface Params {
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: string;
}

export const getSites = async (params: Params) => {
  const { page, pageSize, sortBy, sortOrder } = params;
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
