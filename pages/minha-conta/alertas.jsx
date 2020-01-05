import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Api from 'services';

// styles
import { Container } from 'pages/MyAccount/Alerts/styles';

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

  if(!user.logged) return <Container/>;

  return (
    <Container>
      <h1>Alertas</h1>
      {JSON.stringify(alerts)}
    </Container>
  )
}

export default Alerts;
