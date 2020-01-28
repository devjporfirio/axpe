import React from 'react';
import { formatCurrency, checkPluralSingular } from 'helpers/utils';
import { Price, InfoValue, PriceRelease } from './styles';

export const Release = ({ release, type, currency }) =>
  !!release && (
    <PriceRelease>
      <p>
        {type === 'pronto' ? 'Venda' : 'A partir de'}:{' '}
        {formatCurrency.format(release).replace('R$', currency)}
      </p>
    </PriceRelease>
  );

export const Rent = ({ rent, iptu, condo, currency }) =>
  !!rent && (
    <Price>
      <p>Aluguel:</p>
      <p>{formatCurrency.format(rent)}</p>
      <p>
        Total locação: {formatCurrency.format(parseInt(rent + iptu + condo).replace('R$', currency))}
      </p>
      <p>(Aluguel + IPTU + Cond.)</p>
    </Price>
  );

export const Sell = ({ sell, iptu, condo, type, currency }) =>
  !!sell && (
    <Price>
      <p>{type === 'pronto' ? 'Venda' : 'A partir de'}: </p>
      <p>{formatCurrency.format(sell).replace('R$', currency)}</p>
      <p>IPTU: 10x {formatCurrency.format(parseInt(iptu).replace('R$', currency))}</p>
      <p>Condominio: {formatCurrency.format(parseInt(condo).replace('R$', currency))}</p>
    </Price>
  );

export const Bedrooms = ({ bedrooms, suites }) => {
  const wordBedroom = checkPluralSingular('Quarto', bedrooms);
  return (
    !!bedrooms && (
      <InfoValue>
        <p>
          {bedrooms} {!!suites && wordBedroom}
        </p>
        {!suites ? (
          <p>{wordBedroom}</p>
        ) : (
          <p>
            sendo {suites} {checkPluralSingular('suíte', suites)}
          </p>
        )}
      </InfoValue>
    )
  );
};

export const BedroomsBetween = ({ start, end }) =>
  !!start && !!end && end !== 9999 ? (
    <InfoValue>
      <p>
        {start} a {end}
      </p>
      <p>Quartos</p>
    </InfoValue>
  ) : (
    <Bedrooms bedrooms={start} />
  );

export const Parking = ({ parking }) =>
  !!parking && (
    <InfoValue>
      <p>{parking}</p>
      <p>{checkPluralSingular('Vaga', parking)}</p>
    </InfoValue>
  );

export const ParkingBetween = ({ start, end }) =>
  !!start && !!end && end !== 9999 ? (
    <InfoValue>
      <p>
        {start} a {end}
      </p>
      <p>Vagas</p>
    </InfoValue>
  ) : (
    <Parking parking={start} />
  );

export const AreaBuilding = ({ areaBuilding }) =>
  !!areaBuilding && (
    <InfoValue>
      <p>{parseFloat(areaBuilding).toFixed(0)}m²</p>
      <p>Área construída</p>
    </InfoValue>
  );

export const AreaGround = ({ areaGround }) =>
  !!areaGround && (
    <InfoValue>
      <p>{parseFloat(areaGround).toFixed(0)}m²</p>
      <p>Área de terreno</p>
    </InfoValue>
  );

export const AreaTotal = ({ areaTotal }) =>
  !!areaTotal && (
    <InfoValue>
      <p>{parseFloat(areaTotal).toFixed(0)}m²</p>
      <p>Área total</p>
    </InfoValue>
  );

export const AreaUseFul = ({ areaUseful }) =>
  !!areaUseful && (
    <InfoValue>
      <p>{parseFloat(areaUseful).toFixed(0)}m²</p>
      <p>Área útil</p>
    </InfoValue>
  );

export const AreaUseFulBetween = ({ start, end }) =>
  !!start && !!end && end !== 99999999 ? (
    <InfoValue>
      <p>
        {parseFloat(start).toFixed(0)} a {parseFloat(end).toFixed(0)} m²
      </p>
      <p>Área útil</p>
    </InfoValue>
  ) : (
    <AreaUseFul areaUseful={start} />
  );
