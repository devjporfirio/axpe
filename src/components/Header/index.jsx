import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
import SVG from 'react-inlinesvg';

// actions
import { setMain } from 'store/modules/main/actions';

// helpers
import useScrollPosition from 'helpers/scroll-position';

// assets
import SearchIconSVG from 'assets/icons/search';
import HomeIconSVG from 'assets/icons/home';
import CloudIconSVG from 'assets/icons/cloud';
import WhatsappIconSVG from 'assets/icons/whatsapp';
import FacebookIconSVG from 'assets/icons/facebook';
import InstagramIconSVG from 'assets/icons/instagram';
import LinkedinIconSVG from 'assets/icons/linkedin';

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
  NavLangs,
  NavLangsButton,
  Whatsapp,
  WhatsappButton, Contact,
  Newsletter,
  NewsletterButton,
  Footer,
  Socials,
  SocialsButton,
  Creci
} from './styles';

function Header() {
  const dispatch = useDispatch();
  const refHeader = useRef(null);
  const { headerHiding, searchFormActive } = useSelector(state => state.main);
  const [ navToggle, setNavToggle ] = useState(false);
  const scrollPosition = useScrollPosition();

  const handleScrollPosition = useCallback(([ curTop, oldTop ]) => {
    if(!refHeader || !headerHiding) return false;

    if(window.innerWidth >= 768) {
      refHeader.current.style.top = `0px`;
      return false;
    }

    let top = curTop > oldTop ? -curTop : 0;

    if(top <= -70) {
      top = -70;
    } else if(top > 0) {
      top = 0;
    }

    refHeader.current.style.top = `${top}px`;
  }, [ headerHiding ]);

  const handleToggle = useCallback(() => {
    setNavToggle(!navToggle);
  }, [ navToggle ])

  const toggleSearch = useCallback(() => {
    if(!searchFormActive && navToggle) {
      handleToggle();
    }

    dispatch(setMain({ searchFormActive: !searchFormActive }))
  }, [ searchFormActive, navToggle ])

  function cancelToggle() {
    setNavToggle(false);
  }

  useEffect(() => {
    handleScrollPosition(scrollPosition);
  }, [ scrollPosition ])

  return (
    <Container ref={refHeader}>
      <Wrapper>

        <AxpeLogo type="axpe">
          <Link href="/" passHref>
            <LogoLink onClick={cancelToggle}>
              Axpe. Imóveis Especiais
            </LogoLink>
          </Link>
        </AxpeLogo>

        <ChristiesLogo type="christies">
          <Link href="/sobre" passHref>
            <LogoLink onClick={cancelToggle}>
              Christie's Real Estate São Paulo
            </LogoLink>
          </Link>
        </ChristiesLogo>

        <ButtonSearch type="button" onClick={toggleSearch}>Buscar</ButtonSearch>
        <ButtonToggle type="button" onClick={handleToggle} navToggle={navToggle}>
          <i></i><i></i><i></i>
        </ButtonToggle>

        <Box navToggle={navToggle}>
          <NavMain>
            <ul>
              <li>
                <NavMainButtonSearch type="button" active={searchFormActive} onClick={toggleSearch}>
                  <SVG src={SearchIconSVG} uniquifyIDs={true} />
                  <NavMainButtonText>Buscar imóvel</NavMainButtonText>
                </NavMainButtonSearch>
              </li>
              <li>
                <NavMainButton type="register">
                  <SVG src={HomeIconSVG} uniquifyIDs={true} />
                  <NavMainButtonText>Cadastrar imóvel</NavMainButtonText>
                </NavMainButton>
              </li>
              <li>
                <Link href="/so-quero-sonhar" passHref>
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
                <Link href="/sobre" passHref>
                  <NavSecondaryButton onClick={cancelToggle}>Sobre a Axpe</NavSecondaryButton>
                </Link>
              </li>
              <li>
                <Link href="/contato" passHref>
                  <NavSecondaryButton onClick={cancelToggle}>Fale com a gente</NavSecondaryButton>
                </Link>
              </li>
              <li>
                <Link href="/minha-conta" passHref>
                  <NavSecondaryButton onClick={cancelToggle}>Meu perfil</NavSecondaryButton>
                </Link>
              </li>
              <li>
                <Link href="/minha-conta/favoritos" passHref>
                  <NavSecondaryButton onClick={cancelToggle}>Meus favoritos</NavSecondaryButton>
                </Link>
              </li>
            </ul>
          </NavSecondary>

          <NavLangs>
            <ul>
              <li>
                <Link href="/en" passHref>
                  <NavLangsButton onClick={cancelToggle}>
                    EN
                  </NavLangsButton>
                </Link>
              </li>
              <li>|</li>
              <li>
                <Link href="es" passHref>
                  <NavLangsButton onClick={cancelToggle}>
                    ES
                  </NavLangsButton>
                </Link>
              </li>
            </ul>
          </NavLangs>

          <Whatsapp>
            <WhatsappButton href="https://api.whatsapp.com/send?phone=551130743600" target="_blank">
              <SVG src={WhatsappIconSVG} uniquifyIDs={true} />
              Fale conosco pelo Whatsapp
            </WhatsappButton>
          </Whatsapp>

          <Contact>
            Fale com a gente <strong>(11) 3074-3600</strong>
          </Contact>

          <Newsletter>
            <NewsletterButton type="button">Receba nossas <strong>novidades</strong></NewsletterButton>
          </Newsletter>

          <Footer>
            <Socials>
              <SocialsButton type="facebook" href="https://www.facebook.com/pages/Axpe-Im%C3%B3veis-Especiais-Unicamente/100515957997" target="_blank"><SVG src={FacebookIconSVG} uniquifyIDs={true} /></SocialsButton>
              <SocialsButton type="instagram" href="http://instagram.com/axpe_imoveis" target="_blank"><SVG src={InstagramIconSVG} uniquifyIDs={true} /></SocialsButton>
              <SocialsButton type="linkedin" href="https://br.linkedin.com/company/axpe-im-veis" target="_blank"><SVG src={LinkedinIconSVG} uniquifyIDs={true} /></SocialsButton>
            </Socials>
            <Creci>CRECI 19111J</Creci>
          </Footer>
        </Box>
      </Wrapper>
    </Container>
  );
}

export default Header;