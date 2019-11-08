import { getUrl } from 'helpers/utils';
const baseMaps = 'https://maps.googleapis.com/maps/api/';
// https://maps.googleapis.com/maps/api/geocode/json?address=52050370&key=AIzaSyAn4jhPJpyJwgIYnYyr4Kaj1JSyg74Qoto
// https://maps.googleapis.com/maps/api/directions/json?origin=-26.9040582,-49.0882946&destination=-26.9061099,-49.09195949999999&key=AIzaSyAn4jhPJpyJwgIYnYyr4Kaj1JSyg74Qoto

export default {
  async getPage(reference) {
    // category  - type
    // AX1111    - Apartamento - lancamento
    // AX2629    - Casa        - pronto
    // AX10010   - Apartamento - pronto - zipcode
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
    const res = await fetch(
      `${baseMaps}geocode/json?address=${cep}&key=${apiKey}`
    )
      .then(response => response.json())
      .then(data => data);
    return res.results && res.results.length > 0 ? res.results[0] : [];
  },
  async getDirections(northeast, southwest) {
    const apiKey = process.env.config.keyMap;
    const res = await fetch(
      `${baseMaps}directions/json?origin=${northeast.lat},${northeast.lng}&destination=${southwest.lat},${southwest.lng}&key=${apiKey}`
    )
      .then(response => response.json())
      .then(data => data);
    return res.results && res.results.length > 0 ? res.results[0] : [];
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

    const result = await fetch(url + getUrl(params))
      .then(response => response.json())
      .then(data => data);
    return result;
  }
};
