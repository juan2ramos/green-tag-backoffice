import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createReporting } from '../services/reporting';

export const useReportingMutation = (id: number, handleCancel: () => void) => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>(
    'Selecciona el archivo con los sitios',
  );
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
    }
  };
  const mutation = useMutation({
    mutationFn: createReporting,

    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ['campaign', id.toString()],
        });
        handleCancel();
      }, 1000);
    },
  });
  return {
    mutation,
    handleFileChange,
    selectedFile,
    fileName,
  };
};
