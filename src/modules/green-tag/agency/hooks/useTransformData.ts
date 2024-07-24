const useTransformData = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformData = (data: any) => {
    const { compensationStrategies, ...rest } = data;

    const transformedCompensationStrategies = Object.keys(
      compensationStrategies || {},
    )
      .filter((key) => compensationStrategies[key] && data[`show${key}`])
      .map((key) => {
        return {
          name: key,
          ...compensationStrategies[key],
        };
      });

    return {
      ...rest,
      compensationStrategies: transformedCompensationStrategies,
    };
  };

  return { transformData };
};

export default useTransformData;
