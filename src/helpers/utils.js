export const shuffle = list => {
  return list.sort(() => Math.random() - 0.5);
};

// eslint-disable-next-line compat/compat
export const formatCurrency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0
});

export const formatCurrencyToText = (currency) => {
  let newCurrency = currency || 'R$';
  if(currency === 'EUR') {
    newCurrency = '€';
  } else if(currency === 'USD') {
    newCurrency = 'US$';
  }
  return newCurrency;
}

export const getParamsFromObject = (params) => {
  const initial = '?';
  const sep = '&';
  const paramsJoin = Object.keys(params).reduce(
    (acc, key, i) =>
      !params[key]
        ? acc
        : acc == initial
        ? `${acc}${key}=${params[key]}`
        : `${acc}${sep}${key}=${params[key]}`,
    initial
  );
  return encodeURI(paramsJoin);
};

export const checkPluralSingular = (word, size) => {
  return size === 0 || size > 1 ? `${word}s` : word;
};