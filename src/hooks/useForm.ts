import { useState } from 'react';

export const useForm = <T>(initialForm: T) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({
    target,
  }: {
    target: {
      name: string;
      value: string | unknown[];
      type?: string;
      checked?: boolean;
      files?: FileList | null;
    };
  }) => {
    const { name, value, type, checked, files } = target;
    const inputValue =
      type === 'checkbox'
        ? checked
        : type === 'file'
        ? files
          ? files[0]
          : value
        : value;
    setFormState({
      ...formState,
      [name]: inputValue,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
};
