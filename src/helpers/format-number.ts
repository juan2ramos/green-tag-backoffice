export const formatNumber = (number: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'decimal',
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(number);
