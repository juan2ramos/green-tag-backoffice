import { greenListApi } from '@/api/green-list-api';

export const getVideos = async () => {
  const { data } = await greenListApi.get(`video`);

  return data;
};

export const createVideo = async (video: Video) => {
  const formData = new FormData();

  for (const key in video) {
    if (Object.prototype.hasOwnProperty.call(video, key)) {
      const element = video[key as keyof Video];

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
  const { data } = await greenListApi.post('video', formData, {
    headers,
  });
  return data;
};
interface Video {
  videoName: string;
  campaignId: string;
  file: File;
  creativeTitle: string;
  description: string;
  clickThrough: string;

  clientPixel?: string;
  verifierPixel?: string;
  extraPixel?: string;

  startTracking?: string;
  firstQuartileTracking?: string;
  midpointTracking?: string;
  thirdQuartileTracking?: string;
  completeTracking?: string;

  scriptVerificationName?: string;
  scriptVerificationUrl?: string;

  additionalScripts?: string[];
}
