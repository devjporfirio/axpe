import { getParamsFromObject } from 'helpers/utils';
const baseMaps = 'https://maps.googleapis.com/maps/api/';

export default {
  async getPage(reference) {
    // category  - type
    // AX1111    - Apartamento - lancamento
    // AX2629    - Casa        - pronto
    // AX10010   - Apartamento - pronto
    // AX130883  - Cobertura   - pronto
    // AX129334  - Terreno     - pronto
    // AX141776  - Apartamento - pronto

    const result = await fetch(
      `${process.env.config.apiUrl}/building/${reference}`
    )
      .then(response => response.json())
      .then(data => data);
    return result;
  },
  async getGeocode(cep) {
    const apiKey = process.env.config.keyMap;
    const result = await fetch(
      `${baseMaps}geocode/json?address=${cep}${apiKey}`
      // `${process.env.config.apiUrl}/geocode`
    )
      .then(response => response.json())
      .then(data => data);
    return result && result.lenght > 0 ? result.results[0] : [];
  },
  async getDirections(northeast, southwest) {
    const apiKey = process.env.config.keyMap;
    const result = await fetch(
      `${baseMaps}directions/json?origin=${northeast.lat},${northeast.lng}&destination=${southwest.lat},${southwest.lng}${apiKey}`
      // `${process.env.config.apiUrl}/directions`
    )
      .then(response => response.json())
      .then(data => data);
    return result && result.lenght > 0 ? result.results[0] : [];
  },
  async getSimilar(property, limit) {
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

    const result = await fetch(url + getParamsFromObject(params))
      .then(response => response.json())
      .then(data => data);
    return result;
  }
};
