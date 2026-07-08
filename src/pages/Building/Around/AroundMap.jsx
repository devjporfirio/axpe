import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { boundsFromCenter, circlePolygon } from 'helpers/geo';

import ISchool from 'assets/icons/poi/poi-school.svg';
import IMarket from 'assets/icons/poi/poi-market.svg';
import IFood from 'assets/icons/poi/poi-food.svg';
import IPark from 'assets/icons/poi/poi-park.svg';
import ITourism from 'assets/icons/poi/poi-tourism.svg';
import IHealth from 'assets/icons/poi/poi-health.svg';
import ITransit from 'assets/icons/poi/poi-transit.svg';

import { MapWrapper, FullscreenButton } from './styles';

const CATEGORY_ICONS = { school: ISchool, market: IMarket, food: IFood, park: IPark, tourism: ITourism, health: IHealth, transit: ITransit };
const STYLE_URL = 'https://tiles.openfreemap.org/styles/bright';

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function loadSvgImage(url, size = 32) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, size, size);
      try { resolve(ctx.getImageData(0, 0, size, size)); } catch (e) { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function filterByCategories(pois, activeCategories) {
  if (!pois || !pois.features) return { type: 'FeatureCollection', features: [] };
  return { type: 'FeatureCollection', features: pois.features.filter((f) => activeCategories.includes(f.properties.category)) };
}

function AroundMap({ center, pois, activeCategories, radius, onError }) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [ isFullscreen, setIsFullscreen ] = useState(false);
  const [ isReady, setIsReady ] = useState(false);

  useEffect(() => {
    const { south, west, north, east } = boundsFromCenter(center, radius);
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      bounds: [ [ west, south ], [ east, north ] ],
      scrollZoom: false,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-left');
    mapRef.current = map;

    // Sem isso, uma falha ao carregar o estilo/tiles (ex.: tiles.openfreemap.org
    // fora do ar) deixa só a caixa escura de "carregando" parada pra sempre,
    // sem nenhum rastro no console pra diagnosticar depois.
    map.on('error', (e) => {
      console.warn('[AroundMap] maplibre error', e?.error?.message || e);
      onError?.();
    });

    map.on('load', () => {
      Promise.all(
        Object.entries(CATEGORY_ICONS).map(([ key, url ]) =>
          loadSvgImage(url).then((image) => {
            if (image && !map.hasImage(`poi-${key}`)) map.addImage(`poi-${key}`, image);
          })
        )
      ).then(() => {
        map.addSource('around-area-circle-src', { type: 'geojson', data: circlePolygon(center, radius) });
        map.addLayer({ id: 'around-area-circle', type: 'fill', source: 'around-area-circle-src', paint: { 'fill-color': '#8a8a8a', 'fill-opacity': 0.28 } });
        map.addLayer({ id: 'around-area-circle-outline', type: 'line', source: 'around-area-circle-src', paint: { 'line-color': '#4a4a4a', 'line-width': 2, 'line-opacity': 0.7 } });

        map.addSource('around-pois-src', {
          type: 'geojson',
          data: filterByCategories(pois, activeCategories),
          cluster: true,
          clusterRadius: 40,
          clusterMaxZoom: 12,
        });

        map.addLayer({
          id: 'clusters', type: 'circle', source: 'around-pois-src', filter: [ 'has', 'point_count' ],
          paint: { 'circle-color': '#5C7FA6', 'circle-radius': [ 'step', [ 'get', 'point_count' ], 14, 10, 18, 25, 22 ], 'circle-opacity': 0.85 },
        });
        map.addLayer({
          id: 'cluster-count', type: 'symbol', source: 'around-pois-src', filter: [ 'has', 'point_count' ],
          layout: { 'text-field': '{point_count_abbreviated}', 'text-size': 12 }, paint: { 'text-color': '#fff' },
        });
        map.addLayer({
          id: 'unclustered-point', type: 'symbol', source: 'around-pois-src', filter: [ '!', [ 'has', 'point_count' ] ],
          layout: { 'icon-image': [ 'concat', 'poi-', [ 'get', 'category' ] ], 'icon-size': 0.75, 'icon-allow-overlap': true },
        });

        map.on('click', 'unclustered-point', (e) => {
          const name = e.features[0].properties.name;
          if (!name) return;
          new maplibregl.Popup({ offset: 12 }).setLngLat(e.features[0].geometry.coordinates).setHTML(`<strong>${escapeHtml(name)}</strong>`).addTo(map);
        });
        map.on('mouseenter', 'unclustered-point', () => { map.getCanvas().style.cursor = 'pointer'; });
        map.on('mouseleave', 'unclustered-point', () => { map.getCanvas().style.cursor = ''; });

        setIsReady(true);
      });
    });

    return () => { map.remove(); mapRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // monta 1x — center/radius não mudam durante a vida do componente

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isReady) return;
    const source = map.getSource('around-pois-src');
    if (source) source.setData(filterByCategories(pois, activeCategories));
  }, [ pois, activeCategories, isReady ]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (isFullscreen) map.scrollZoom.enable(); else map.scrollZoom.disable();
    const id = setTimeout(() => map.resize(), 150);
    return () => clearTimeout(id);
  }, [ isFullscreen ]);

  const toggleFullscreen = () => {
    const el = wrapperRef.current;
    if (!document.fullscreenElement) (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
    else (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
  };

  return (
    <MapWrapper ref={wrapperRef}>
      <div ref={containerRef} style={{ width: '100%', height: '100%', filter: 'saturate(0.6)' }} />
      <FullscreenButton
        type="button"
        onClick={toggleFullscreen}
        title={isFullscreen ? 'Sair da tela cheia' : 'Ver em tela cheia'}
      >
        {isFullscreen ? '⤡' : '⤢'}
      </FullscreenButton>
    </MapWrapper>
  );
}

export default AroundMap;
