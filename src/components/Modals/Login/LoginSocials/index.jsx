import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import SVG from 'react-inlinesvg';
import Api from 'services';

// helpers
import FacebookHelper from 'helpers/facebook';

// actions
import { setLoading } from 'store/modules/loading/actions';
import { setMain } from 'store/modules/main/actions';

// assets
import FacebookRoundedIconSVG from 'assets/icons/facebook-rounded';
import GoogleRoundedIconSVG from 'assets/icons/google-rounded';

// styles
import {
  Container,
  ButtonSocial
} from './styles';

function LoginSocials({
  doAfterLogin
}) {
  const dispatch = useDispatch();
  const { modalLogin } = useSelector(state => state.main);

  const handleResponse = useCallback(async (response) => {
    if(response) {
      await doAfterLogin(response);
      Router.push(typeof modalLogin === 'string' ? modalLogin : `/minha-conta`);
      dispatch(setMain({
        modalLogin: false
      }));
    } else {
      dispatch(setLoading({
        active: false
      }));
    }
  }, []);

  const doFacebookLogin = useCallback(() => {
    FacebookHelper.login(async fbResponse => {
      if (fbResponse.status === 'connected') {
        dispatch(setLoading({ active: true }));

        const response = await Api.User.postLoginFacebook({
          id: fbResponse.authResponse.userID,
          access_token: fbResponse.authResponse.accessToken
        });

        handleResponse(response);
      }
    });
  }, []);

  const doGoogleLogin = useCallback(async (googleResponse) => {
    if(googleResponse && googleResponse.uc && !googleResponse.error) {
      dispatch(setLoading({ active: true }));

      const response = await Api.User.postLoginGoogle({
        access_token: googleResponse.uc.access_token
      });

      if(response.status && !response.error) {
        handleResponse(response);
      } else {
        dispatch(setLoading({ active: false }));
      }
    }
  }, []);

  useEffect(() => {
    gapi.signin2.render('button-google-login', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': doGoogleLogin,
      'onfailure': doGoogleLogin
    });
  }, []);

  return (
    <Container>
      <p>Ou entre com:</p>
      <ButtonSocial type="button" socialNetwork="facebook" onClick={doFacebookLogin}>
        <SVG src={FacebookRoundedIconSVG} uniquifyIDs={true} />
      </ButtonSocial>
      <ButtonSocial type="button" socialNetwork="google" onClick={doGoogleLogin}>
        <SVG src={GoogleRoundedIconSVG} uniquifyIDs={true} />
        <div id="button-google-login" />
      </ButtonSocial>
    </Container>
   );

}

export default LoginSocials;