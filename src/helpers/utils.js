import slugify from 'slugify';

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
  const slug = [ obj.type ];
  const reference = obj.reference;
  const neighborhood = obj.address && obj.address.local ? slugify(obj.address.local.toLowerCase()) : null;
  const city = obj.address && obj.address.region ? slugify(obj.address.region.toLowerCase()) : null;
  const areaUseful = obj.infos && obj.infos.areaUseful ? `${parseInt(obj.infos.areaUseful)}m` : null;

  // /imovel/[tipo]-[comprar/alugar]-[bairro]-sp-[m²]-[referencia]
  // /imovel/[tipo]-[comprar/alugar]-[cidade]-[país]-[m²]-[referencia]
  // /lancamentos/[tipo]-[comprar/alugar]-[bairro]-sp-[referencia]
  // /[praia/campo]/[tipo]-[comprar/alugar]-[cidade]-[m²]-[referencia]

  if(obj.infos) {
    if(obj.infos.type === 'VENDA') {
      slug.push('comprar');
    } else if(obj.infos.type === 'ALUGUEL') {
      slug.push('alugar');
    } else {
      slug.push('comprar-alugar');
    }
  } else {
    slug.push('comprar-alugar');
  }

  if(neighborhood) {
    slug.push(neighborhood);
  }

  if(city) {
    slug.push(city);
  }

  if(obj.source === 'praia') {
    baseSlug = 'praia';
  } else if(obj.source === 'campo') {
    baseSlug = 'campo';
  }

  if(areaUseful) {
    slug.push(areaUseful);
  }

  if(reference) {
    slug.push(reference);
  }

  if(slug[0] === 'lancamento') {
    slug.shift();
    baseSlug = 'lancamentos';
  }

  return `/${baseSlug}/${slug.join('-')}`;
}

export const checkPluralSingular = (word, size) => {
  return size === 0 || size > 1 ? `${word}s` : word;
};
