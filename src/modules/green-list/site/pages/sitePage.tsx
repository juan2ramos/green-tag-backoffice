import { useQuery } from '@tanstack/react-query';
import { downloadSites, getSites } from '../services/sites';
import { DataTable } from '../components/data-table/data-table';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { columns } from '../components/data-table/columns';

export const SitePage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState('url');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data: sites } = useQuery({
    queryKey: ['sites', page, pageSize, sortBy, sortOrder],
    queryFn: () => getSites({ page, pageSize, sortBy, sortOrder }),
  });
  useEffect(() => {
    if (sites) {
      setTotalRecords(sites.total);
    }
  }, [sites]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handleSortChange = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const downloadSitesButton = async () => {
    setLoading(true);
    const response = await downloadSites();
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', 'sites.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-4">
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Listado de sitios </h2>
          <hr />
          <div className="w-full flex justify-end mt-8 gap-2">
            {/* TODO {
              <Button
                variant={'create'}
                className="text-[12px] w-48 bg-[#D8EAF7] text-[#4D6D98]"
              >
                <UploadIcon className="w-4 h-4 mr-1" />
                Cargar sitios CSV
              </Button>
            } */}
            <Button
              variant={'create'}
              className="text-[12px] w-48"
              onClick={downloadSitesButton}
              disabled={loading}
            >
              <DownloadIcon className="w-4 h-4 mr-1" />
              Descargar Excel
            </Button>
          </div>
          <div className="mt-8 w-full px-5 py-7 b bg-[#F9FBFC] rounded-md">
            {sites && (
              <DataTable
                columns={columns}
                data={sites.data}
                page={page}
                pageSize={pageSize}
                totalRecords={totalRecords}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
