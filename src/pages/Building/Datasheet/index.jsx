import React from 'react';
import Tag from 'components/Tag';
import * as Caracteristics from 'pages/Building/Datasheet/caracteristics';

import {
  DatasheetContent,
  BlockOne,
  Type,
  GroupInfo,
  GroupNeigRef,
  CategoryRelease,
  Neighborhood,
  Ref,
  GroupTags,
  BlockTwo,
  Content,
  BlockThree,
  Delivery
} from './styles';

export default function Datasheet({ property }) {
  const { type, infos, category, address, reference, label, values } = property;
  return (
    <>
      <DatasheetContent>
        <BlockOne type={property.type}>
          <GroupInfo>
            <Type>
              {type === 'lancamento'
                ? infos.releaseStatus === 'Pronto'
                  ? 'Pronto para morar'
                  : infos.releaseStatus
                : category}
            </Type>
            <GroupNeigRef>
              <Neighborhood>{address.local}</Neighborhood>
              <Ref>Ref {reference}</Ref>
            </GroupNeigRef>
            {type === 'lancamento' && (
              <CategoryRelease>{category}</CategoryRelease>
            )}
            <hr />
          </GroupInfo>
          <GroupTags>
            {label && label.is_new && (
              <Tag label={'Novidade'} icon="star" color="blueLight" />
            )}
            {label && label.is_exclusive && (
              <Tag label={'Só na Axpe'} icon="check" color="greenLight2" />
            )}
            {label && label.is_furnished && (
              <Tag label={'Mobiliado'} icon="sofa" color="yellowLight" />
            )}
          </GroupTags>
        </BlockOne>
        {!!infos.internalDescription && (
          <BlockTwo>
            <Content>{infos.internalDescription}</Content>
          </BlockTwo>
        )}
        <BlockThree type={property.type}>
          <Caracteristics.Release release={values.release} />
          <Caracteristics.Rent
            rent={values.rent}
            iptu={values.iptu}
            condo={values.condo}
          />
          <Caracteristics.Sell
            sell={values.sell}
            iptu={values.iptu}
            condo={values.condo}
          />
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
        </BlockThree>
      </DatasheetContent>
      {type === 'lancamento' && infos.releaseDelivery && (
        <Delivery>
          <p>
            {infos.releaseStatus === 'Pronto'
              ? 'Entregue em '
              : 'Previsão de entrega em '}
            <span>{infos.releaseDelivery}</span>
          </p>
        </Delivery>
      )}
    </>
  );
}
