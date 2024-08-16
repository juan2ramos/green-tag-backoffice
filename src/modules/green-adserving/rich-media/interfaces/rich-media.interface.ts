export interface RichMediaInterface {
  id: number;
  name: string;
  campaign: Campaign;
  url: string;
  additionalScripts: string[] | null;
}

interface Campaign {
  id: number;
  name: string;
}
