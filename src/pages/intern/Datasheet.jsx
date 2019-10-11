import React from 'react';
import Button from 'components/Button';

import {
  DatasheetContent,
  BlockOne,
  Type,
  Neighborhood,
  Ref,
  GroupButton,
  BlockTwo,
  Content,
  BlockThree
} from './styles';
import {
  Release,
  Sell,
  Rent,
  Bedrooms,
  BedroomsBetween,
  AreaBuilding,
  Parking,
  ParkingBetween,
  AreaGround,
  AreaTotal,
  AreaUseFul,
  AreaUseFulBetween
} from './Caracteristics';

export default function Datasheet({ property }) {
  return (
    <DatasheetContent>
      <BlockOne type={property.type}>
        <div>
          <Type>{property.category}</Type>
          <br />
          <Neighborhood>{property.address.local}</Neighborhood>
          <Ref>Ref {property.reference}</Ref>
        </div>

        <GroupButton>
          {property.label.is_new && (
            <Button label={'Novidade'} icon="star" color="blueLight" />
          )}
          {property.label.is_exclusive && (
            <Button label={'Só na Axpe'} icon="check" color="greenLight2" />
          )}
          {property.label.is_furnished && (
            <Button label={'Mobiliado'} icon="sofa" color="yellowLight" />
          )}
        </GroupButton>
      </BlockOne>
      {property.content && (
        <BlockTwo>
          <Content>{property.content}</Content>
        </BlockTwo>
      )}
      <BlockThree>
        <Release release={property.values.release} />
        <Rent
          rent={property.values.rent}
          iptu={property.values.iptu}
          condo={property.values.condo}
        />
        <Sell
          sell={property.values.sell}
          iptu={property.values.iptu}
          condo={property.values.condo}
        />
        <Bedrooms
          bedrooms={property.infos.bedrooms}
          suites={property.infos.suites}
        />
        <BedroomsBetween
          start={property.infos.bedroomsStart}
          end={property.infos.bedroomsEnd}
        />
        <Parking parking={property.infos.parking} />
        <ParkingBetween
          start={property.infos.parkingStart}
          end={property.infos.parkingEnd}
        />
        <AreaBuilding areaBuilding={property.infos.areaBuilding} />
        <AreaGround areaGround={property.infos.areaGround} />
        <AreaUseFul areaUseful={property.infos.areaUseful} />
        <AreaUseFulBetween
          start={property.infos.areaUsefulStart}
          end={property.infos.areaUsefulEnd}
        />
        <AreaTotal areaTotal={property.infos.areaTotal} />
      </BlockThree>
    </DatasheetContent>
  );
}
