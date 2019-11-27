import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Api from 'services';
import mapOptions from './mapOptions';

import IPinDesktop from 'assets/icons/pin-desktop.svg';
import IPinMobile from 'assets/icons/pin-mobile.svg';

import { Container, Mapa, Pin, Text } from './styles';

export default function Around({ cep, text }) {
  const [ overvirePoly, setOverviewPoly ] = useState('');

  useEffect(() => {
    async function loadOverviewPolyline() {
      const geocode = await Api.Building.getGeocode(cep.replace('-', ''));
      if (geocode && geocode.geometry && geocode.geometry.viewport) {
        const directions = await Api.Building.getDirections(
          geocode.geometry.viewport.northeast,
          geocode.geometry.viewport.southwest
        );
        setOverviewPoly(directions.routes[0].overview_polyline.points);
      }
    }
    loadOverviewPolyline();
  }, []);

  return (
    <Container>
      <Mapa>
        {!!overvirePoly && !!process.env.config.keyMap && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.config.keyMap
            }}
            defaultCenter={{
              lat: -23.533773,
              lng: -46.62529
            }}
            options={mapOptions}
            defaultZoom={11}
            onGoogleApiLoaded={google => {
              function animateLine(line) {
                window.setInterval(function() {
                  line.set('strokeWeight', line.strokeWeight === 8 ? 6 : 8);
                }, 1000);
              }

              const polyline = new google.maps.Polyline({
                path: google.maps.geometry.encoding.decodePath(overvirePoly),
                geodesic: true,
                strokeColor: '#EE6900',
                strokeOpacity: 1.0,
                strokeDasharray: 300,
                strokeWeight: 8
              });
              animateLine(polyline);
              polyline.setMap(google.map);
            }}
          ></GoogleMapReact>
        )}
      </Mapa>

      <Pin src={IPinDesktop} mq="desktop" alt="" />
      <Pin src={IPinMobile} mq="mobile" alt="" />

      <Text item={{ title: 'Ao seu redor', text }} />
    </Container>
  );
}
