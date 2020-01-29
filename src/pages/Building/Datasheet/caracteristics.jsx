import React from 'react';
import { formatCurrency, checkPluralSingular } from 'helpers/utils';
import { Price, InfoValue, PriceRelease } from './styles';

export const Release = ({ release, type, currency }) => {
  return (
    !!release && (
      <PriceRelease>
        <p>
          {type === 'pronto' ? 'Venda' : 'A partir de'}:{' '}
          {currency
            ? formatCurrency.format(release).replace('R$', currency)
            : formatCurrency.format(release)}
        </p>
      </PriceRelease>
    )
  );
};

export const Rent = ({ rent, iptu, condo, currency }) =>
  !!rent && (
    <Price>
      <p>Aluguel:</p>
      <p>{formatCurrency.format(rent)}</p>
      <p>
        Total locação:{' '}
        {currency
          ? formatCurrency
              .format(parseInt(rent + iptu + condo))
              .replace('R$', currency)
          : formatCurrency.format(parseInt(rent + iptu + condo))}
      </p>
      <p>(Aluguel + IPTU + Cond.)</p>
    </Price>
  );

export const Sell = ({ sell, iptu, condo, type, currency }) =>
  !!sell && (
    <Price>
      <p>{type === 'pronto' ? 'Venda' : 'A partir de'}: </p>
      <p>
        {currency
          ? formatCurrency.format(sell).replace('R$', currency)
          : formatCurrency.format(parseInt(rent + iptu + condo))}
      </p>
      <p>
        IPTU: 10x{' '}
        {currency
          ? formatCurrency.format(parseInt(iptu)).replace('R$', currency)
          : formatCurrency.format(parseInt(rent + iptu + condo))}
      </p>
      <p>
        Condominio:{' '}
        {currency
          ? formatCurrency.format(parseInt(condo)).replace('R$', currency)
          : formatCurrency.format(parseInt(rent + iptu + condo))}
      </p>
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
      <p>{formatCurrency.format(parseInt(areaBuilding)).replace('R$', '')}m²</p>
      <p>Área construída</p>
    </InfoValue>
  );

export const AreaGround = ({ areaGround }) =>
  !!areaGround && (
    <InfoValue>
      <p>{formatCurrency.format(parseInt(areaGround)).replace('R$', '')}m²</p>
      <p>Área de terreno</p>
    </InfoValue>
  );

export const AreaTotal = ({ areaTotal }) =>
  !!areaTotal && (
    <InfoValue>
      <p>{formatCurrency.format(parseInt(areaTotal)).replace('R$', '')}m²</p>
      <p>Área total</p>
    </InfoValue>
  );

export const AreaUseFul = ({ areaUseful }) =>
  !!areaUseful && (
    <InfoValue>
      <p>{formatCurrency.format(parseInt(areaUseful)).replace('R$', '')}m²</p>
      <p>Área útil</p>
    </InfoValue>
  );

export const AreaUseFulBetween = ({ start, end }) =>
  !!start && !!end && end !== 99999999 ? (
    <InfoValue>
      <p>
        {formatCurrency.format(parseInt(start)).replace('R$', '')} a{' '}
        {formatCurrency.format(parseInt(end)).replace('R$', '')} m²
      </p>
      <p>Área útil</p>
    </InfoValue>
  ) : (
    <AreaUseFul areaUseful={start} />
  );
