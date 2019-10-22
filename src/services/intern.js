const baseMaps = 'https://maps.googleapis.com/maps/api/';

export default {
  async loadIntern(reference) {
    //      category  - type
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
    return result.results[0];
  },
  async getDirections(northeast, southwest) {
    const apiKey = process.env.config.keyMap;
    const result = await fetch(
      `${baseMaps}directions/json?origin=${northeast.lat},${northeast.lng}&destination=${southwest.lat},${southwest.lng}${apiKey}`
      // `${process.env.config.apiUrl}/directions`
    )
      .then(response => response.json())
      .then(data => data);
     return result.results[0];
  }
};
