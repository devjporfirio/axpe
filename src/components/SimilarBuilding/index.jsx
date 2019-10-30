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
  Disclaimer
} from './styles';

export default function SimilarBuilding({ item }) {
  const { values, gallery, address, infos, slug, category } = item;

  return (
    <Container href={`/building/${slug}`}>
      <Slider
        propsArrow={{ position: 'center', type: '', backgroundColor: 'white' }}
        center={false}
        showSizeGallery={false}
        items={gallery}
        showClickImage={false}
      />
      <Infos>
        <CatLocGroup>
          <div>
            <Category>{category}</Category>
            <Local>{address.local}</Local>
          </div>
          <Reference>Ref {item.reference}</Reference>
        </CatLocGroup>

        <ValuesFavGroup>
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

        <Disclaimer>{infos.disclaimer}</Disclaimer>
      </Infos>
    </Container>
  );
}
