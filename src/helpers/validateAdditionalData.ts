export const validateAdditionalData = (
  data: unknown[] | { [s: string]: unknown } | ArrayLike<unknown>,
) => {
  const values = Object.values(data);

  const allEmpty = values.every((val) => val === '');
  if (allEmpty) return 'empty';

  const anyFilled = values.some((val) => val !== '');
  const noneEmpty = values.every((val) => val !== '');
  if (anyFilled && noneEmpty) return 'filled';

  return 'error';
};
