import Cookies from 'js-cookie';

function shouldRenewToken() {
  const userDataCookie = Cookies.get('userData');
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
  const currentTime = new Date().getTime();

  if(userData &&
    userData.access_token &&
    currentTime >= userData.tokenMaxTime) {
      location.reload();
  }
}

export default shouldRenewToken;