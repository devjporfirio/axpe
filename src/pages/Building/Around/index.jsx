import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import mapOptions from './mapOptions';
import { getBoundsFromLatLng } from '../../../helpers/maps';

// assets
import PinDesktopIconSVG from 'assets/icons/pin-desktop';
import PinWhiteIconSVG from 'assets/icons/pin-white';

// styles
import { Container, Mapa, Pin, Text } from './styles';

function Around({ local, cep, text, latitude, longitude }) {
  const [ bounds, setBounds ] = useState('');
  const [ zipCode, setZipCode ] = useState('');
  const [ isEnabled, setIsEnabled ] = useState(false);

  useEffect(() => {
    setZipCode(cep);
  }, [ cep ]);

  useEffect(() => {
    setBounds(getBoundsFromLatLng(latitude, longitude, 0.3));
    setIsEnabled(true);
  }, [ zipCode ]);

  return !!bounds &&
    !!process.env.config.googleApiKey &&
    cep === zipCode &&
    (latitude !== 0 && longitude !== 0) &&
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

            function drawPolyline(poly) {
              const polyline = new google.maps.Polyline({
                path: google.maps.geometry.encoding.decodePath(poly),
                geodesic: true,
                strokeColor: '#EE6900',
                strokeOpacity: 1.0,
                strokeDasharray: 300,
                strokeWeight: 8,
              });
  
              animateLine(polyline);
              polyline.setMap(google.map);
            }

            google.map.setCenter({
              lat: latitude,
              lng: longitude,
            });

            // get directions
            const directionsService = new google.maps.DirectionsService();
            const directionsData = {
              origin: bounds.southwest,
              destination: bounds.northeast,
              travelMode: 'DRIVING',
            }
            directionsService.route(directionsData, (result, status) => {
              if (status == 'OK') {
                if (result && result.routes && result.routes.length > 0) {
                  drawPolyline(result.routes[0].overview_polyline);
                }
              }
            });
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
