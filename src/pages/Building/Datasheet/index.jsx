import React from 'react';
import Button from 'components/Button';
import * as Caracteristics from 'pages/Building/Datasheet/caracteristics';

import {
  DatasheetContent,
  BlockOne,
  Type,
  Neighborhood,
  Ref,
  GroupButton,
  BlockTwo,
  Content,
  BlockThree,
  Delivery
} from './styles';

export default function Datasheet({ property }) {
  return (
    <>
      <DatasheetContent>
        <BlockOne type={property.type}>
          <div>
            <Type>{property.infos.releaseStatus}</Type>
            <br />
            <Neighborhood>{property.address.local}</Neighborhood>
            <Ref>Ref {property.reference}</Ref>
          </div>

          <GroupButton>
            {property.label && property.label.is_new && (
              <Button label={'Novidade'} icon="star" color="blueLight" />
            )}
            {property.label && property.label.is_exclusive && (
              <Button label={'Só na Axpe'} icon="check" color="greenLight2" />
            )}
            {property.label && property.label.is_furnished && (
              <Button label={'Mobiliado'} icon="sofa" color="yellowLight" />
            )}
          </GroupButton>
        </BlockOne>
        {property.infos.disclaimer && (
          <BlockTwo>
            <Content>{property.infos.disclaimer}</Content>
          </BlockTwo>
        )}
        <BlockThree>
          <Caracteristics.Release release={property.values.release} />
          <Caracteristics.Rent
            rent={property.values.rent}
            iptu={property.values.iptu}
            condo={property.values.condo}
          />
          <Caracteristics.Sell
            sell={property.values.sell}
            iptu={property.values.iptu}
            condo={property.values.condo}
          />
          <Caracteristics.Bedrooms
            bedrooms={property.infos.bedrooms}
            suites={property.infos.suites}
          />
          <Caracteristics.BedroomsBetween
            start={property.infos.bedroomsStart}
            end={property.infos.bedroomsEnd}
          />
          <Caracteristics.Parking parking={property.infos.parking} />
          <Caracteristics.ParkingBetween
            start={property.infos.parkingStart}
            end={property.infos.parkingEnd}
          />
          <Caracteristics.AreaBuilding areaBuilding={property.infos.areaBuilding} />
          <Caracteristics.AreaGround areaGround={property.infos.areaGround} />
          <Caracteristics.AreaUseFul areaUseful={property.infos.areaUseful} />
          <Caracteristics.AreaUseFulBetween
            start={property.infos.areaUsefulStart}
            end={property.infos.areaUsefulEnd}
          />
          <Caracteristics.AreaTotal areaTotal={property.infos.areaTotal} />
        </BlockThree>
      </DatasheetContent>
      {property.type !== 'pronto' && (
        <Delivery>
          <p>
            Previsão de entrega em <span>{property.infos.releaseDelivery}</span>
          </p>
        </Delivery>
      )}
    </>
  );
}
