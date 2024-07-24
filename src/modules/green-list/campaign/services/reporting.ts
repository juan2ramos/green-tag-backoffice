import { greenListApi } from '@/api/green-list-api';

interface Planning {
  campaignId: string;
  file: File;
}
export const createReporting = async (planning: Planning) => {
  const formData = new FormData();
  formData.append('campaignId', planning.campaignId);
  formData.append('file', planning.file);
  const headers = { 'Content-Type': 'multipart/form-data' };
  const { data } = await greenListApi.post('csv-file/reporting', formData, {
    headers,
  });
  return data?.payload;
};
