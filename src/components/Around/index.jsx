import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Api from 'services';

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

  const mapOptions = {
    styles: [
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#242f3e'
          }
        ]
      },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
      }
    ]
  };

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
