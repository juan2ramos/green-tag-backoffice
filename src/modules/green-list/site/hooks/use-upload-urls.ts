import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { uploadUrls } from '../services/sites';
import { toast } from 'sonner';

export const useUploadUrlsMutation = (handleCancel: () => void) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>(
    'Selecciona el archivo .csv con las url de los sitios',
  );
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
    }
  };
  const mutation = useMutation({
    mutationFn: uploadUrls,

    onSuccess: () => {
      toast.success(`Notificación`, {
        position: 'top-right',
        description: `¡El Archivo se ha subido correctamente!`,
        duration: 4000,
        action: {
          label: 'Cerrar',
          onClick: () => console.log('Undo'),
        },
      });
      handleCancel();
    },
    onError: () => {
      toast.error(`Notificación`, {
        position: 'top-right',
        description: `¡Hubo un error!`,
        duration: 4000,
        action: {
          label: 'Cerrar',
          onClick: () => console.log('Undo'),
        },
      });
    },
  });
  return {
    mutation,
    handleFileChange,
    selectedFile,
    fileName,
  };
};
