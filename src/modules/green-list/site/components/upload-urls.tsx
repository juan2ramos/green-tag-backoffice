import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DownloadIcon, UploadIcon } from '@radix-ui/react-icons';
import { useUploadUrlsMutation } from '../hooks/use-upload-urls';

interface UploadUrlsProps {
  dialogOpen: boolean;
  handleCancel: () => void;
}

export const UploadUrls = ({ dialogOpen, handleCancel }: UploadUrlsProps) => {
  const { mutation, selectedFile, fileName, handleFileChange } =
    useUploadUrlsMutation(handleCancel);

  const handleUpload = async () => {
    if (selectedFile) mutation.mutate(selectedFile);
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader className="font-[700] text-[16px] text-center">
          <DialogTitle>Subir listado de nuevos sitios </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <label
            htmlFor="logo-upload"
            className="text-center w-full border border-dashed block text-gray-700 text-[12px] py-[6px] cursor-pointer"
          >
            {fileName}
          </label>
          <Input
            id="logo-upload"
            type="file"
            accept=".csv"
            className="hidden"
            placeholder="Logo del Proyecto"
            onChange={handleFileChange}
          />
        </DialogDescription>
        <DialogFooter className="mt-4">
          <Button
            variant={'create'}
            className="w-40"
            disabled={!selectedFile || mutation.isPending}
            onClick={handleUpload}
          >
            <UploadIcon className="w-4 h-4 mr-1 " /> Subir
          </Button>
          <Button
            onClick={handleCancel}
            variant="secondary"
            disabled={mutation.isPending}
          >
            Cancelar
          </Button>
          <div className="flex items-center">
            <a
              href="https://ads.green-tag.io/examples/urls.csv"
              target="_blank"
              className=" text-greenTTY-dark"
            >
              Descarga la plantilla
            </a>
            <DownloadIcon className="ml-1" />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
