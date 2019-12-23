import React, { Fragment } from 'react';
import Api from 'services';

// components
import Slides from 'pages/MyAccount/Viewed/Slides';

// styles
import { Container } from 'pages/MyAccount/Viewed/styles';

function Viewed({ views }) {
  const group = views.reduce(function(h, obj) {
    h[obj['viewed_at']] = (h[obj['viewed_at']] || []).concat(obj);
    return h;
  }, {});

  return (
    <Container>
      {Object.keys(group).length > 0 &&
        Object.keys(group).map((item, index) => (
          <Fragment key={index}>
            <Slides date={item} items={group[item]} />
            <hr />
          </Fragment>
        ))}
    </Container>
  );
}

Viewed.getInitialProps = async ({}) => {
  const buildingViewed = await Api.MyAccount.getViewed();
  return {
    views: buildingViewed
  };
};

export default Viewed;
