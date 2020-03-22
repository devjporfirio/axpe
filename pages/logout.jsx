import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

// actions
import { unsetUser } from 'store/modules/user/actions';

function Logout() {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(unsetUser());

    if(gapi) {
      const auth2 = gapi.auth2.getAuthInstance();
      await auth2.signOut();
    }

    Router.push('/');
  }, [])

  return null;
}

export default Logout
