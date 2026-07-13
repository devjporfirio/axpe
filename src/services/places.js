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
  async geocode(query) {
    if (!query) return null;
    return fetch(`/api/geocode?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((d) => (d && d.lat && d.lng ? [ d.lat, d.lng ] : null))
      .catch(() => null);
  },
};
