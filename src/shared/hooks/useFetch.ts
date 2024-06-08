import { useEffect, useState } from 'react';

export const useFetch = () => {
  const [options, setOptions] = useState({
    url: '',
    options: { method: 'GET' },
  });
  const [state, setState] = useState({
    data: null,
    isLoading: false,
    hasError: null,
  });

  useEffect(() => {
    const getFetch = async () => {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      try {
        const resp = await fetch(options.url, options.options);
        const data = await resp.json();

        if (resp.status >= 400 && resp.status <= 599) {
          const message =
            typeof data.message === 'string'
              ? data.message
              : JSON.stringify(data.message);
          throw new Error(`Error ${resp.status}: ${message}`);
        }

        setState({
          data,
          isLoading: false,
          hasError: null,
        });
      } catch (error) {
        console.log(error);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          hasError: error as null,
        }));
      }
    };

    if (options.url === '') return;
    getFetch();
  }, [options]);

  const reset = () => {
    setState({
      data: null,
      isLoading: false,
      hasError: null,
    });
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
    options,
    setOptions,
    reset,
  };
};
