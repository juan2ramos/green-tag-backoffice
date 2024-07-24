import { ClientInterface } from '../../client/interfaces/client.interface';

export interface CampaignInterface {
  id?: number;
  name: string;
  client: ClientInterface;
  campaignUrls: CampaignUrlsInterface[];
  efficiencyReport?: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateCampaignInterface {
  id?: string;
  name: string;
  clientId: string;
}
export interface CampaignUrlsInterface {
  category: string;
  campaign: number;
  efficiency_report: number;
  __has_url__: boolean;
  url: URLInterface;
  emit: string;
}

export enum Category {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export interface URLInterface {
  id: number;
  url: string;
  isGreen: boolean;
  updated: Date;
  evaluated: Date;
  category: Category;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  insight: Insight | null;
}

export interface Insight {
  id: number;
  urlId: number;
  fcp: number;
  speedIndex: number;
  tti: number;
  tbt: number;
  numberOfRequests: number;
  pageSize: number;
  createdAt: Date;
  updatedAt: Date;
}
