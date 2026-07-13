const METERS_PER_DEGREE = 111320;
const VIEW_PADDING_FACTOR = 1.8; // enquadra uma área maior que o círculo, pra dar espaço visual

export function boundsFromCenter([ lat, lng ], radiusMeters) {
  const viewRadius = radiusMeters * VIEW_PADDING_FACTOR;
  const latDelta = viewRadius / METERS_PER_DEGREE;
  const lngDelta = viewRadius / (METERS_PER_DEGREE * Math.cos((lat * Math.PI) / 180));
  return {
    south: lat - latDelta,
    north: lat + latDelta,
    west: lng - lngDelta,
    east: lng + lngDelta,
  };
}

// Aproxima um círculo geográfico (raio em metros) como polígono — MapLibre não
// tem um primitivo de círculo em unidades reais de distância.
export function circlePolygon([ lat, lng ], radiusMeters, points = 64) {
  const earthRadius = 6371000;
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const angularDistance = radiusMeters / earthRadius;
  const coords = [];
  for (let i = 0; i <= points; i++) {
    const bearing = ((i * 360) / points) * (Math.PI / 180);
    const destLat = Math.asin(
      Math.sin(latRad) * Math.cos(angularDistance) + Math.cos(latRad) * Math.sin(angularDistance) * Math.cos(bearing)
    );
    const destLng =
      lngRad +
      Math.atan2(
        Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(latRad),
        Math.cos(angularDistance) - Math.sin(latRad) * Math.sin(destLat)
      );
    coords.push([ (destLng * 180) / Math.PI, (destLat * 180) / Math.PI ]);
  }
  return { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ coords ] }, properties: {} };
}
