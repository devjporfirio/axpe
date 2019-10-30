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
  const paramsJoin = Object.keys(params).reduce(
    (old, p) => (params[p] ? old + '&' + p + '=' + params[p] : old),
    '?'
  );
  return encodeURI(paramsJoin);
};
