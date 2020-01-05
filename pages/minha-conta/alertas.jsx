import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Api from 'services';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import { Container } from 'pages/MyAccount/Alerts/styles';

function Alerts() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [ alerts, setAlerts ] = useState([]);

  useEffect(() => {
    async function loadAlerts() {
      if (user && user.logged) {
        dispatch(setMain({ modalLogin: false }));
        const alerts = await Api.MyAccount.getAlerts(user.access_token);
        setAlerts(alerts);
      } else {
        dispatch(setMain({ modalLogin: true }));
      }
    }

    loadAlerts();
  }, [ user ]);

  if(!user.logged) return null;

  return (
    <Container>
      <h1>Alertas</h1>
      {JSON.stringify(alerts)}
    </Container>
  )
}

export default Alerts;
