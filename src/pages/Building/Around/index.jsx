import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Api from 'services';

// components
import CategoryFilters from './CategoryFilters';

// styles
import { Container, Title, MapContainer } from './styles';

const AroundMap = dynamic(() => import('./AroundMap'), { ssr: false }); // MapLibre precisa de window/document

const AREA_RADIUS = 600; // metros — raio do círculo de privacidade

function Around({ local, state, country, cep, onUnavailable }) {
  const [ center, setCenter ] = useState(null);
  const [ pois, setPois ] = useState({ type: 'FeatureCollection', features: [] });

  const [ activeCategories, setActiveCategories ] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!local && !cep) {
        onUnavailable?.();
        return;
      }

      const byCep = cep && (await Api.Places.geocode(`${cep}, Brasil`));
      if (byCep) {
        if (!cancelled) setCenter(byCep);
        return;
      }

      const byLocal = local && (await Api.Places.geocode([ local, state, country || 'Brasil' ].filter(Boolean).join(', ')));
      if (byLocal) {
        if (!cancelled) setCenter(byLocal);
        return;
      }

      if (!cancelled) onUnavailable?.();
    })();
    return () => { cancelled = true; };
  }, [ local, state, country, cep ]);

  useEffect(() => {
    if (!center) return;
    Api.Places.getAroundPois(center[0], center[1]).then(setPois);
  }, [ center ]);

  const toggleCategory = (key) => {
    setActiveCategories((current) => (current.includes(key) ? current.filter((c) => c !== key) : [ ...current, key ]));
  };

  if (!center) return null;

  return (
    <Container>
      <Title>O que há por perto</Title>
      <CategoryFilters active={activeCategories} onToggle={toggleCategory} />
      <MapContainer>
        <AroundMap center={center} pois={pois} activeCategories={activeCategories} radius={AREA_RADIUS} onError={onUnavailable} />
      </MapContainer>
    </Container>
  );
}

export default Around;
