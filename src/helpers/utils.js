export const suffle = list => {
  return list.sort(() => Math.random() - 0.5);
};

// eslint-disable-next-line compat/compat
export const formatCurrency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 3
});

export const getUrl = params => {
  const initial = '?';
  const paramsJoin = Object.keys(params).reduce(
    (acc, key, i) =>
      !params[key]
        ? acc
        : acc == initial
        ? `${acc}${key}=${params[key]}`
        : `${acc}&amp;${key}=${params[key]}`,
    initial
  );
  return encodeURI(paramsJoin);
};
