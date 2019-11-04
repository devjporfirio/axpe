import React from 'react';
import { formatCurrency } from 'helpers/utils';
import { Price, InfoValue, PriceRelease } from './styles';

export const Release = ({ release }) =>
  !!release && (
    <PriceRelease>
      <p>A partir de: {formatCurrency.format(release)}</p>
    </PriceRelease>
  );

export const Rent = ({ rent, iptu, condo }) =>
  !!rent && (
    <Price>
      <p>Aluguel:</p>
      <p>{formatCurrency.format(rent)}</p>
      <p>Total locação: {formatCurrency.format(rent + iptu + condo)}</p>
      <p>(Aluguel + IPTU + Cond.)</p>
    </Price>
  );

export const Sell = ({ sell, iptu, condo }) =>
  !!sell && (
    <Price>
      <p>Venda:</p>
      <p>{sell}</p>
      <p>IPTU: 10x {formatCurrency.format(iptu)}</p>
      <p>Condominio: {formatCurrency.format(condo)}</p>
    </Price>
  );

export const Bedrooms = ({ bedrooms, suites }) =>
  !!bedrooms && (
    <InfoValue>
      <p>{bedrooms} Quartos</p>
      {suites && <p>sendo {suites} suítes</p>}
    </InfoValue>
  );

export const BedroomsBetween = ({ start, end }) =>
  !!start &&
  !!end && (
    <InfoValue>
      <p>
        {start} a {end}
      </p>
      <p>Quartos</p>
    </InfoValue>
  );

export const Parking = ({ parking }) =>
  !!parking && (
    <InfoValue>
      <p>{parking}</p>
      <p>Vagas</p>
    </InfoValue>
  );

export const ParkingBetween = ({ start, end }) =>
  !!start &&
  !!end && (
    <InfoValue>
      <p>
        {start} a {end}
      </p>
      <p>Vagas</p>
    </InfoValue>
  );

export const AreaBuilding = ({ areaBuilding }) =>
  !!areaBuilding && (
    <InfoValue>
      <p>{areaBuilding}m²</p>
      <p>Área construída</p>
    </InfoValue>
  );

export const AreaGround = ({ areaGround }) =>
  !!areaGround && (
    <InfoValue>
      <p>{areaGround}m²</p>
      <p>Área de terreno</p>
    </InfoValue>
  );

export const AreaTotal = ({ areaTotal }) =>
  !!areaTotal && (
    <InfoValue>
      <p>{areaTotal}m²</p>
      <p>Área útil</p>
    </InfoValue>
  );

export const AreaUseFul = ({ areaUseful }) =>
  !!areaUseful && (
    <InfoValue>
      <p>{areaUseful}m²</p>
      <p>Área útil</p>
    </InfoValue>
  );

export const AreaUseFulBetween = ({ start, end }) =>
  !!start &&
  !!end && (
    <InfoValue>
      <p>
        {start} a {end} m²
      </p>
      <p>Área útil</p>
    </InfoValue>
  );
