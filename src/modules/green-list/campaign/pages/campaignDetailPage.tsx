import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getCampaign } from '../services/campaigns';
import { UpdateCampaign } from '../components/Update';

import { getColumns } from '../components/data-table-urls/columns';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useEffect, useMemo, useState } from 'react';
import {
  CampaignInterface,
  CampaignUrlsInterface,
  URLInterface,
} from '../interfaces/campaign.interface';
import { DataTable } from '../components/data-table-urls/data-table';
import { Efficiency } from '../components/Efficiency';
import { Input } from '@/components/ui/input';
import { SitesInterface } from '../../site/interfaces/sites.interface';
import { getSites } from '../../site/services/sites';

export const CampaignDetailPage = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const { id } = useParams();
  const { data: campaign, isLoading } = useQuery({
    queryKey: ['campaign', id],
    queryFn: () => getCampaign(id ?? ''),
  });
  const { data: allUrls, isLoading: isLoadingUrls } = useQuery({
    queryKey: ['allUrls'],
    queryFn: () => getSites({}),
    enabled:
      !!campaign &&
      !campaign.campaignUrls.length &&
      !!campaign.efficiencyReport,
  });
  const normalizedData = useMemo(() => {
    console.log('normalizedData', allUrls);

    return campaign && campaign.campaignUrls.length
      ? normalizeData(campaign, 'campaign')
      : allUrls
      ? normalizeData(allUrls, 'allUrls')
      : [];
  }, [campaign, allUrls]);
  const [checkedState, setCheckedState] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
  });

  const columns = getColumns();
  const handleCategoryChange = (category: string, isChecked: boolean) => {
    setCheckedState((prev) => ({
      ...prev,
      [category]: isChecked,
    }));
  };

  useEffect(() => {
    const allRows = document.querySelectorAll('[data-row-index]');
    allRows.forEach((row) => {
      const category = row.getAttribute('data-category');
      const checkbox = row.querySelector('input[type="checkbox"]');
      if (category && checkbox) {
        (checkbox as HTMLInputElement).checked =
          !!checkedState[category as keyof typeof checkedState];
      }
    });
  }, [checkedState, normalizedData]);

  if (isLoadingUrls || (campaign && !campaign.campaignUrls && isLoading))
    return <div>Loading...</div>;

  const handleDownload = () => {
    const selectedRows = normalizedData.filter(
      (row) => checkedState[row.category as keyof typeof checkedState],
    );

    if (selectedRows.length === 0) {
      alert('No hay filas seleccionadas para descargar');
      return;
    }

    const headers = ['urls', 'category'];

    const csvRows = [
      headers.join(','), // Añade las cabeceras
      ...selectedRows.map((row) =>
        headers.map((header) => row[header as keyof SitesInterface]).join(','),
      ),
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'planning-urls.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-4">
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Editar campaña {campaign && campaign.name} </h2>
          <hr />
          {campaign && <UpdateCampaign campaign={campaign} />}
          {isLoading && <div className="mt-4">Cargando...</div>}
        </div>
      </section>

      {normalizedData.length > 0 && (
        <>
          <div className="flex items-center justify-end">
            <Input
              placeholder="Filtrar por sitio"
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm mb-4"
            />
          </div>

          <section className="wrapper">
            <div className="w-full">
              <h2 className="pb-2">Listado de sitios</h2>
              <hr />
              <div className="flex justify-between gap-2 mt-6">
                <Efficiency
                  reporting={campaign?.efficiencyReport ?? null}
                  checkedState={checkedState}
                  isAllSites={!campaign?.campaignUrls.length}
                  onCategoryChange={handleCategoryChange}
                  campaignId={campaign?.id ?? 0}
                />
                <Button
                  onClick={handleDownload}
                  variant={'create'}
                  className="text-[12px] w-48"
                >
                  <DownloadIcon className="w-4 h-4 mr-1" />
                  Descargar Excel
                </Button>
              </div>
              <div className="mt-8 w-full px-5 py-7 b bg-[#F9FBFC] rounded-md">
                <DataTable
                  columns={columns}
                  data={normalizedData}
                  globalFilter={globalFilter}
                  checkedState={checkedState}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
const normalizeData = (
  data: { data: URLInterface[] } | CampaignInterface,
  source: 'campaign' | 'allUrls',
): SitesInterface[] => {
  if (source === 'campaign') {
    const campaigns = data as CampaignInterface;
    return campaigns.campaignUrls.map((campaign: CampaignUrlsInterface) => ({
      id: campaign.url.id,
      url: campaign.url.url,
      isGreen: campaign.url.isGreen,
      updated: campaign.url.updated,
      evaluated: campaign.url.evaluated,
      category: campaign.url.category,
      score: campaign.url.score,
    }));
  }
  const urls = data as { data: URLInterface[] };
  return urls.data;
};
