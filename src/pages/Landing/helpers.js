export const orderOptions = [
  { label: 'Mais Recentes', value: 'latest' },
  { label: 'Menor Área útil', value: 'lowest_area' },
  { label: 'Maior Área útil', value: 'biggest_area' },
  { label: 'Menor Preço', value: 'lowest_price' },
  { label: 'Maior Preço', value: 'biggest_price' },
];

export const finalityOptions = [
  { label: 'Todos', value: '' },
  { label: 'Comprar', value: 'venda' },
  { label: 'Alugar', value: 'aluguel' },
];

export const getBuildingPrice = (building) =>
  Number(
    building?.values?.sell || building?.values?.release || building?.values?.rent || 0
  );

export const matchesFinality = (building, finality) => {
  if (!finality) return true;
  if (finality === 'venda') return !!(building?.values?.sell || building?.values?.release);
  if (finality === 'aluguel') return !!building?.values?.rent;
  return true;
};

// Bairros derivados dos imóveis da própria LP: entram/saem junto com os imóveis
export const getLocalOptions = (buildings) => [
  { label: 'Todos os bairros', value: '' },
  ...[ ...new Set(buildings.map((building) => building?.address?.local).filter(Boolean)) ]
    .sort((a, b) => a.localeCompare(b, 'pt-BR'))
    .map((local) => ({ label: local, value: local })),
];

export const matchesLocal = (building, local) => !local || building?.address?.local === local;

export const sortBuildings = (list, order) => {
  const sorted = [ ...list ];

  switch (order) {
    case 'lowest_area':
      return sorted.sort((a, b) => (a.infos?.areaTotal || 0) - (b.infos?.areaTotal || 0));
    case 'biggest_area':
      return sorted.sort((a, b) => (b.infos?.areaTotal || 0) - (a.infos?.areaTotal || 0));
    case 'lowest_price':
      return sorted.sort((a, b) => getBuildingPrice(a) - getBuildingPrice(b));
    case 'biggest_price':
      return sorted.sort((a, b) => getBuildingPrice(b) - getBuildingPrice(a));
    case 'latest':
    default:
      return sorted.sort((a, b) => b.id - a.id);
  }
};

export const trimBuildingForListing = (building) => ({
  id: building.id,
  status: building.status,
  type: building.type,
  source: building.source,
  slug: building.slug,
  reference: building.reference,
  category: building.category,
  label: building.label,
  imageFeatured: building.imageFeatured,
  address: building.address ? { local: building.address.local } : building.address,
  values: building.values
    ? {
        sell: building.values.sell,
        rent: building.values.rent,
        release: building.values.release,
        currency: building.values.currency,
        valueOnlyConsults: building.values.valueOnlyConsults,
      }
    : building.values,
  infos: building.infos
    ? {
        use: building.infos.use,
        bedrooms: building.infos.bedrooms,
        bedroomsStart: building.infos.bedroomsStart,
        bedroomsEnd: building.infos.bedroomsEnd,
        suites: building.infos.suites,
        suitesStart: building.infos.suitesStart,
        parking: building.infos.parking,
        parkingStart: building.infos.parkingStart,
        parkingEnd: building.infos.parkingEnd,
        areaBuilding: building.infos.areaBuilding,
        areaTotal: building.infos.areaTotal,
        areaGround: building.infos.areaGround,
        areaUseful: building.infos.areaUseful,
        areaUsefulStart: building.infos.areaUsefulStart,
        areaUsefulEnd: building.infos.areaUsefulEnd,
        releaseStatus: building.infos.releaseStatus,
        releaseDelivery: building.infos.releaseDelivery,
        internalDescription: building.infos.internalDescription,
      }
    : building.infos,
  gallery: building.gallery || [],
});
