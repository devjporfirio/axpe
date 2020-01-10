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
                <ItemImage background={alert.use} />
                <AmountRemoveGroup>
                  <Amount>
                    <strong>{alert.total_buildings}</strong> imóveis
                  </Amount>
                  <ButtonRemove>
                    <SVG src={ITrash} />
                    excluir
                  </ButtonRemove>
                </AmountRemoveGroup>
                <ItemInfo>
                  <SourceUse>
                    <span>{alert.source}</span>
                    <span> - {alert.use}</span>
                  </SourceUse>
                  <InfoBase>
                    {alert.finality === 'venda' ? 'Comprar' : 'Alugar'}
                  </InfoBase>
                  {alert.values.length > 0 && (
                    <InfoBase>
                      {formatCurrency.format(parseInt(alert.values[0]))} à{' '}
                      {formatCurrency.format(parseInt(alert.values[1]))}
                    </InfoBase>
                  )}
                  {alert.areas.length > 0 && (
                    <InfoBase>
                      {alert.areas[0]} à {alert.areas[1]} m²
                    </InfoBase>
                  )}
                  {alert.bedrooms.length > 0 && (
                    <InfoBase>
                      {alert.bedrooms[0]} à {alert.bedrooms[1]} Dormitórios
                    </InfoBase>
                  )}
                  {alert.parking.length > 0 && (
                    <InfoBase>
                      {alert.parking[0]} à {alert.parking[1]} Vagas
                    </InfoBase>
                  )}
                  {alert.locals.length > 0 && (
                    <InfoBase>{alert.locals.join(',')}</InfoBase>
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
