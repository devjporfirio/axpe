import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Api from 'services';
import mapOptions from './mapOptions';

// assets
import PinDesktopIconSVG from 'assets/icons/pin-desktop';
import PinWhiteIconSVG from 'assets/icons/pin-white';

// styles
import { Container, Mapa, Pin, Text } from './styles';

function Around({ local, cep, text }) {
  const [ overvirePoly, setOverviewPoly ] = useState('');
  const [ zipCode, setZipCode ] = useState('');
  const [ lat, setLat ] = useState('');
  const [ lng, setLng ] = useState('');
  const [ isEnabled, setIsEnabled ] = useState(false);

  useEffect(() => {
    setZipCode(cep);
  }, [ cep ]);

  useEffect(() => {
    async function loadOverviewPolyline() {
      const geocode = await Api.Building.getGeocode(local, zipCode.replace('-', ''));

      if (zipCode && geocode && geocode.geometry && geocode.geometry.bounds) {
        const directions = await Api.Building.getDirections(
          geocode.geometry.bounds.northeast,
          geocode.geometry.bounds.southwest
        );

        setIsEnabled(true);
        setLat(geocode.geometry.location.lat);
        setLng(geocode.geometry.location.lng);

        if (directions && directions.routes && directions.routes.length > 0) {
          setOverviewPoly(directions.routes[0].overview_polyline.points);
        }
      } else {
        setIsEnabled(false);
      }
    }

    loadOverviewPolyline();
  }, [ zipCode ]);

  return !!overvirePoly &&
    !!process.env.config.googleApiKey &&
    cep === zipCode &&
    isEnabled ? (
    <Container>
      <Mapa>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.config.googleApiKey,
          }}
          defaultCenter={{
            lat: -14.235004,
            lng: -51.925282
          }}
          options={mapOptions}
          defaultZoom={16}
          onGoogleApiLoaded={(google) => {
            function animateLine(line) {
              window.setInterval(function() {
                line.set('strokeWeight', line.strokeWeight === 8 ? 6 : 8);
              }, 1000);
            }

            google.map.setCenter({
              lat,
              lng
            });

            const polyline = new google.maps.Polyline({
              path: google.maps.geometry.encoding.decodePath(overvirePoly),
              geodesic: true,
              strokeColor: '#EE6900',
              strokeOpacity: 1.0,
              strokeDasharray: 300,
              strokeWeight: 8,
            });

            animateLine(polyline);

            polyline.setMap(google.map);
          }}
        ></GoogleMapReact>
      </Mapa>

      <Pin src={PinDesktopIconSVG} mq="desktop" alt="" />
      <Pin src={PinWhiteIconSVG} mq="mobile" alt="" />

      <Text item={{ title: 'O que há por perto', text }} />
    </Container>
  ) : null;
}

export default Around;
