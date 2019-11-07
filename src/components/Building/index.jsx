import React from 'react';
import * as Caracteristics from 'pages/Building/Datasheet/caracteristics';
import { formatCurrency } from 'helpers/utils';

import IHeartBlack from 'assets/icons/heart-black.svg';

import {
  Container,
  Infos,
  Category,
  Local,
  Reference,
  Favorito,
  CaracteristicsGroup,
  ValuesFavGroup,
  CatLocGroup,
  Price,
  Slider,
  Description
} from './styles';

export default function Building({ item }) {
  const { values, gallery, address, infos, category } = item;

  return (
    <Container>
      <Slider propsArrow={{ type: 'building', backgroundColor: 'white' }}>
        {gallery &&
          gallery.length > 0 &&
          gallery.map((item, index) => {
            switch (item.tipo) {
              case 'imagem':
                return <img key={index} src={item.src} alt="Imóvel" />;
              case 'video':
                return (
                  <iframe
                    title={index}
                    key={index}
                    src={item.video}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />
                );
            }
          })}
      </Slider>
      <Infos>
        <CatLocGroup>
          <div>
            <Category>{category}</Category>
            <Local>{address.local}</Local>
          </div>
          <Reference>Ref {item.reference}</Reference>
        </CatLocGroup>

        <ValuesFavGroup>
          <div>
            {!!values.sell || !!values.release ? (
              <Price>
                Venda: {!!values.sell && formatCurrency.format(values.sell)}
                {!!values.release && formatCurrency.format(values.release)}
              </Price>
            ) : (
              ''
            )}
            {!!values.rent ? (
              <Price>Locação: {formatCurrency.format(values.rent)}</Price>
            ) : (
              ''
            )}
          </div>
          <Favorito src={IHeartBlack} alt="Favorito" />
        </ValuesFavGroup>
        <CaracteristicsGroup>
          <Caracteristics.Bedrooms
            bedrooms={infos.bedrooms}
            suites={infos.suites}
          />
          <Caracteristics.BedroomsBetween
            start={infos.bedroomsStart}
            end={infos.bedroomsEnd}
          />
          <Caracteristics.Parking parking={infos.parking} />
          <Caracteristics.ParkingBetween
            start={infos.parkingStart}
            end={infos.parkingEnd}
          />
          <Caracteristics.AreaBuilding areaBuilding={infos.areaBuilding} />
          <Caracteristics.AreaGround areaGround={infos.areaGround} />
          <Caracteristics.AreaUseFul areaUseful={infos.areaUseful} />
          <Caracteristics.AreaUseFulBetween
            start={infos.areaUsefulStart}
            end={infos.areaUsefulEnd}
          />
          <Caracteristics.AreaTotal areaTotal={infos.areaTotal} />
        </CaracteristicsGroup>

        <Description>{infos.internalDescription}</Description>
      </Infos>
    </Container>
  );
}
