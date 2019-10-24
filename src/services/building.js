export default {
  async getBuildingsSimilar(property, limit) {
    const params = {
      source: property.source,
      use: property.infos.use,
      finality: property.infos.type,
      category: property.catergory,
      local: property.address.local,
      furniture: property.label.is_furnished,
      type: property.type,
      price_start: property.values.release,
      area_start: property.infos.areaUsefulStart,
      area_end: property.infos.areaUsefulEnd,
      bedroom_start: property.infos.bedroomsStart,
      bedroom_end: property.infos.bedroomsEnd,
      parking_start: property.infos.parkingStart,
      parking_end: property.infos.parkingEnd,
      limit
    };
    const url = `${process.env.config.apiUrl}/buildings/find`;

    const paramsJoin = Object.keys(params).reduce(
      (old, p) => (params[p] ? old + '&' + p + '=' + params[p] : old),
      '?'
    );
    const result = await fetch(url + paramsJoin)
      .then(response => response.json())
      .then(data => data);
    return result;
  }
};
