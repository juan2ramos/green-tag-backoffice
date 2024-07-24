import { useQuery } from '@tanstack/react-query';
import { getCompensations } from '../services/report';
import { useEffect, useState } from 'react';
import { DataTable } from '../components/data-table/data-table';
import { columns } from '../components/data-table/columns';
import { dateDisplay } from '@/shared/helpers/date-display';

interface Compensation {
  id: string;
  numberCompensatedEmissions: string;
  url: string;
}

interface CreativeGroup {
  id: string;
  startDate: string;
  endDate: string;
  compensations: Compensation[];
  emissions: string;
  impressions: string;
}

interface Campaign {
  id: string;
  name: string;
  creativeGroups: CreativeGroup[];
  advertiser: {
    name: string;
    compensationStrategy: {
      name: string;
      agency: {
        name: string;
      };
    };
  };
}

const ReportPage = () => {
  const { data: campaigns } = useQuery<Campaign[]>({
    queryKey: ['compensations'],
    queryFn: () => getCompensations(),
  });

  const [compensationList, setCompensationList] = useState<
    Array<{
      campaignName: string;
      startDate: string;
      endDate: string;
      compensationId: string;
      numberCompensatedEmissions: string;
      url: string;
    }>
  >([]);

  useEffect(() => {
    const compensations: Array<{
      campaignName: string;
      startDate: string;
      endDate: string;
      compensationId: string;
      numberCompensatedEmissions: string;
      url: string;
      advertiserName: string;
      agencyName: string;
      platform: string;
      dateRange: string;
      emissions: string;
      impressions: string;
    }> = [];

    if (campaigns) {
      campaigns.forEach((campaign) => {
        campaign.creativeGroups.forEach((group) => {
          group.compensations.forEach((compensation) => {
            compensations.push({
              campaignName: campaign.name,
              advertiserName: campaign.advertiser.name,
              agencyName: campaign.advertiser.compensationStrategy.agency.name,
              platform: campaign.advertiser.compensationStrategy.name,
              dateRange: `${dateDisplay(group.startDate)} - ${dateDisplay(
                group.endDate,
              )}`,
              startDate: group.startDate,
              emissions: group.emissions,
              impressions: group.impressions,
              endDate: group.endDate,
              compensationId: compensation.id,
              numberCompensatedEmissions:
                compensation.numberCompensatedEmissions,
              url: compensation.url,
            });
          });
        });
      });
    }
    setCompensationList(compensations);
  }, [campaigns]);

  return (
    <div className="flex flex-col gap-4">
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Reporte de compensaciones</h2>
          <hr />
          <div className="mt-8 w-full px-5 py-7 b bg-[#F9FBFC] rounded-md">
            {compensationList != null && (
              <DataTable data={compensationList} columns={columns} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportPage;
