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
          <SocialButton
            href="https://www.facebook.com/pages/Axpe-Im%C3%B3veis-Especiais-Unicamente/100515957997"
            target="_blank"
            className="holos-footer-social-link"
            data-label="Facebook"
          >
            <SVG src={FacebookIconSVG} uniquifyIDs={true} />
          </SocialButton>
          <SocialButton
            href="https://instagram.com/axpe_imoveis"
            target="_blank"
            className="holos-footer-social-link"
            data-label="Instagram"
          >
            <SVG src={InstagramIconSVG} uniquifyIDs={true} />
          </SocialButton>
          <SocialButton
            href="https://br.linkedin.com/company/axpe-im-veis"
            target="_blank"
            className="holos-footer-social-link"
            data-label="Linkedin"
          >
            <SVG src={LinkedinIconSVG} uniquifyIDs={true} />
          </SocialButton>
        </Socials>
        <Copy>
          Todos os direitos reservados. Axpe. CRECI 19111J{' '}
          <span>
            |{' '}
            <Link route="/mapa-do-site" passHref>
              <a className="holos-footer-link" data-label="Mapa do site">Mapa do site</a>
            </Link>
          </span>{' '}
          <span>
            |{' '}
            <Link route="/politica-de-privacidade" passHref>
              <a className="holos-footer-link" data-label="Política de privacidade">Política de privacidade</a>
            </Link>
          </span>{' '}
          <span>
            |{' '}
            <Link route="/termos-de-uso" passHref>
              <a className="holos-footer-link" data-label="Termos de uso">Termos de uso</a>
            </Link>
          </span>
        </Copy>
        <Links>
          <Link route="/mapa-do-site" passHref>
            <a className="holos-footer-link" data-label="Mapa do site">Mapa do site</a>
          </Link>
          <span>|</span>
          <FutureBrand>
            By{' '}
            <a href="https://www.futurebrand.com" target="_blank" className="holos-footer-link" data-label="Futurebrand">
              FutureBrand
            </a>
          </FutureBrand>
        </Links>
      </Wrapper>
    </Container>
  );
}

export default Footer;
