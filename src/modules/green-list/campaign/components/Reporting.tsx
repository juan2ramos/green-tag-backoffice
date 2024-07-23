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
import { useCreatePlanningMutation } from '@/modules/green-tag/projects/hooks/usePlaning';
import { UploadIcon } from '@radix-ui/react-icons';

interface ReportingProps {
  dialogOpen: boolean;
  handleCancel: () => void;
  campaignId: number;
}

export const Reporting = ({
  dialogOpen,
  handleCancel,
  campaignId,
}: ReportingProps) => {
  const { mutation, selectedFile, fileName, handleFileChange } =
    useCreatePlanningMutation(campaignId, handleCancel);

  const handleUpload = async () => {
    if (selectedFile) {
      mutation.mutate({
        file: selectedFile,
        campaignId: campaignId.toString(),
      });
    }
  };
  return (
    <Dialog open={dialogOpen}>
      <DialogContent>
        <DialogHeader className="font-[700] text-[16px] text-center">
          <DialogTitle>Subir listado sitios a reportar </DialogTitle>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
