import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Api from 'services';

// styles
import { Container } from 'pages/MyAccount/Alerts/styles';

// components
import Empty from 'pages/MyAccount/Empty';

function Alerts() {
  const user = useSelector(state => state.user);
  const [ alerts, setAlerts ] = useState([]);

  useEffect(() => {
    async function loadAlerts() {
      if (user && user.logged) {
        const alerts = await Api.MyAccount.getAlerts(user.access_token);
        setAlerts(alerts);
      }
    }

    loadAlerts();
  }, [ user ]);

  if (!user.logged) return <Container />;

  return (
    <Container>
      {alerts.length > 0 ? (
        JSON.stringify(alerts)
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
