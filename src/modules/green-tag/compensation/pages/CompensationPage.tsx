import { useQuery } from '@tanstack/react-query';

import {
  campaignsWithOutCompensation,
  creativeDaysWithOutCompensation,
} from '../services/compensation';

import { columns } from '../components/data-table/columns';
import { DataTable } from '../components/data-table/data-table';

import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CampaignsWithOutCompensationResponse } from '../interfaces/types';
import { CompensationForm } from '../components/CompensationsForm';
import { formatNumber } from '@/shared/helpers/format-number';

/* import { ImpressionsForm } from '../components/ImpressionsForm';
import { CampaignsWithOutCompensationResponse } from '../interfaces/types'; */

const CompensationPage = () => {
  const [campaignSelected, setCampaignSelected] =
    useState<CampaignsWithOutCompensationResponse>();
  const {
    data: campaigns,
    /*  error: errorCampaign,
    isLoading: isLoadingCampaign, */
  } = useQuery({
    queryKey: ['campaignsWithOutCompensation'],
    queryFn: () => campaignsWithOutCompensation(),
  });
  const handleChangeAgency = (campaignId: string) => {
    const campaign = campaigns?.find(
      (campaign: CampaignsWithOutCompensationResponse) =>
        campaign.campaignId === campaignId,
    );
    setCampaignSelected(campaign);
  };

  const {
    data: creatives,
    isLoading: isLoadingCreative,
    error: errorCreative,
  } = useQuery({
    queryKey: ['creativeDaysWithOutCompensation', campaignSelected?.campaignId],
    queryFn: () =>
      creativeDaysWithOutCompensation(campaignSelected?.campaignId ?? ''),
    enabled: !!campaignSelected,
  });

  const [globalFilter] = useState('');

  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>(
    {},
  );

  const selectedRows = Object.keys(rowSelection)
    .filter((key) => rowSelection[key])
    .map((key) => creatives[+key]);

  return (
    <div className="flex flex-col gap-6">
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Obtener impresiones para compensar</h2>
          <hr />
          {/*  <ImpressionsForm /> */}
        </div>
        <Select onValueChange={handleChangeAgency}>
          <SelectTrigger
            className="w-[100%] max-w-[800px] bg-[white]"
            disabled={!campaigns}
          >
            <SelectValue
              placeholder={
                campaigns ? 'Seleccione una agencia' : 'Cargando Campañas'
              }
            />
          </SelectTrigger>
          <SelectContent>
            {campaigns?.map(
              (campaign: CampaignsWithOutCompensationResponse) => (
                <SelectItem
                  key={campaign.campaignId}
                  value={campaign.campaignId || ''}
                >
                  {campaign.campaignName} ({campaign.externalId})
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </section>

      {/*  <div className="flex items-center justify-end">
        <Input
          placeholder="Filtrar por campaña o anunciante"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm mb-4"
        />
      </div> */}
      <div className="flex flex-col gap-6">
        {campaignSelected && (
          <section className="wrapper">
            {
              <div className="w-full">
                <h2 className="pb-2">{campaignSelected?.campaignName}</h2>
                <hr />
                <div className="pt-4">
                  <b>Id de {campaignSelected?.platformName}:</b>{' '}
                  <span className="font-robotoFlex font-thin">
                    {campaignSelected?.externalId}
                  </span>
                  <br />
                  <b>Emisiones Totales a compensar: </b>
                  <span className="font-robotoFlex font-thin">
                    {formatNumber(+campaignSelected?.emissionsLeftToCompensate)}
                  </span>
                  <br />
                  <b>Impresiones: </b>
                  <span className="font-robotoFlex font-thin">
                    {formatNumber(
                      +campaignSelected?.impressionsLeftToCompensate,
                    )}
                  </span>{' '}
                </div>
                {isLoadingCreative && <strong>Cargando...</strong>}
                {errorCreative && (
                  <strong>Hubo un error al obtener los datos</strong>
                )}
                {!isLoadingCreative && campaignSelected && (
                  <div>
                    <div className="mt-8 w-full px-5 py-7 b bg-[#F9FBFC] rounded-md">
                      <DataTable
                        columns={columns}
                        data={creatives}
                        globalFilter={globalFilter}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                      />
                    </div>

                    {
                      <CompensationForm
                        selectedRows={selectedRows}
                        setRowSelection={setRowSelection}
                        campaignId={campaignSelected.campaignId}
                      />
                    }
                  </div>
                )}
              </div>
            }
          </section>
        )}
      </div>
    </div>
  );
};

export default CompensationPage;
