import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';
import Api from 'services';

// store
import { setMain } from 'store/modules/main/actions';
import { setUser } from 'store/modules/user/actions';

// components
import Share from 'components/Share';

// helpers
import useScrollPosition from 'helpers/scrollPosition';
import checkFavorite from 'helpers/checkFavorite';

// assets
import ArrowIconSVG from 'assets/icons/arrow';
import AlertIconSVG from 'assets/icons/alert';
import ShareIconSVG from 'assets/icons/share';
import HeartIconSVG from 'assets/icons/heart-black';
import HeartCheckedIconSVG from 'assets/icons/heart-orange-checked';

// styles
import {
  Container,
  Wrapper,
  Column,
  ButtonBack,
  ButtonIcon,
  ButtonContact,
  Text,
  ButtonLike,
  ButtonMoreInformation,
  PhoneContact
} from './styles';

function Headerbar({ className, type, title, subtitle, building }) {
  const refEl = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const scrollPosition = useScrollPosition();
  const { searchFormActive } = useSelector(state => state.main);
  const access = useSelector(state => state.user);
  const [ shareActive, setShareActive ] = useState(false);
  const isFavorite = checkFavorite(building && building.reference);

  const toggleShare = useCallback(() => {
    setShareActive(!shareActive);
  }, [ shareActive ]);

  const shareOnClose = useCallback(() => {
    setShareActive(!shareActive);
  }, [ shareActive ]);

  const buttonBack = () => {
    if (type === 'search') {
      toggleSearch();
    } else {
      Router.back();
    }
  };

  const toggleSearch = useCallback(() => {
    dispatch(setMain({ searchFormActive: !searchFormActive }));
  }, [ searchFormActive ]);

  const handleScrollPosition = ([ curTop, oldTop ]) => {
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
  };

  const handleBtLike = async status => {
    if (access.logged) {
      const response = await Api.MyAccount.postFavorito(
        access.access_token,
        building.reference,
        !isFavorite
      );
      if (response && response.status === 'success') {
        const favorites = await Api.MyAccount.getFavorites(access.access_token);
        dispatch(
          setUser({
            favorites
          })
        );
      }
    } else {
      dispatch(
        setMain({
          modalLogin: true
        })
      );
    }
  };

  useEffect(
    () => {
      if (type === 'modal') return;

      handleScrollPosition(scrollPosition);
    },
    type !== 'modal' ? scrollPosition : []
  );

  useEffect(() => {
    dispatch(setMain({ headerHiding: true }));
  }, []);

  return (
    <>
      <Container type={type} className={className}>
        <Wrapper ref={refEl}>
          <ButtonBack type="button" onClick={buttonBack}>
            <SVG src={ArrowIconSVG} /> Voltar
          </ButtonBack>

          {title && <h2 dangerouslySetInnerHTML={{ __html: title }} />}

          {subtitle && <h3 dangerouslySetInnerHTML={{ __html: subtitle }} />}

          {type === 'search' && (
            <Column>
              <ButtonIcon type="button">
                <SVG src={AlertIconSVG} uniquifyIDs={true} />
              </ButtonIcon>
              <ButtonIcon type="button" onClick={toggleShare}>
                <SVG src={ShareIconSVG} uniquifyIDs={true} />
              </ButtonIcon>
              <ButtonContact type="button" size="small">
                Fale conosco
              </ButtonContact>
            </Column>
          )}

          {type === 'building' && (
            <Column>
              <Text>Ref {building.reference}</Text>
              <ButtonLike onClick={() => handleBtLike(!isFavorite)}>
                {building.likes}
                <SVG
                  src={
                    checkFavorite(building.reference)
                      ? HeartCheckedIconSVG
                      : HeartIconSVG
                  }
                  uniquifyIDs={true}
                />
              </ButtonLike>
              <ButtonMoreInformation type="button" size="small">
                Mais informações
              </ButtonMoreInformation>
              <PhoneContact>11 3074-3600</PhoneContact>
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
