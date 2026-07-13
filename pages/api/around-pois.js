const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
];

const DEFAULT_RADIUS = 1200;
const MIN_RADIUS = 300;
const MAX_RADIUS = 3000;
const OVERPASS_TIMEOUT_MS = 9000;

function buildQuery(lat, lon, radius) {
  const around = `around:${radius},${lat},${lon}`;
  return `
    [out:json][timeout:8];
    (
      nwr["amenity"="school"](${around});
      nwr["shop"~"^(supermarket|convenience)$"](${around});
      nwr["amenity"~"^(restaurant|cafe)$"](${around});
      nwr["leisure"="park"](${around});
      nwr["tourism"](${around});
      nwr["amenity"~"^(hospital|pharmacy)$"](${around});
      nwr["highway"="bus_stop"](${around});
      nwr["railway"="station"](${around});
    );
    out center 200;
  `;
}

function categorize(tags) {
  if (!tags) return null;
  if (tags.amenity === 'school') return 'school';
  if (tags.shop === 'supermarket' || tags.shop === 'convenience') return 'market';
  if (tags.amenity === 'restaurant' || tags.amenity === 'cafe') return 'food';
  if (tags.leisure === 'park') return 'park';
  if (tags.tourism) return 'tourism';
  if (tags.amenity === 'hospital' || tags.amenity === 'pharmacy') return 'health';
  if (tags.highway === 'bus_stop' || tags.railway === 'station') return 'transit';
  return null;
}

async function queryOverpass(query) {
  for (const endpoint of OVERPASS_ENDPOINTS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), OVERPASS_TIMEOUT_MS);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          Accept: 'application/json',
          'User-Agent': 'AxpeImoveis/1.0 (+https://www.axpe.com.br)',
        },
        body: query,
        signal: controller.signal,
      });

      if (!response.ok) {
        console.warn('[around-pois] overpass non-ok, trying next endpoint', endpoint, response.status);
        continue;
      }

      const data = await response.json();
      return data.elements || [];
    } catch (err) {
      console.warn('[around-pois] overpass error, trying next endpoint', endpoint, err.message);
      continue;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return null; // null = falha em todos os endpoints (distinto de [] = sucesso sem resultados)
}

function toFeatureCollection(elements) {
  const features = [];
  for (const el of elements) {
    const category = categorize(el.tags);
    if (!category) continue;

    const lat = el.type === 'node' ? el.lat : el.center && el.center.lat;
    const lon = el.type === 'node' ? el.lon : el.center && el.center.lon;
    if (typeof lat !== 'number' || typeof lon !== 'number') continue;

    features.push({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [ lon, lat ] },
      properties: { category, name: (el.tags && el.tags.name) || null },
    });
  }
  return { type: 'FeatureCollection', features };
}

export default async function handler(req, res) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radius = Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, parseInt(req.query.radius, 10) || DEFAULT_RADIUS));

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    res.status(400).json({ type: 'FeatureCollection', features: [] });
    return;
  }

  // Arredonda para ~111m — imóveis próximos caem na mesma URL/cache key
  const bucketedLat = lat.toFixed(3);
  const bucketedLng = lng.toFixed(3);

  let featureCollection = { type: 'FeatureCollection', features: [] };
  let succeeded = false;

  try {
    const elements = await queryOverpass(buildQuery(bucketedLat, bucketedLng, radius));
    if (elements !== null) {
      featureCollection = toFeatureCollection(elements);
      succeeded = true;
    }
  } catch (err) {
    // Overpass indisponível — devolve coleção vazia em vez de dar erro na página
  }

  // Sucesso (mesmo vazio) cacheia 30 dias — POI muda raramente.
  // Falha cacheia só 30s — não "congela" o mapa sem POI por muito tempo.
  res.setHeader(
    'Cache-Control',
    succeeded
      ? 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=2592000'
      : 'public, max-age=30, s-maxage=30, stale-while-revalidate=60'
  );
  res.status(200).json(featureCollection);
}
