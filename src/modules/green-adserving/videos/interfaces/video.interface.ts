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
