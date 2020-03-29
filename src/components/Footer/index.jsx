import React from 'react';
import SVG from 'react-inlinesvg';

// helpers
import { Link } from 'helpers/routes';

// assets
import FacebookIconSVG from 'assets/icons/facebook';
import InstagramIconSVG from 'assets/icons/instagram';
import LinkedinIconSVG from 'assets/icons/linkedin';

// styles
import {
  Container,
  Wrapper,
  Socials,
  SocialButton,
  Copy,
  Links,
  FutureBrand,
} from './styles';

function Footer() {
  return (
    <Container>
      <Wrapper>
        <Socials>
          <SocialButton href="https://www.facebook.com/pages/Axpe-Im%C3%B3veis-Especiais-Unicamente/100515957997" target="_blank">
            <SVG src={FacebookIconSVG} uniquifyIDs={true} />
          </SocialButton>
          <SocialButton href="http://instagram.com/axpe_imoveis" target="_blank">
            <SVG src={InstagramIconSVG} uniquifyIDs={true} />
          </SocialButton>
          <SocialButton href="https://br.linkedin.com/company/axpe-im-veis" target="_blank">
            <SVG src={LinkedinIconSVG} uniquifyIDs={true} />
          </SocialButton>
        </Socials>
        <Copy>
          Todos os direitos reservados. AxPe. CRECI 19111J{' '}
          <span>
            |{' '}
            <Link route="/mapa-do-site" passHref>
              <a>Mapa do site</a>
            </Link>
          </span>
        </Copy>
        <Links>
          <Link route="/mapa-do-site" passHref>
            <a>Mapa do site</a>
          </Link>
          <span>|</span>
          <FutureBrand>
            By{' '}
            <a href="https://www.futurebrand.com" target="_blank">
              FutureBrand
            </a>
          </FutureBrand>
        </Links>
      </Wrapper>
    </Container>
  );
}

export default Footer;
