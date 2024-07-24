import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getCampaign } from '../services/campaigns';
import { UpdateCampaign } from '../components/Update';

import { getColumns } from '../components/data-table-urls/columns';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { URLInterface } from '../interfaces/campaign.interface';
import { DataTable } from '../components/data-table-urls/data-table';
import { Efficiency } from '../components/Efficiency';
import { Input } from '@/components/ui/input';
import { SitesInterface } from '../../site/interfaces/sites.interface';

export const CampaignDetailPage = () => {
  const [urlsList, setUrlList] = useState<URLInterface[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const { id } = useParams();
  const { data: campaign, isLoading } = useQuery({
    queryKey: ['campaign', id],
    queryFn: () => getCampaign(id ?? ''),
  });
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
    if (campaign && campaign.campaignUrls) {
      console.log(campaign);
      const urls = campaign.campaignUrls.map((campaignUrl) => campaignUrl.url);
      setUrlList(urls);
    }
  }, [campaign]);

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
  }, [checkedState, urlsList]);

  const handleDownload = () => {
    const selectedRows = urlsList.filter((row) => checkedState[row.category]);

    if (selectedRows.length === 0) {
      alert('No hay filas seleccionadas para descargar');
      return;
    }

    const headers = Object.keys(selectedRows[0]).filter(
      (key) => key !== 'insight' && key !== 'id',
    );
    const csvRows = [
      headers.join(','),
      ...selectedRows.map((row) =>
        headers.map((header) => row[header as keyof SitesInterface]).join(','),
      ),
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'selected_rows.csv');
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

      {urlsList.length > 0 && (
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
                  urls={urlsList}
                  checkedState={checkedState}
                  onCategoryChange={handleCategoryChange}
                />
                <Button
                  variant={'create'}
                  className="text-[12px] w-48"
                  onClick={handleDownload}
                >
                  <DownloadIcon className="w-4 h-4 mr-1" />
                  Descargar Excel
                </Button>
              </div>
              <div className="mt-8 w-full px-5 py-7 b bg-[#F9FBFC] rounded-md">
                <DataTable
                  columns={columns}
                  data={urlsList}
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
