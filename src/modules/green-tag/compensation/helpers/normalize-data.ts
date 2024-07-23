import { Campaign, DataTableProps } from '../interfaces/types';
import { dateDisplay } from '@/shared/helpers/date-display';
import { formatNumber } from '@/shared/helpers/format-number';

export const normalizeData = (data: Campaign[]): DataTableProps[] => {
  return data.flatMap((campaign) =>
    campaign.creativeGroups.map((group) => ({
      campaignId: campaign.id,
      campaignName: campaign.name,
      advertiserName: campaign.advertiser.name,
      agencyName: campaign.advertiser.compensationStrategy.agency.name,
      compensationStrategy: campaign.advertiser.compensationStrategy.name,
      impressions: formatNumber(group.impressions),
      emissions: formatNumber(group.emissions),
      dateRange: `${dateDisplay(group.startDate)} - ${dateDisplay(
        group.endDate,
      )}`,
    })),
  );
};
