import React from 'react';
import SVG from 'react-inlinesvg';
import { useSelector, useDispatch } from 'react-redux';

// helpers
import { Link } from 'helpers/routes';

// store
import { setMain } from 'store/modules/main/actions';

// images
import UserIconSVG from 'assets/icons/user';

// styles
import {
  Container,
  Text,
  LinkLogout
} from './styles';

function UserInfo({ asInclude, layout }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  function handleLogoff() {
    dispatch(setMain({ modalContact: false }));
  }

  return (
    <Container asInclude={asInclude} layout={layout}>
      <SVG src={UserIconSVG} uniquifyIDs={true} />
      <Text>
        <p>
          Você está logado como
          <strong> {user.me.name} {user.me.lastName}</strong>
        </p>
        <p>
          Se não for você{' '}
          <Link route="/logout" passHref>
            <LinkLogout onClick={handleLogoff}>clique aqui</LinkLogout>
          </Link>
        </p>
      </Text>
    </Container>
  );
}

export default UserInfo;