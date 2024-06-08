import { useQuery } from '@tanstack/react-query';
import { getReport } from '@/services/report';
import {
  ArrowDownIcon,
  ArrowDownOnSquareStackIcon,
} from '@heroicons/react/20/solid';
import { DateTime } from 'luxon';
const url = import.meta.env.VITE_API_URL;
interface Props {
  dates: IDates;
  strategyId: string;
}

const CampaignsReport = ({ dates, strategyId }: Props) => {
  const {
    data: CampaignsReport,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['compensations', { dates, strategyId }],
    queryFn: () => getReport(dates, strategyId),
  });

  return (
    <div className="mt-6 rounded-md  ">
      {isLoading && <strong>Cargando...</strong>}
      {error != null && <strong>Algo ha ido mal</strong>}
      {CampaignsReport == null && !isLoading && <strong>No hay datos</strong>}
      {CampaignsReport != null && (
        <div>
          <div className="flex justify-end py-2 px-4">
            <a
              href={`${url}campaign/report/download/${strategyId}?startDate=${dates.startDate}&endDate=${dates.endDate}`}
              target="_blank"
              className="bg-[#fff] text-[#5dd290]"
            >
              <ArrowDownOnSquareStackIcon className="h-8 w-8" />
            </a>
          </div>
          <table className="min-w-full table-fixed Table">
            <thead>
              <tr>
                <th className="w-[300px]"> Campaña </th>
                <th className="w-[140px]">Fecha de Inicio</th>
                <th className="w-[140px]">Fecha de Fin</th>
                <th className="w-[100px]">Impresiones</th>
                <th className="">Emisiones CO2</th>
                <th className="w-[100px]">Compensaciones</th>
                <th className="">% Carbono neutral </th>
                <th className="">Ver PDF</th>
              </tr>
            </thead>
            <tbody>
              {CampaignsReport?.map((campaignReport: Campaign) => (
                <tr key={campaignReport.id}>
                  <td className="">
                    <div
                      className=" flex flex-col gap-2"
                      title={campaignReport.name}
                    >
                      <span className="block overflow-hidden overflow-ellipsis whitespace-wrap">
                        <b className=" text-[#57a55a]"> Campaña: </b>
                        <span className="">{campaignReport.name}</span>
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    {DateTime.fromISO(campaignReport.start_date).toFormat(
                      'dd LLL yyyy',
                    )}
                  </td>
                  <td className=" text-center">
                    {DateTime.fromISO(campaignReport.end_date).toFormat(
                      'dd LLL yyyy',
                    )}
                  </td>
                  <td className=" text-center">
                    {new Intl.NumberFormat('es-CO').format(
                      Number(campaignReport.impressions),
                    )}
                  </td>
                  <td className=" text-center">
                    {new Intl.NumberFormat('es-CO').format(
                      Number(campaignReport.emissions),
                    )}
                    Kg
                  </td>
                  <td className=" text-center">{campaignReport.compensated}</td>{' '}
                  <td className=" text-center">
                    {campaignReport.compensation_emission_ratio}
                  </td>
                  <td className=" text-center">
                    {campaignReport.compensation_emission_ratio && (
                      <div className="flex  gap-2 justify-center">
                        <a
                          href={`${url}campaign/report/pdf/${
                            campaignReport.id
                          }?startDate=${DateTime.fromISO(
                            campaignReport.start_date,
                          ).toFormat('yyyy-MM-dd')}&endDate=${DateTime.fromISO(
                            campaignReport.end_date,
                          ).toFormat('yyyy-MM-dd')}`}
                          target="_blank"
                          className="text-decoration: none;"
                        >
                          <button
                            title="Compensar"
                            className=" bg-[#44C949] text-[#fff]  p-2 rounded-md text-sm "
                          >
                            <ArrowDownIcon className="h-5 w-5" />
                          </button>
                        </a>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default CampaignsReport;
interface IDates {
  startDate: string;
  endDate: string;
}

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
