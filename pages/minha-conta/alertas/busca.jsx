import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Api from 'services';

// helpers
import SeoData from 'helpers/seo';
import { getParamsFromObject, formatCurrency } from 'helpers/utils';

// components
import BuildingList from 'components/Building/List';
import Headerbar from 'components/Headerbar';

// styles
import {
  Container,
  Body,
  Title,
  Subtitle,
  Amount,
  Buildings
} from 'pages/MyAccount/Alerts/Search/styles';

function AlertsSeach({ building, params }) {
  const user = useSelector(state => state.user);

  if (!user.logged) return <Container />;
  return (
    <>
      <Head>
        <title>{`Alertas | Minha Conta - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        <Headerbar type="search" title="Meus Alertas" />
        <Body>
          <Title>
            <span>{params.source}</span>
            <span> - {params.use}</span>
          </Title>
          <Subtitle>
            {params.price_start &&
              `${formatCurrency.format(
                params.price_start
              )} - ${formatCurrency.format(params.price_end)}`}
            {params.price_start && params.area_start && ' | '}
            {params.area_start && `${params.area_start} - ${params.area_end}`}
            {(params.price_start || params.area_start) && params.local && ' | '}
            {params.local && `${params.local}`}
          </Subtitle>

          <Amount>
            Encontramos <strong>{building.length} imóveis</strong> para a sua
            busca
          </Amount>

          <Buildings>
            {building.map((building, buildingIndex) => (
              <BuildingList
                item={building}
                key={`building-searchitem-${building.reference}-${buildingIndex}`}
                useInactive
              />
            ))}
          </Buildings>
        </Body>
      </Container>
    </>
  );
}

AlertsSeach.getInitialProps = async ({ query }) => {
  const valuesToNumber = [ 'values', 'areas', 'bedrooms', 'parking' ];
  valuesToNumber.forEach(key => {
    const obj = query[key];
    if (obj && obj.length) {
      query[key] = query[key].map(value => parseInt(value));
    }
  });

  const response = await Api.Search.getBuildings(
    getParamsFromObject(query, true)
  );
  return { building: response.data, params: query };
};

export default AlertsSeach;
