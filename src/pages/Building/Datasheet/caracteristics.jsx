import React from 'react';
import { formatCurrency, formatCurrencyToText, checkPluralSingular } from 'helpers/utils';
import { Price, InfoValue, PriceRelease } from './styles';

export const Release = ({ release, type, currency }) =>
  !!release && (
    <PriceRelease>
      <p>
        {type === 'pronto' ? 'Venda' : 'A partir de'}{' '}
        {currency
          ? formatCurrency.format(release).replace('R$', formatCurrencyToText(currency))
          : formatCurrency.format(release)}
      </p>
    </PriceRelease>
  );

export const OnlyConsults = () => (
  <Price>
    <p>Valores sob consulta</p>
  </Price>
);

export const Rent = ({ valueOnlyConsults, rent, iptu, condo, currency }) =>
  rent && !valueOnlyConsults ? (
    <Price>
      <p>Aluguel:</p>
      <p>{formatCurrency.format(rent)}</p>
      <p>
        Total locação:{' '}
        {currency
          ? formatCurrency
              .format(parseInt(rent + iptu + condo))
              .replace('R$', formatCurrencyToText(currency))
          : formatCurrency.format(parseInt(rent + iptu + condo))}
      </p>
      <p>(Aluguel + IPTU + Cond.)</p>
    </Price>
  ) : (
    <Price className="price-wfull">
      <p>Aluguel:</p>
      <p>Valores sob consulta</p>
    </Price>
  );

export const Sell = ({
  valueOnlyConsults,
  sell,
  iptu,
  condo,
  type,
  currency,
}) =>
  sell && !valueOnlyConsults ? (
    <Price>
      <p>{type === 'pronto' ? 'Venda' : 'A partir de'} </p>
      <p>
        {currency
          ? formatCurrency.format(sell).replace('R$', formatCurrencyToText(currency))
          : formatCurrency.format(parseInt(rent + iptu + condo))}
      </p>
      {iptu ? (
        <p>
          IPTU: 10x{' '}
          {currency
            ? formatCurrency.format(parseInt(iptu)).replace('R$', formatCurrencyToText(currency))
            : formatCurrency.format(parseInt(rent + iptu + condo))}
        </p>
      ) : null}
      {condo ? (
        <p>
          Condominio:{' '}
          {currency
            ? formatCurrency.format(parseInt(condo)).replace('R$', formatCurrencyToText(currency))
            : formatCurrency.format(parseInt(rent + iptu + condo))}
        </p>
      ) : null}
    </Price>
  ) : (
    <Price className="price-wfull">
      <p>Venda:</p>
      <p>Valores sob consulta</p>
    </Price>
  );

export const Bedrooms = ({ type, bedrooms, bedroomsStart, suites }) => {
  const wordBedroom = checkPluralSingular(
    'Quarto',
    !!bedrooms ? bedrooms : bedroomsStart
  );
  return !!bedrooms || (!!bedroomsStart && type === 'lancamento') ? (
    <InfoValue>
      {!!bedrooms ? (
        <p>
          {bedrooms} {!!suites && wordBedroom}
        </p>
      ) : !!bedroomsStart && type === 'lancamento' ? (
        <p>
          {bedroomsStart} {!!suites && wordBedroom}
        </p>
      ) : null}
      {!suites ? (
        <p>{wordBedroom}</p>
      ) : (
        <p>
          sendo {suites} {checkPluralSingular('suíte', suites)}
        </p>
      )}
    </InfoValue>
  ) : null;
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

export const Parking = ({ type, parking, parkingStart }) =>
  !!parking || (!!parkingStart && type === 'lancamento') ? (
    <InfoValue>
      {!!parking ? (
        <p>{parking}</p>
      ) : !!parkingStart && type === 'lancamento' ? (
        <p>{parkingStart}</p>
      ) : null}
      <p>{checkPluralSingular('Vaga', !!parking ? parking : parkingStart)}</p>
    </InfoValue>
  ) : null;

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

export const AreaUseFul = ({ category, type, areaUseful, areaUsefulStart }) =>
  !!areaUseful || (!!areaUsefulStart && type === 'lancamento') ? (
    <InfoValue>
      {!!areaUseful ? (
        <p>{formatCurrency.format(parseInt(areaUseful)).replace('R$', '')}m²</p>
      ) : !!areaUsefulStart && type === 'lancamento' ? (
        <p>
          {formatCurrency.format(parseInt(areaUsefulStart)).replace('R$', '')}m²
        </p>
      ) : null}
      <p>{category && category.search('Casa') >= 0 ? `Área construída` : `Área útil`}</p>
    </InfoValue>
  ) : null;

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
