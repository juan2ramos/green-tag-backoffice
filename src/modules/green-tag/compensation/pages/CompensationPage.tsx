import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { getCompensation } from '../services/compensation';

import { columns } from '../components/data-table/columns';
import { DataTable } from '../components/data-table/data-table';

import { useState } from 'react';
import { normalizeData } from '../helpers/normalize-data';
import { CompensationForm } from '../components/CompensationsForm';
import { ImpressionsForm } from '../components/ImpressionsForm';

const CompensationPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['compensations'],
    queryFn: () => getCompensation(),
  });

  const [globalFilter, setGlobalFilter] = useState('');
  const normalizedData = data ? normalizeData(data) : [];
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>(
    {},
  );

  const selectedRows = Object.keys(rowSelection)
    .filter((key) => rowSelection[key])
    .map((key) => normalizedData[+key]);

  return (
    <div className="flex flex-col gap-6">
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Obtener impresiones para compensar</h2>
          <hr />
          <ImpressionsForm />
        </div>
      </section>
      <div className="flex items-center justify-end">
        <Input
          placeholder="Filtrar por campaña o anunciante"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm mb-4"
        />
      </div>
      <div className="flex flex-col gap-6">
        <section className="wrapper">
          <div className="w-full">
            <h2 className="pb-2">Listado de campañas a compensar</h2>
            <hr />

            {isLoading && <strong>Cargando...</strong>}
            {error && <strong>Hubo un error al obtener los datos</strong>}
            {!isLoading && normalizedData.length === 0 && (
              <strong>No hay datos</strong>
            )}
            {!isLoading && normalizedData.length > 0 && (
              <div>
                <CompensationForm selectedRows={selectedRows} />
                <div className="mt-8 w-full px-5 py-7 b bg-[#F9FBFC] rounded-md">
                  <DataTable
                    columns={columns}
                    data={normalizedData}
                    globalFilter={globalFilter}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompensationPage;
