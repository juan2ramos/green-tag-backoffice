export interface RichMediaInterface {
  id: number;
  name: string;
  campaign: Campaign;
  url: string;
}

interface Campaign {
  id: number;
  name: string;
}
