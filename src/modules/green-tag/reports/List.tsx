const CampaignsReport = () => {
  return '';
};
export default CampaignsReport;
export interface Campaign {
  id: string;
  name: string;
  impressions: string;
  emissions: string;
  compensated: null | string;
  start_date: string;
  end_date: string;
  compensation_emission_ratio: null | string;
}
