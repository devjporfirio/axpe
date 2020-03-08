import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import Link from 'next/link';
import Head from 'next/head';
import Api from 'services';

// helpers
import SeoData from 'helpers/seo';
import { formatCurrency, getParamsFromObject } from 'helpers/utils';

// components
import Empty from 'pages/MyAccount/Empty';

// styles
import { Title } from 'pages/MyAccount/styles';
import {
  Container,
  Body,
  Subtitle,
  Item,
  Gradient,
  ItemImage,
  ItemInfo,
  SourceUse,
  InfoBase,
  AmountRemoveGroup,
  Amount,
  ButtonRemove
} from 'pages/MyAccount/Alerts/styles';

// icon
import TrashIconSVG from 'assets/icons/trash';

function Alerts() {
  const user = useSelector(state => state.user);
  const [ loaded, setLoaded ] = useState(false);
  const [ alerts, setAlerts ] = useState([]);
  const [ removingItems, setRemovingItems ] = useState(false);

  useEffect(() => {
    async function loadAlerts() {
      if (user && user.logged) {
        const alertsList = await Api.MyAccount.getAlerts(user.access_token);

        setAlerts(alertsList.alerts);
        setLoaded(true);
      }
    }

    loadAlerts();
  }, [ user.logged ]);

  const handleRemoveAlert = async id => {
    setRemovingItems(true);

    const responseRemove = await Api.MyAccount.deleteAlert(
      user.access_token,
      id
    );

    setRemovingItems(false);

    if (responseRemove.status) {
      const alertsList = await Api.MyAccount.getAlerts(user.access_token);
      setAlerts(alertsList.alerts);
    }
  };

  const getParams = ({
    source,
    finality,
    use,
    categories,
    locals,
    values,
    areas,
    bedrooms,
    parking
  }) => getParamsFromObject({
      source,
      finality,
      use,
      types: categories && categories.length && categories.join(', '),
      local: locals && locals.length && locals.join(', '),
      price_start: values && values.length && values[0],
      price_end: values && values.length && values[1],
      area_start: areas && areas.length && areas[0],
      area_end: areas && areas.length && areas[1],
      bedroom_start: bedrooms && bedrooms.length && bedrooms[0],
      bedroom_end: bedrooms && bedrooms.length && bedrooms[1],
      parking_start: parking && parking.length && parking[0],
      parking_end: parking && parking.length && parking[1]
    });

  if (!user.logged || !loaded) return <Container />;

  return (
    <>
      <Head>
        <title>{`Alertas | Minha Conta - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        {alerts.length > 0 ? (
          <Body>
            <Title>
              Você tem <strong>{alerts.length} alertas</strong> salvos
            </Title>
            <Subtitle>Novos imóveis foram adicionados a sua lista.</Subtitle>

            {alerts &&
              alerts.map((alert, alertIndex) => (
                <Item key={`alert-item-${alertIndex}`}>
                  <Link href={`alertas/busca${getParams(alert)}`} passHref>
                    <a href={`alertas/busca${getParams(alert)}`}>
                      <Gradient />
                      <ItemImage background={alert.use} />
                    </a>
                  </Link>
                  <AmountRemoveGroup>
                    <Link href={`alertas/busca${getParams(alert)}`} passHref>
                      <Amount>
                        <strong>{alert.total_buildings}</strong> imóveis
                      </Amount>
                    </Link>
                    <ButtonRemove
                      type="button"
                      onClick={() => handleRemoveAlert(alert.id)}
                      disabled={removingItems}
                    >
                      <SVG src={TrashIconSVG} uniquifyIDs={true} />
                      excluir
                    </ButtonRemove>
                  </AmountRemoveGroup>
                  <Link href={`alertas/busca${getParams(alert)}`} passHref>
                    <a href={`alertas/busca${getParams(alert)}`}>
                      <ItemInfo>
                        <SourceUse>
                          <span>{alert.source}</span>
                          <span> - {alert.use}</span>
                        </SourceUse>

                        {alert.finality && (
                          <InfoBase mq="mobile">
                            {alert.finality === 'venda' ? 'Comprar' : 'Alugar'}
                          </InfoBase>
                        )}
                        {alert.values.length > 0 && (
                          <InfoBase mq="mobile">
                            {formatCurrency.format(parseInt(alert.values[0]))} à{' '}
                            {formatCurrency.format(parseInt(alert.values[1]))}
                          </InfoBase>
                        )}

                        <InfoBase mq="desktop">
                          {alert.finality === 'venda' &&
                            `Comprar ${
                              alert.values && alert.values.length >= 1 && alert.values[0] ? '- ' : ''
                            }`}
                          {alert.finality !== 'venda' &&
                            `Alugar ${
                              alert.values && alert.values.length >= 1 && alert.values[0] ? '- ' : ''
                            }`}
                          {alert.values.length >= 1 && alert.values[0] &&
                            `${formatCurrency.format(
                              parseInt(alert.values[0])
                            )} à ${formatCurrency.format(
                              parseInt(alert.values[1])
                            )}`}
                        </InfoBase>

                        {alert.areas.length >= 1 && alert.areas[0] && (
                          <InfoBase mq="mobile">
                            {alert.areas[0]} à {alert.areas[1]} m²
                          </InfoBase>
                        )}

                        {alert.bedrooms.length >= 1 && alert.bedrooms[0] && (
                          <InfoBase mq="mobile">
                            {alert.bedrooms[0]} à {alert.bedrooms[1]} Dormitórios
                          </InfoBase>
                        )}

                        {alert.areas[0] || alert.bedrooms[0] || alert.parking[0] ? (
                          <InfoBase mq="desktop">
                            {alert.areas.length > 0 &&
                              `${alert.areas[0]} à ${alert.areas[1]} m²`}

                            {((alert.areas.length > 0 &&
                              alert.bedrooms.length > 0) ||
                              (alert.areas.length > 0 &&
                                alert.parking.length > 0)) &&
                              ' / '}

                            {alert.bedrooms.length > 0 &&
                              `${alert.bedrooms[0]} à ${
                                alert.bedrooms[1]
                              } Dormitórios`}

                            {alert.bedrooms.length > 0 &&
                              alert.parking.length > 0 &&
                              ' / '}

                            {(!alert.bedrooms.length > 0 ||
                              !alert.areas.length > 0) &&
                              alert.parking.length > 0 &&
                              `${alert.parking[0]} à ${alert.parking[1]} Vagas`}
                          </InfoBase>
                        ) : null}

                        {alert.parking.length >= 1 && alert.parking[0] && (
                          <InfoBase>
                            {alert.parking[0]} à {alert.parking[1]} Vagas
                          </InfoBase>
                        )}
                        {alert.locals.length >= 1 && alert.locals[0] && (
                          <InfoBase>{alert.locals.join(', ')}</InfoBase>
                        )}
                      </ItemInfo>
                    </a>
                  </Link>
                </Item>
              ))}
          </Body>
        ) : (
          <Empty
            title="Você ainda não criou nenhum alerta"
            subtitle="Crie seu primeiro alerta e seja o primeiro a saber quando entrarem imóveis do jeito que você está buscando."
          />
        )}
      </Container>
    </>
  );
}

export default Alerts;
