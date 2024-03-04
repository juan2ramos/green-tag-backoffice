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
    };
  }) => {
    const { name, value, type, checked } = target;
    const inputValue = type === 'checkbox' ? checked : value;
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
