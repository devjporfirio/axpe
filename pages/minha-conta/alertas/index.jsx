import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';

import Api from 'services';

// helpers
import { formatCurrency } from 'helpers/utils';

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
import ITrash from 'assets/icons/trash';

function Alerts() {
  const user = useSelector(state => state.user);
  const [ alerts, setAlerts ] = useState([]);

  useEffect(() => {
    async function loadAlerts() {
      if (user && user.logged) {
        const alertsList = await Api.MyAccount.getAlerts(user.access_token);
        setAlerts(alertsList.alerts);
      }
    }

    loadAlerts();
  }, [ user ]);

  const handleRemoveAlert = async id => {
    if (user.logged) {
      const responseRemove = await Api.MyAccount.deleteAlert(
        user.access_token,
        id
      );
      if (responseRemove.status === 'success') {
        const alertsList = await Api.MyAccount.getAlerts(user.access_token);
        setAlerts(alertsList.alerts);
      }
    }
  };

  if (!user.logged) return <Container />;

  return (
    <Container>
      {alerts.length > 0 ? (
        <Body>
          <Title>
            Você tem <strong>{alerts.length} alertas</strong> salvos
          </Title>
          <Subtitle>Novos imóveis foram adicionados a sua lista.</Subtitle>

          {alerts &&
            alerts.map((alert, index) => (
              <Item key={index}>
                <Gradient />
                <ItemImage background={alert.use} />
                <AmountRemoveGroup>
                  <Amount>
                    <strong>{alert.total_buildings}</strong> imóveis
                  </Amount>
                  <ButtonRemove
                    type="button"
                    onClick={() => handleRemoveAlert(alert.id)}
                  >
                    <SVG src={ITrash} />
                    excluir
                  </ButtonRemove>
                </AmountRemoveGroup>
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
                        alert.values && alert.values.length > 0 ? '- ' : ''
                      }`}
                    {alert.finality !== 'venda' &&
                      `Alugar ${
                        alert.values && alert.values.length > 0 ? '- ' : ''
                      }`}
                    {alert.values.length > 0 &&
                      `${formatCurrency.format(
                        parseInt(alert.values[0])
                      )} à ${formatCurrency.format(parseInt(alert.values[1]))}`}
                  </InfoBase>

                  {alert.areas.length > 0 && (
                    <InfoBase mq="mobile">
                      {alert.areas[0]} à {alert.areas[1]} m²
                    </InfoBase>
                  )}
                  {alert.bedrooms.length > 0 && (
                    <InfoBase mq="mobile">
                      {alert.bedrooms[0]} à {alert.bedrooms[1]} Dormitórios
                    </InfoBase>
                  )}

                  <InfoBase mq="desktop">
                    {alert.areas.length > 0 &&
                      `${alert.areas[0]} à ${alert.areas[1]} m²`}

                    {((alert.areas.length > 0 && alert.bedrooms.length > 0) ||
                      (alert.areas.length > 0 && alert.parking.length > 0)) &&
                      ' / '}

                    {alert.bedrooms.length > 0 &&
                      `${alert.bedrooms[0]} à ${alert.bedrooms[1]} Dormitórios`}

                    {alert.bedrooms.length > 0 &&
                      alert.parking.length > 0 &&
                      ' / '}

                    {(!alert.bedrooms.length > 0 || !alert.areas.length > 0) &&
                      alert.parking.length > 0 &&
                      `${alert.parking[0]} à ${alert.parking[1]} Vagas`}
                  </InfoBase>

                  {alert.parking.length > 0 && (
                    <InfoBase>
                      {alert.parking[0]} à {alert.parking[1]} Vagas
                    </InfoBase>
                  )}
                  {alert.locals.length > 0 && (
                    <InfoBase>{alert.locals.join(', ')}</InfoBase>
                  )}
                </ItemInfo>
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
  );
}

export default Alerts;
