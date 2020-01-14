import React from 'react';
import Link from 'next/link';
import SVG from 'react-inlinesvg';
import { useSelector } from 'react-redux';

// actions
import { setUser } from 'store/modules/user/actions';

// images
import IUser from 'assets/icons/user';

// styles
import { Info, InfoLogin } from './styles';

export default function InfoUser({ className }) {
  const user = useSelector(state => state.user);
  const handleLogOff = () => {
    dispatch(
      setUser({
        logged: false,
        access_token: '',
        favorites: []
      })
    );
  };

  return (
    <InfoLogin className={className}>
      <SVG src={IUser} uniquifyIDs={true} />
      <Info>
        <p>
          Você está logado como
          <strong> {user.me.name} {user.me.last_name}</strong>
        </p>
        <p>Tel.: {user.me.phone}</p>
        <p>E-mail: {user.me.email}</p>
        <p>
          Se não for você{' '}
          <Link href="/" passHref>
            <button onClick={handleLogOff}>clique aqui</button>
          </Link>
        </p>
      </Info>
    </InfoLogin>
  );
}
