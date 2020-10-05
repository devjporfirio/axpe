import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';
import Api from 'services';

// store
import { setMain } from 'store/modules/main/actions';
import { setUserBuildingToLike } from 'store/modules/user/actions';

// components
import Share from 'components/Share';

// helpers
import useScrollPosition from 'helpers/scrollPosition';
import checkFavorite from 'helpers/checkFavorite';

// assets
import ArrowIconSVG from 'assets/icons/arrow';
import AlertIconSVG from 'assets/icons/alert';
import ShareIconSVG from 'assets/icons/share';
import LikeIconSVG from 'assets/icons/like';

// styles
import {
  Container,
  Wrapper,
  Column,
  ButtonBack,
  ButtonIcon,
  ButtonAlertMessage,
  Text,
  ButtonLike,
  PhoneContact
} from './styles';

function Headerbar({ className, type, title, subtitle, building }) {
  const refEl = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const scrollPosition = useScrollPosition();
  const { searchFormActive } = useSelector(state => state.main);
  const user = useSelector(state => state.user);
  const { query } = router;
  const [ shareActive, setShareActive ] = useState(false);
  const [ alertCreated, setAlertCreated ] = useState(false);
  const [ alertCreating, setAlertCreating ] = useState(false);
  const [ alertMessage, setAlertMessage ] = useState(null);

  const toggleShare = useCallback(() => {
    setShareActive(!shareActive);
  }, [ shareActive ]);

  const shareOnClose = useCallback(() => {
    setShareActive(!shareActive);
  }, [ shareActive ]);

  function buttonBack() {
    if (type === 'search') {
      toggleSearch();
    } else {

      const previousUrl = window.location.href;
      setInterval(() => {
        if(previousUrl === window.location.href)
          Router ? Router.back() : window.history.back();
      }, 50);

    }
  }

  const toggleSearch = useCallback(() => {
    dispatch(setMain({ searchFormActive: !searchFormActive }));
  }, [ searchFormActive ]);

  function handleScrollPosition([ curTop, oldTop ]) {
    const startTopHeaderbar = window.innerWidth < 1170 ? 70 : 0;

    if (!refEl || !refEl.current) return false;

    if (!startTopHeaderbar) {
      refEl.current.style.top = `0px`;
      return false;
    }

    let topHeaderbar =
      curTop > oldTop ? startTopHeaderbar - curTop : startTopHeaderbar;

    if (topHeaderbar < 0) {
      topHeaderbar = 0;
    } else if (topHeaderbar > startTopHeaderbar) {
      topHeaderbar = startTopHeaderbar;
    }

    refEl.current.style.top = `${topHeaderbar}px`;
  }

  function handleButtonLike() {
    if (user.logged) {
      dispatch(setUserBuildingToLike(building.reference));
    } else {
      const modalLoginUrl = location.pathname + location.search;
      dispatch(
        setMain({
          modalLogin:
            modalLoginUrl.search(/[?]/gi) >= 0
              ? `${modalLoginUrl}&favorite=true`
              : `${modalLoginUrl}?favorite=true`
        })
      );
      dispatch(setUserBuildingToLike(building.reference));
    }
  }

  function createAlert() {
    const doCreateAlert = async (accessToken) => {
      if(alertCreating) return false;

      setAlertCreating(true);

      const response = await Api.MyAccount.postAlert(
        accessToken ? accessToken : user.access_token,
        query
      );
      const timeTohide = response.status ? 6000 : 4000;

      setAlertCreating(false);

      if (response.status) {
        setAlertMessage(
          <p>
            <strong>Alerta criado com sucesso!</strong> Você pode acompanhar
            seus alertas no seu perfil.
          </p>
        );
        setAlertCreated(true);
      } else {
        setAlertMessage(<p>{response.error}</p>);
        setAlertCreated(true);
      }

      setTimeout(() => {
        setAlertMessage(null);
        setAlertCreated(false);
      }, timeTohide);
    }

    if (user && user.logged) {
      doCreateAlert();
    } else {
      dispatch(setMain({
        modalLoginType: 'alert',
        modalLogin: (accessToken) => {
          doCreateAlert(accessToken);
        }
      }));
    }
  }

  useEffect(() => {
    if (type === 'modal') return;

    handleScrollPosition(scrollPosition);
  }, type !== 'modal' ? scrollPosition : []);

  useEffect(() => {
    dispatch(setMain({ headerHiding: true }));
  }, []);

  return (
    <>
      <Container type={type} className={className}>
        <Wrapper ref={refEl}>
          <ButtonBack
            type="button"
            onClick={buttonBack}
            className="holos-product-back"
          >
            <SVG src={ArrowIconSVG} /> Voltar
          </ButtonBack>

          {title && <h2 dangerouslySetInnerHTML={{ __html: title }} />}

          {subtitle && <h3 dangerouslySetInnerHTML={{ __html: subtitle }} />}

          {type === 'search' && (
            <Column>
              <ButtonIcon
                type="button"
                active={alertCreated}
                isLoading={alertCreating}
                onClick={createAlert}
                title="Criar alerta"
                className="btn-alert holos-search-header-button"
                data-showcase="Busca"
                data-label="Criar alerta"
              >
                <SVG src={AlertIconSVG} uniquifyIDs={true} />
                <ButtonAlertMessage active={alertCreated}>
                  {alertMessage}
                </ButtonAlertMessage>
              </ButtonIcon>
              <ButtonIcon
                type="button"
                onClick={toggleShare}
                className="btn-share holos-search-header-button"
                data-showcase="Busca"
                data-label="Share"
              >
                <SVG src={ShareIconSVG} uniquifyIDs={true} />
              </ButtonIcon>
            </Column>
          )}

          {type === 'building' && (
            <Column>
              <ButtonIcon
                type="button"
                onClick={toggleShare}
                className="btn-share holos-search-header-button"
                data-showcase="Busca"
                data-label="Share"
              >
                <SVG src={ShareIconSVG} uniquifyIDs={true} />
              </ButtonIcon>
              <Text>Ref {building.reference}</Text>
              <ButtonLike
                onClick={handleButtonLike}
                active={checkFavorite(user, building.reference)}
                className="btn-favorite holos-product-favorite"
              >
                {building.likes > 0 && building.likes}
                <SVG src={LikeIconSVG} uniquifyIDs={true} />
              </ButtonLike>
              <PhoneContact href="tel:+551130743600">11 3074-3600</PhoneContact>
            </Column>
          )}
        </Wrapper>
      </Container>
      <Share
        active={shareActive}
        path={router.asPath}
        title={`Axpe - Resultado de Busca`}
        onClose={shareOnClose}
      />
    </>
  );
}

Headerbar.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default Headerbar;
