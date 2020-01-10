import React, { Fragment, useEffect, useState } from 'react';
import Api from 'services';
import { useSelector } from 'react-redux';

// components
import Slides from 'pages/MyAccount/Viewed/Slides';
import Empty from 'pages/MyAccount/Empty';

// styles
import { Container } from 'pages/MyAccount/Viewed/styles';

function Viewed() {
  const user = useSelector(state => state.user);
  const [ views, setViews ] = useState([]);

  useEffect(() => {
    async function loadBuildings() {
      if (user && user.access_token) {
        const buildingViewed = await Api.MyAccount.getViewed(user.access_token);
        setViews(buildingViewed);
      }
    }

    loadBuildings();
  }, [ user ]);

  const group =
    views &&
    views.length > 0 &&
    views.reduce(function(h, obj) {
      h[obj['viewedAt']] = (h[obj['viewedAt']] || []).concat(obj);
      return h;
    }, {});

  if (!user.logged) return <Container />;

  return (
    <Container>
      {Object.keys(group).length > 0 ? (
        Object.keys(group).map((item, index) => (
          <Fragment key={index}>
            <Slides date={item} items={group[item]} />
            {Object.keys(group).length - 1 > index && <hr />}
          </Fragment>
        ))
      ) : (
        <Empty
          title="Você ainda não visualizou nenhum imóvel"
          subtitle="Navegue pelo site, visualize imóveis, e eles ficarão disponíveis para visualizações futuras aqui."
        />
      )}
    </Container>
  );
}

export default Viewed;
