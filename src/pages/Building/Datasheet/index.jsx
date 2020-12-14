import React from 'react';
import { useSelector } from 'react-redux';
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
  PriceGroup,
  Delivery
} from './styles';

export default function Datasheet({ property }) {
  const { type, infos, category, address, reference, label, values, source } = property;
  const { searchFunnel } = useSelector(state => state.main);

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
            {type !== 'lancamento' && <hr />}
          </GroupInfo>
          <GroupTags>
            {label && label.isNew && (
              <Tag label={'Novidade'} icon="star" color="blueLight" />
            )}
            {label && label.isExclusive && (
              <Tag label={'Exclusividade'} icon="check" color="orange" />
            )}
            {label && label.isFurnished && (
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
          <PriceGroup>

            {!values.sell && !values.rent && values.valueOnlyConsults ? (
              <Caracteristics.OnlyConsults />
            ) : null}

            {!!values.sell && (!searchFunnel || !searchFunnel.finality || searchFunnel.finality == 'venda') ? (
              <Caracteristics.Sell
                valueOnlyConsults={values.valueOnlyConsults}
                sell={values.sell}
                iptu={values.iptu}
                condo={values.condo}
                currency={values.currency}
                type={type}
              />
            ) : null}

            <Caracteristics.Release
              release={values.release}
              currency={values.currency}
            />

            {!!values.rent && (!searchFunnel || !searchFunnel.finality || searchFunnel.finality == 'aluguel') ? (
              <Caracteristics.Rent
                valueOnlyConsults={values.valueOnlyConsults}
                rent={values.rent}
                iptu={values.iptu}
                condo={values.condo}
                currency={values.currency}
              />
            ) : null}
          </PriceGroup>
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

          {category && category.search('Casa') < 0 && infos.use !== 'COMERCIAL' && (
            <Caracteristics.AreaBuilding areaBuilding={infos.areaBuilding} />
          )}

          <Caracteristics.AreaUseFul areaUseful={infos.areaUseful} />

          {infos.use !== 'COMERCIAL' && (
            <Caracteristics.AreaGround areaGround={infos.areaGround} />
          )}

          {((category && category.search('Casa') < 0) || infos.areaUseful !== '') && infos.use !== 'COMERCIAL' && (
            <Caracteristics.AreaUseFulBetween
              start={infos.areaUsefulStart}
              end={infos.areaUsefulEnd}
            />
          )}

          {category && (category.search('Casa') < 0 && category !== 'Apartamento' && category !== 'Cobertura') &&
            infos.use !== 'COMERCIAL' &&
            source !== 'praia' &&
            source !== 'campo' && (
              <Caracteristics.AreaTotal areaTotal={infos.areaTotal} />
            )}
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
