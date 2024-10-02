import { greenListApi } from '@/api/green-list-api';
import { VideoResponseInterface } from '../interfaces/video.interface';

export const getVideos = async () => {
  const { data } = await greenListApi.get(`video`);
  return data;
};
export const getVideo = async (id: number): Promise<VideoResponseInterface> => {
  const { data } = await greenListApi.get<VideoResponseInterface>(
    `video/${id}`,
  );
  return data;
};
export const deleteVideo = async (id: number) => {
  const { data } = await greenListApi.delete(`video/${id}`);
  return data;
};

export const createVideo = async (video: Video) => {
  const formData = new FormData();

  for (const key in video) {
    if (Object.prototype.hasOwnProperty.call(video, key)) {
      const element = video[key as keyof Video];

      if (!element) continue;
      if (Array.isArray(element) && element.length === 0) continue;
      if (Array.isArray(element)) {
        element.forEach((item, index) => {
          formData.append(`additionalScripts[${index}]`, item);
        });
        continue;
      }
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
