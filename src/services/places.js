export default {
  async getAroundPois(lat, lng) {
    if (!lat || !lng) return { type: 'FeatureCollection', features: [] };
    const roundedLat = Number(lat).toFixed(3);
    const roundedLng = Number(lng).toFixed(3);
    return fetch(`/api/around-pois?lat=${roundedLat}&lng=${roundedLng}`)
      .then((r) => r.json())
      .catch(() => ({ type: 'FeatureCollection', features: [] }));
  },
  // Fallback gratuito (Nominatim/OSM) — usado quando o Google Geocoding falha
  // (ex.: chave sem billing habilitado, quota excedida).
  // type: 'postcode' exige que o resultado seja mesmo um CEP reconhecido pelo
  // OSM — evita aceitar um "chute" do Nominatim em endereço não relacionado.
  async geocode(query, type) {
    if (!query) return null;
    const typeParam = type ? `&type=${encodeURIComponent(type)}` : '';
    return fetch(`/api/geocode?q=${encodeURIComponent(query)}${typeParam}`)
      .then((r) => r.json())
      .then((d) => (d && d.lat && d.lng ? [ d.lat, d.lng ] : null))
      .catch(() => null);
  },
};
