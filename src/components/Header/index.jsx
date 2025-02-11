import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import SimpleBar from 'simplebar-react';

// actions
import { setMain } from 'store/modules/main/actions';

// helpers
import { Link } from 'helpers/routes';
import useScrollPosition from 'helpers/scrollPosition';

// assets
import InstagramIconSVG from 'assets/icons/instagram';
import WhatsappIconSVG from 'assets/icons/whatsapp';

// styles
import {
  Container,
  Wrapper,
  AxpeLogo,
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
  Socials,
  SocialButton,
  Newsletter,
  NewsletterButton,
  NavBottomContainer,
} from './styles';

function Header() {
  const dispatch = useDispatch();
  const refHeader = useRef(null);
  const { headerHiding, searchFormActive, modalNewsletter } = useSelector(
    (state) => state.main
  );
  const scrollBarRef = useRef();
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

  const cancelToggle = () => {
    setNavToggle(false);
  };

  useEffect(() => {
    handleScrollPosition(scrollPosition);
  }, [ scrollPosition ]);

  useEffect(() => {
    if (scrollBarRef.current && window.innerWidth < 1170) {
      scrollBarRef.current.unMount();
    }
  }, []);

  return (
    <Container ref={refHeader}>
      <SimpleBar style={{ maxHeight: '100%' }} ref={scrollBarRef}>
        <Wrapper>
          <AxpeLogo type="axpe">
            <Link route="/" passHref>
              <LogoLink
                className="holos-logo"
                data-label="Axpe"
                onClick={cancelToggle}
              >
                Axpe. Imóveis Especiais
              </LogoLink>
            </Link>
          </AxpeLogo>

          <ButtonSearch
            className="holos-menu-item"
            type="button"
            onClick={toggleSearch}
          >
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
                    className="holos-menu-item"
                    active={searchFormActive}
                    onClick={toggleSearch}
                  >
                    <NavMainButtonText>Buscar imóvel</NavMainButtonText>
                  </NavMainButtonSearch>
                </li>
                <li>
                  <Link route="/cadastrar" passHref>
                    <NavMainButton
                      className="holos-menu-item"
                      type="register"
                      onClick={cancelToggle}
                    >
                      <NavMainButtonText>Cadastrar imóvel</NavMainButtonText>
                    </NavMainButton>
                  </Link>
                </li>
                <li>
                  <Link route="/so-quero-sonhar" passHref>
                    <NavMainButton
                      className="holos-menu-item"
                      type="dream"
                      onClick={cancelToggle}
                    >
                      <NavMainButtonText>Só quero sonhar</NavMainButtonText>
                    </NavMainButton>
                  </Link>
                </li>
              </ul>
            </NavMain>

            <NavBottomContainer>
              <NavSecondary>
                <ul>
                  <li>
                    <Link route="/sobre" passHref>
                      <NavSecondaryButton
                        className="holos-menu-item"
                        onClick={cancelToggle}
                      >
                        Sobre a Axpe
                      </NavSecondaryButton>
                    </Link>
                  </li>
                </ul>
              </NavSecondary>

              <Socials>
                <SocialButton
                  className="holos-menu-item"
                  href="https://wa.me/551130743600"
                  target="_blank"
                >
                  <SVG src={WhatsappIconSVG} uniquifyIDs={true} />
                </SocialButton>

                <SocialButton
                  href="https://instagram.com/axpe_imoveis"
                  target="_blank"
                  className="holos-footer-social-link"
                  data-label="Instagram"
                >
                  <SVG src={InstagramIconSVG} uniquifyIDs={true} />
                </SocialButton>
              </Socials>

              <Newsletter>
                <NewsletterButton
                  className="holos-menu-item"
                  type="button"
                  onClick={openModalNewsletter}
                >
                  Receba nossas novidades
                </NewsletterButton>
              </Newsletter>
            </NavBottomContainer>
          </Box>
        </Wrapper>
      </SimpleBar>
    </Container>
  );
}

export default Header;
