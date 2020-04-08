import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';

// actions
import { setMain } from 'store/modules/main/actions';

// helpers
import { Link } from 'helpers/routes';
import useScrollPosition from 'helpers/scrollPosition';

// assets
import SearchIconSVG from 'assets/icons/search';
import HomeIconSVG from 'assets/icons/home';
import CloudIconSVG from 'assets/icons/cloud';
import WhatsappIconSVG from 'assets/icons/whatsapp';
import AlertIconSVG from 'assets/icons/alert';

// styles
import {
  Container,
  Wrapper,
  AxpeLogo,
  ChristiesLogo,
  LogoLink,
  ButtonSearch,
  ButtonToggle,
  Box,
  NavMain,
  NavMainButtonSearch,
  NavMainButton,
  NavMainButtonText,
  NavSecondary,
  NavSecondaryButton,
  NavIconAlert,
  Whatsapp,
  WhatsappButton,
  Contact,
  Newsletter,
  NewsletterButton
} from './styles';

function Header() {
  const dispatch = useDispatch();
  const refHeader = useRef(null);
  const {
    headerHiding,
    searchFormActive,
    modalNewsletter,
    modalLogin
  } = useSelector(state => state.main);
  const {
    logged,
    me: {
      notificationsAvailable,
      notificationAlert,
      notificationFavorite
    }
  } = useSelector(state => state.user);
  const [ navToggle, setNavToggle ] = useState(false);
  const scrollPosition = useScrollPosition();

  const handleScrollPosition = useCallback(
    ([ curTop, oldTop ]) => {
      if (!refHeader || !headerHiding) return false;

      if (window.innerWidth >= 1170) {
        refHeader.current.style.top = `0px`;
        return false;
      }

      let top = curTop > oldTop ? -curTop : 0;

      if (top <= -70) {
        top = -70;
      } else if (top > 0) {
        top = 0;
      }

      refHeader.current.style.top = `${top}px`;
    },
    [ headerHiding ]
  );

  const handleToggle = useCallback(() => {
    setNavToggle(!navToggle);
  }, [ navToggle ]);

  const toggleSearch = useCallback(() => {
    if (!searchFormActive && navToggle) {
      handleToggle();
    }

    dispatch(setMain({ searchFormActive: !searchFormActive }));
  }, [ searchFormActive, navToggle ]);

  const openModalNewsletter = useCallback(() => {
    dispatch(setMain({ modalNewsletter: true }));
  }, [ modalNewsletter ]);

  const openModalLogin = useCallback((redirectTo) => {
    dispatch(setMain({ modalLogin: redirectTo }));
  }, [ modalLogin ]);

  function cancelToggle() {
    setNavToggle(false);
  }

  useEffect(() => {
    handleScrollPosition(scrollPosition);
  }, [ scrollPosition ]);

  return (
    <Container ref={refHeader}>
      <Wrapper>
        <AxpeLogo type="axpe">
          <Link route="/" passHref>
            <LogoLink onClick={cancelToggle}>Axpe. Imóveis Especiais</LogoLink>
          </Link>
        </AxpeLogo>

        <ChristiesLogo type="christies">
          <Link route="/sobre" passHref>
            <LogoLink onClick={cancelToggle}>
              Christie's Real Estate São Paulo
            </LogoLink>
          </Link>
        </ChristiesLogo>

        <ButtonSearch type="button" onClick={toggleSearch}>
          Buscar
        </ButtonSearch>
        <ButtonToggle
          type="button"
          onClick={handleToggle}
          navToggle={navToggle}
        >
          <i></i>
          <i></i>
          <i></i>
        </ButtonToggle>

        <Box navToggle={navToggle}>
          <NavMain>
            <ul>
              <li>
                <NavMainButtonSearch
                  type="button"
                  active={searchFormActive}
                  onClick={toggleSearch}
                >
                  <SVG src={SearchIconSVG} uniquifyIDs={true} />
                  <NavMainButtonText>Buscar imóvel</NavMainButtonText>
                </NavMainButtonSearch>
              </li>
              <li>
                {logged ? (
                  <Link route="/cadastrar" passHref>
                    <NavMainButton type="register" onClick={cancelToggle}>
                      <SVG src={HomeIconSVG} uniquifyIDs={true} />
                      <NavMainButtonText>Cadastrar imóvel</NavMainButtonText>
                    </NavMainButton>
                  </Link>
                ) : (
                  <NavMainButton type="register" onClick={() => openModalLogin('/cadastrar')}>
                    <SVG src={HomeIconSVG} uniquifyIDs={true} />
                    <NavMainButtonText>Cadastrar imóvel</NavMainButtonText>
                  </NavMainButton>
                )}
              </li>
              <li>
                <Link route="/so-quero-sonhar" passHref>
                  <NavMainButton type="dream" onClick={cancelToggle}>
                    <SVG src={CloudIconSVG} uniquifyIDs={true} />
                    <NavMainButtonText>Só quero sonhar</NavMainButtonText>
                  </NavMainButton>
                </Link>
              </li>
            </ul>
          </NavMain>

          <NavSecondary>
            <ul>
              <li>
                <Link route="/sobre" passHref>
                  <NavSecondaryButton onClick={cancelToggle}>
                    Sobre a Axpe
                  </NavSecondaryButton>
                </Link>
              </li>
              <li>
                <Link route="/contato" passHref>
                  <NavSecondaryButton onClick={cancelToggle}>
                    Fale com a gente
                  </NavSecondaryButton>
                </Link>
              </li>
              <li>
                {logged ? (
                  <Link route="/minha-conta" passHref>
                    <NavSecondaryButton onClick={cancelToggle}>
                      Meu perfil
                      {notificationsAvailable && notificationsAvailable === 'profile' && notificationAlert ? (
                        <NavIconAlert>
                          <SVG src={AlertIconSVG} uniquifyIDs={true} />
                        </NavIconAlert>
                      ) : null}
                    </NavSecondaryButton>
                  </Link>
                ) : (
                  <NavSecondaryButton onClick={()=> openModalLogin('/minha-conta')}>
                    Meu perfil
                  </NavSecondaryButton>
                )}
              </li>
              <li>
              {logged ? (
                  <Link route="/minha-conta/favoritos" passHref>
                    <NavSecondaryButton onClick={cancelToggle}>
                      Meus favoritos
                    </NavSecondaryButton>
                  </Link>
                ) : (
                  <NavSecondaryButton onClick={()=> openModalLogin('/minha-conta/favoritos')}>
                    Meus favoritos
                    {notificationsAvailable && notificationsAvailable === 'favorites' && notificationFavorite ? (
                      <NavIconAlert>
                        <SVG src={AlertIconSVG} uniquifyIDs={true} />
                      </NavIconAlert>
                    ) : null}
                  </NavSecondaryButton>
                )}
              </li>
            </ul>
          </NavSecondary>

          <Whatsapp>
            <WhatsappButton
              href="https://api.whatsapp.com/send?phone=551130743600"
              target="_blank"
            >
              <SVG src={WhatsappIconSVG} uniquifyIDs={true} />
              WhatsApp
            </WhatsappButton>
          </Whatsapp>

          <Contact>
            Fale com a gente <a href="tel:+551130743600">(11) 3074-3600</a>
          </Contact>

          <Newsletter>
            <NewsletterButton type="button" onClick={openModalNewsletter}>
              Receba nossas <strong>novidades</strong>
            </NewsletterButton>
          </Newsletter>
        </Box>
      </Wrapper>
    </Container>
  );
}

export default Header;
