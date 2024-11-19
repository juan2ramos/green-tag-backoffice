export interface Campaign {
  id: string;
  name: string;
  externalId: string;
  active: boolean;
  advertiser_id: string;
  createdAt: string;
  updatedAt: string;
  creativeGroups: CreativeGroup[];
  advertiser: Advertiser;
}

export interface Advertiser {
  id: string;
  name: string;
  externalId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  compensationStrategy: CompensationStrategy;
}

export interface CompensationStrategy {
  id: string;
  name: string;
  description: null;
  additionalData: string;
  createdAt: string;
  updatedAt: string;
  agency: Agency;
}

export interface Agency {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreativeGroup {
  id: string;
  startDate: string;
  endDate: string;
  emissions: number;
  impressions: number;
  createdAt: string;
  updatedAt: string;
}

export interface Bonus {
  id: string;
  co2Total: string;
  co2Compensated: null;
  url: string;
  createdAt: string;
  updatedAt: string;
  project: Project;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}
export interface DataTableProps {
  campaignId: string;
  campaignName: string;
  advertiserName: string;
  agencyName: string;
  compensationStrategy: string;
  impressions: string;
  emissions: string;
  dateRange: string;
  externalId: string;
}

export interface CampaignsWithOutCompensationResponse {
  campaignId: string;
  campaignName: string;
  impressionsLeftToCompensate: string;
  emissionsLeftToCompensate: string;
  externalId: string;
  platformName: string;
}

export interface CreativesWithOutCompensationResponse {
  day: Date;
  impressionsLeftToCompensate: string;
  emissionsLeftToCompensate: string;
}
