import React, { useCallback } from 'react';
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

  const doFacebookLogin = useCallback(() => {
    FacebookHelper.login(async fbResponse => {
      if (fbResponse.status === 'connected') {
        dispatch(setLoading({ active: true }));

        const response = await Api.User.postLoginFacebook({
          id: fbResponse.authResponse.userID,
          access_token: fbResponse.authResponse.accessToken
        });

        if(response.access_token) {
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
      }
    });
  }, []);

  const doGoogleLogin = useCallback(() => {
  }, []);

  return (
    <Container>
      <p>Ou entre com:</p>
      <ButtonSocial type="button" onClick={doFacebookLogin}>
        <SVG src={FacebookRoundedIconSVG} uniquifyIDs={true} />
      </ButtonSocial>
      <ButtonSocial type="button" onClick={doGoogleLogin}>
        <SVG src={GoogleRoundedIconSVG} uniquifyIDs={true} />
      </ButtonSocial>
    </Container>
   );

}

export default LoginSocials;