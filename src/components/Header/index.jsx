import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import SimpleBar from 'simplebar-react';

// actions
import { setMain } from 'store/modules/main/actions';

// helpers
import Link from 'next/link';
import useScrollPosition from 'helpers/scrollPosition';

// assets
import InstagramIconSVG from 'assets/icons/instagram.svg';
import WhatsappIconSVG from 'assets/icons/whatsapp.svg';
import SearchIconSVG from 'assets/icons/search.svg';
import HomeIconSVG from 'assets/icons/home.svg';
import CloudIconSVG from 'assets/icons/cloud.svg';

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
  ZohoFixWhatsModal,
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
      <ZohoFixWhatsModal />
      <SimpleBar style={{ maxHeight: '100%' }} ref={scrollBarRef}>
        <Wrapper>
          <AxpeLogo type="axpe">
            <Link href="/" passHref>
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
            Buscar Imóvel
            <img src={SearchIconSVG} alt='Ícone de lupa'/>
          </ButtonSearch>
          <ButtonToggle
            type="button"
            onClick={handleToggle}
            navToggle={navToggle}
            aria-label='Menu mobile'
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
                    <SVG src={SearchIconSVG} uniquifyIDs={true} aria-hidden="true"/>
                    <NavMainButtonText>Buscar imóvel</NavMainButtonText>
                  </NavMainButtonSearch>
                </li>
                <li>
                  <Link href="https://wa.me/551130743600?text=Ol%C3%A1%2C%20eu%20gostaria%20de%20comercializar%20o%20meu%20im%C3%B3vel%20com%20a%20Axpe" passHref>
                    <NavMainButton
                      className="holos-menu-item"
                      type="register"
                      onClick={cancelToggle}
                    >
                      <SVG src={HomeIconSVG} uniquifyIDs={true} aria-hidden="true"/>
                      <NavMainButtonText>Vender imóvel</NavMainButtonText>
                    </NavMainButton>
                  </Link>
                </li>
                <li>
                  <Link href="/so-quero-sonhar" passHref>
                    <NavMainButton
                      className="holos-menu-item"
                      type="dream"
                      onClick={cancelToggle}
                    >
                      <SVG src={CloudIconSVG} uniquifyIDs={true} aria-hidden="true"/>
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
                    <Link href="/sobre" passHref>
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
                  aria-label="WhatsApp Axpe Imóveis"
                >
                  <SVG src={WhatsappIconSVG} uniquifyIDs={true} aria-hidden="true"/>
                </SocialButton>

                <SocialButton
                  href="https://instagram.com/axpe_imoveis"
                  target="_blank"
                  className="holos-footer-social-link"
                  data-label="Instagram"
                  aria-label="Instagram Axpe Imóveis"
                >
                  <SVG src={InstagramIconSVG} uniquifyIDs={true} aria-hidden="true"/>
                </SocialButton>
              </Socials>

              <Newsletter>
                <NewsletterButton
                  className="holos-menu-item"
                  type="button"
                  onClick={openModalNewsletter}
                  aria-label="Receba nossas novidades"
                >
                  Receba nossas novidades
                </NewsletterButton>
              </Newsletter>

              <Link href="/trabalhe-conosco" passHref>
                <NewsletterButton
                  className="holos-menu-item"
                  onClick={cancelToggle}
                >
                  Trabalhe conosco
                </NewsletterButton>
              </Link>
            </NavBottomContainer>
          </Box>
        </Wrapper>
      </SimpleBar>
    </Container>
  );
}

export default Header;
