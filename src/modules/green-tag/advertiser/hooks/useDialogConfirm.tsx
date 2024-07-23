import { useEffect, useState } from 'react';
import { useOptInMutation } from './useOptIn';

interface AdvertiserData {
  name: string;
  externalId: string;
  active: boolean;
  strategyId: string;
}

export const useDialogConfirm = (advertiserData: AdvertiserData) => {
  const [checked, setChecked] = useState(advertiserData.active);
  const [dialogOpen, setDialogOpen] = useState(false);
  const mutation = useOptInMutation();
  const handleCheckboxChange = () => {
    setDialogOpen(true);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setChecked((prevChecked) => !prevChecked);
      mutation.reset();
      handleCancel();
    }
    if (mutation.isError) {
      handleCancel();
    }
  }, [mutation]);

  const handleConfirm = () => {
    mutation.mutate({ ...advertiserData, active: !checked });
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };
  return {
    checked,
    dialogOpen,
    isLoading: mutation.isPending,
    handleCheckboxChange,
    handleConfirm,
    handleCancel,
  };
};
