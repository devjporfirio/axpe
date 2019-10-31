import React, { useState } from 'react';
import Link from 'next/link'
import SVG from 'react-inlinesvg';

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

export default function Header() {
  const [ navToggle, setNavToggle ] = useState(false)

  function handleToggle() {
    setNavToggle(!navToggle);
  }

  return (
    <Container navToggle={navToggle}>
      <Wrapper>

        <AxpeLogo type="axpe">
          <Link href="/">
            <LogoLink>
              Axpe. Imóveis Especiais
            </LogoLink>
          </Link>
        </AxpeLogo>

        <ChristiesLogo type="christies">
          <Link href="/sobre">
            <LogoLink>
              Christie's Real Estate São Paulo
            </LogoLink>
          </Link>
        </ChristiesLogo>

        <ButtonSearch type="button">Buscar</ButtonSearch>
        <ButtonToggle type="button" onClick={handleToggle}>
          <i></i><i></i><i></i>
        </ButtonToggle>

        <Box>
          <NavMain>
            <ul>
              <li>
                <NavMainButtonSearch type="button">
                  <SVG src={SearchIconSVG} />
                  <NavMainButtonText>Buscar imóvel</NavMainButtonText>
                </NavMainButtonSearch>
              </li>
              <li>
                <NavMainButton type="register">
                  <SVG src={HomeIconSVG} />
                  <NavMainButtonText>Cadastrar imóvel</NavMainButtonText>
                </NavMainButton>
              </li>
              <li>
                <Link href="/so-quero-sonhar">
                  <NavMainButton type="dream">
                    <SVG src={CloudIconSVG} />
                    <NavMainButtonText>Só quero sonhar</NavMainButtonText>
                  </NavMainButton>
                </Link>
              </li>
            </ul>
          </NavMain>

          <NavSecondary>
            <ul>
              <li>
                <Link href="/sobre">
                  <NavSecondaryButton>Sobre a Axpe</NavSecondaryButton>
                </Link>
              </li>
              <li>
                <Link href="/contato">
                  <NavSecondaryButton>Fale com a gente</NavSecondaryButton>
                </Link>
              </li>
              <li>
                <Link href="/minha-conta">
                  <NavSecondaryButton>Meu perfil</NavSecondaryButton>
                </Link>
              </li>
              <li>
                <Link href="/minha-conta/favoritos">
                  <NavSecondaryButton>Meus favoritos</NavSecondaryButton>
                </Link>
              </li>
            </ul>
          </NavSecondary>

          <NavLangs>
            <ul>
              <li>
                <Link>
                  <NavLangsButton>
                    EN
                  </NavLangsButton>
                </Link>
              </li>
              <li>|</li>
              <li>
                <Link>
                  <NavLangsButton>
                    ES
                  </NavLangsButton>
                </Link>
              </li>
            </ul>
          </NavLangs>

          <Whatsapp>
            <WhatsappButton href="https://api.whatsapp.com/send?phone=551130743600" target="_blank">
              <SVG src={WhatsappIconSVG} />
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
              <SocialsButton type="facebook"><SVG src={FacebookIconSVG} /></SocialsButton>
              <SocialsButton type="instagram"><SVG src={InstagramIconSVG} /></SocialsButton>
              <SocialsButton type="linkedin"><SVG src={LinkedinIconSVG} /></SocialsButton>
            </Socials>
            <Creci>CRECI 19111J</Creci>
          </Footer>
        </Box>
      </Wrapper>
    </Container>
  );
}
