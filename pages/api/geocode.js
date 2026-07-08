export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    res.status(400).json({ lat: null, lng: null });
    return;
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1&countrycodes=br`,
      {
        headers: {
          'Accept-Language': 'pt-BR',
          'User-Agent': 'AxpeImoveis/1.0 (+https://www.axpe.com.br)',
        },
      }
    );
    const results = await response.json();
    const first = results[0];

    // Sucesso cacheia 30 dias (endereço não muda) — falha/sem resultado cacheia
    // só 60s, senão um erro/instabilidade momentânea do Nominatim "prende" o
    // mapa desligado por um mês inteiro pra aquele imóvel.
    res.setHeader(
      'Cache-Control',
      first
        ? 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=2592000'
        : 'public, max-age=60, s-maxage=60, stale-while-revalidate=60'
    );
    res.status(200).json(first ? { lat: parseFloat(first.lat), lng: parseFloat(first.lon) } : { lat: null, lng: null });
  } catch (err) {
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=60');
    res.status(200).json({ lat: null, lng: null });
  }
}
