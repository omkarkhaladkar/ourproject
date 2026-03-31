export const formatCurrency = (value) => {
  const amount = Number(value || 0);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatCompactPrice = (value) => {
  const amount = Number(value || 0);

  if (!amount) return 'Price on request';

  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(amount % 10000000 === 0 ? 0 : 2)} Cr`;
  }

  if (amount >= 100000) {
    return `${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 2)} Lac`;
  }

  return formatCurrency(amount);
};

export default formatCompactPrice;

