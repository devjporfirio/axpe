import React from 'react';
import Link from 'next/link';
import SVG from 'react-inlinesvg';
import { useSelector, useDispatch } from 'react-redux';

// store
import { setMain } from 'store/modules/main/actions';

// images
import UserIconSVG from 'assets/icons/user';

// styles
import { Info, InfoLogin, LinkLogoff } from './styles';

function InfoUser({ className }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  function handleLogoff() {
    dispatch(setMain({ modalContact: false }));
  }

  return (
    <InfoLogin className={className}>
      <SVG src={UserIconSVG} uniquifyIDs={true} />
      <Info>
        <p>
          Você está logado como
          <strong> {user.me.name} {user.me.lastName}</strong>
        </p>
        <p>Tel.: {user.me.phone}</p>
        <p>E-mail: {user.me.email}</p>
        <p>
          Se não for você{' '}
          <Link href="/logout" passHref>
            <LinkLogoff onClick={handleLogoff}>clique aqui</LinkLogoff>
          </Link>
        </p>
      </Info>
    </InfoLogin>
  );
}

export default InfoUser;