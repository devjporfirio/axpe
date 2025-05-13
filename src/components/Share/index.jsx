import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import ClipboardJS from 'clipboard';

// assets
import WhatsappRoundedIconSVG from 'assets/icons/whatsapp-rounded.svg';
import FacebookRoundedIconSVG from 'assets/icons/facebook-rounded.svg';
import TwitterRoundedIconSVG from 'assets/icons/twitter-rounded.svg';
import LinkedinRoundedIconSVG from 'assets/icons/linkedin-rounded.svg';

// styles
import {
  Container,
  Wrapper,
  Header,
  Socials,
  SocialsButton,
  Copy
} from './styles';

function Share({ active, path, title, onClose }) {
  const [ url, setUrl ] = useState(null);
  const [ copied, setCopied ] = useState(false);
  const copySubmitButton = useRef(null);

  function handleClose() {
    onClose();
  }

  function attachClipboard() {
    const copyjs = new ClipboardJS(copySubmitButton.current);
    copyjs.on('success', () => {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 4000);
    });
  }

  useEffect(() => {
    setUrl(`${process.env.config.siteUrl}${path}`);
    attachClipboard();
  }, [ active ]);

  return (
    <Container active={active} onClick={handleClose}>
      <Wrapper onClick={event => event.stopPropagation()}>
        <Header>
          <h6>Compartilhar</h6>
          <button type="button" onClick={handleClose}>
            Fechar
          </button>
        </Header>

        <Socials>
          <SocialsButton
            href={`https://api.whatsapp.com/send?text=${url}`}
            target="_blank"
            className="holos-account-favorite-share-network"
            data-label="Whatsapp"
          >
            <SVG src={WhatsappRoundedIconSVG} uniquifyIDs={true} /> Whatsapp
          </SocialsButton>
          <SocialsButton
            href={`https://www.facebook.com/sharer.php?u=${url}`}
            target="_blank"
            className="holos-account-favorite-share-network"
            data-label="Facebook"
          >
            <SVG src={FacebookRoundedIconSVG} uniquifyIDs={true} /> Facebook
          </SocialsButton>
          <SocialsButton
            href={`https://twitter.com/share?text=${title}&url=${url}`}
            target="_blank"
            className="holos-account-favorite-share-network"
            data-label="Twitter"
          >
            <SVG src={TwitterRoundedIconSVG} uniquifyIDs={true} /> Twitter
          </SocialsButton>
          <SocialsButton
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`}
            target="_blank"
            className="holos-account-favorite-share-network"
            data-label="Linkedin"
          >
            <SVG src={LinkedinRoundedIconSVG} uniquifyIDs={true} /> Linkedin
          </SocialsButton>
        </Socials>

        <Copy copied={copied}>
          {url && <input type="text" id="url" name="url" defaultValue={url} />}
          <button
            type="button"
            ref={copySubmitButton}
            data-clipboard-target="#url"
            className="holos-account-favorite-share-network"
            data-label="Copiar Link"
          >
            {copied ? 'Copiado!' : `Copiar`}
          </button>
        </Copy>
      </Wrapper>
    </Container>
  );
}

Share.propTypes = {
  active: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Share;
