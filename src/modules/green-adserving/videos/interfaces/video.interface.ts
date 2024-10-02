export interface VideoInterface {
  id: number;
  name: string;
  campaign: Campaign;
  duration: string;
  creativeURL: string;
  vastURL: string;
  reproductions: number;
  dataTransfer: number;
  emissions: number;
}
interface Campaign {
  id: number;
  name: string;
}
export interface VideoResponseInterface {
  id: number;
  videoName: string;
  videoUrl: string;
  creativeTitle: string;
  description: string;
  duration: string;
  clickThrough: string;
  vastFileUrl: string;
  clientPixel: string;
  verifierPixel: string;
  extraPixel: null;
  startTracking: null;
  firstQuartileTracking: null;
  midpointTracking: null;
  thirdQuartileTracking: null;
  completeTracking: null;
  additionalScripts: null;
  scriptVerificationName: string;
  scriptVerificationUrl: string;
  status: string;
  jobId: string;
  folderName: string;
  createdAt: Date;
  updatedAt: Date;
}
