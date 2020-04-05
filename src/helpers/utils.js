export const shuffle = list => {
  return list.sort(() => Math.random() - 0.5);
};

// eslint-disable-next-line compat/compat
export const formatCurrency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0
});

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

export const getBuildingUrl = (obj) => {
  let baseSlug = 'imovel';
  const type = obj.type;

  // /imovel/[tipo]-[comprar/alugar]-[bairro]-sp-[m²]-[referencia]
  // /imovel/[tipo]-[comprar/alugar]-[cidade]-[país]-[m²]-[referencia]
  // /lancamentos/[tipo]-[comprar/alugar]-[bairro]-sp-[referencia]
  // /[praia/campo]/[tipo]-[comprar/alugar]-[cidade]-[m²]-[referencia]

  if(obj.source === 'praia') {
    baseSlug = 'praia';
  } else if(obj.source === 'campo') {
    baseSlug = 'campo';
  } else if(type === 'lancamento') {
    baseSlug = 'lancamentos';
  }

  return `/${baseSlug}/${obj.slug}`;
}

export const checkPluralSingular = (word, size) => {
  return size === 0 || size > 1 ? `${word}s` : word;
};
