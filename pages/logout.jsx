import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

// actions
import { unsetUser } from 'store/modules/user/actions';

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(unsetUser());
    Router.push('/');
  }, [])

  return null;
}

export default Logout
