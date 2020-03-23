import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// actions
import { unsetUser } from 'store/modules/user/actions';

function Logout() {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(unsetUser());

    try {
      if(gapi) {
        const auth2 = gapi.auth2.getAuthInstance();
        await auth2.signOut();
      }
    } catch(error) {}

    window.location = '/';
  }, [])

  return null;
}

export default Logout
