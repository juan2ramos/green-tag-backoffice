import { useCallback, useEffect, useState } from 'react';

export const useFetch = (url: string) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null,
  });

  const getFetch = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const resp = await fetch(url);
    const data = await resp.json();

    setState({
      data,
      isLoading: false,
      hasError: null,
    });
  }, [url]);

  useEffect(() => {
    getFetch();
  }, [getFetch]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
