import { greenListApi } from '@/api/green-list-api';

export const getRichMedia = async () => {
  const { data } = await greenListApi.get(`reach-media`);

  return data;
};
export const createRichMedia = async (richMedia: RichMedia) => {
  const formData = new FormData();

  for (const key in richMedia) {
    if (Object.prototype.hasOwnProperty.call(richMedia, key)) {
      const element = richMedia[key as keyof RichMedia];

      if (!element) continue;
      if (Array.isArray(element) && element.length === 0) continue;

      if (key === 'file') {
        formData.append(key, element as File);
        continue;
      }
      formData.append(key, element ? element.toString() : '');
    }
  }

  const headers = { 'Content-Type': 'multipart/form-data' };
  const { data } = await greenListApi.post('reach-media', formData, {
    headers,
  });
  return data;
};
interface RichMedia {
  richMediaName: string;
  campaignId: string;
  file: File;
  additionalScripts?: [];
}
