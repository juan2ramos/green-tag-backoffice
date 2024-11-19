export interface GetImpressions {
  strategyName: string;
  strategyId: string;
  startDate: string;
  endDate: string;
}
export interface CompensationRequest {
  legacyBonusId: string;
  campaignId: string;
  selectedDays: string[];
}
