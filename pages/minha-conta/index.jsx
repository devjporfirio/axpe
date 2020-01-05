import React, { Fragment, useEffect, useState } from 'react';
import Api from 'services';
import { useSelector, useDispatch } from 'react-redux';

// actions
import { setMain } from 'store/modules/main/actions';

// components
import Slides from 'pages/MyAccount/Viewed/Slides';

// styles
import { Container } from 'pages/MyAccount/Viewed/styles';

function Viewed({}) {
  const [ views, setviews ] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    async function loadBuildings() {
      if (user && user.access_token) {
        dispatch(setMain({ modalLogin: false }));
        const buildingViewed = await Api.MyAccount.getViewed(user.access_token);
        setviews(buildingViewed);
      } else {
        dispatch(setMain({ modalLogin: true }));
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

  if(!user.logged) return null;

  return (
    <Container>
      {Object.keys(group).length > 0 &&
        Object.keys(group).map((item, index) => (
          <Fragment key={index}>
            <Slides date={item} items={group[item]} />
            {Object.keys(group).length - 1 > index && <hr />}
          </Fragment>
        ))}
    </Container>
  );
}

export default Viewed;
