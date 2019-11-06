import React, { useEffect, useRef, useState } from 'react';
import SVG from 'react-inlinesvg';
import ClipboardJS from 'clipboard';

// assets
import WhatsappRoundedIconSVG from 'assets/icons/whatsapp-rounded';
import FacebookRoundedIconSVG from 'assets/icons/facebook-rounded';
import TwitterRoundedIconSVG from 'assets/icons/twitter-rounded';
import LinkedinRoundedIconSVG from 'assets/icons/linkedin-rounded';

// styles
import { Container, Wrapper, Header, Socials, SocialsButton, Copy } from './styles';


function Share({ active, path, title, onClose }) {
  const [ url, setUrl ] = useState(null);
  const [ copied, setCopied ] = useState(false);
  const copySubmitButton = useRef(null);

  function handleClose() {
  }

  function attachClipboard() {
    const copyjs = new ClipboardJS(copySubmitButton.current);
    copyjs.on('success', () => {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 4000);
    })
  }

  useEffect(() => {
    setUrl(`${process.env.config.siteUrl}${path}`)
    attachClipboard();
  }, [ active ])

  return (
    <Container active={active}>
      <Wrapper>
        <Header>
          <h6>Compartilhar</h6>
          <button type="button" onClick={handleClose}>Fechar</button>
        </Header>

        <Socials>
          <SocialsButton href={`https://api.whatsapp.com/send?text=${url}`} target="_blank">
            <SVG src={WhatsappRoundedIconSVG} uniquifyIDs={true} /> Whatsapp
          </SocialsButton>
          <SocialsButton href={`http://www.facebook.com/sharer.php?u=${url}`} target="_blank">
            <SVG src={FacebookRoundedIconSVG} uniquifyIDs={true} /> Facebook
          </SocialsButton>
          <SocialsButton href={`http://twitter.com/share?text=${title}&url=${url}`} target="_blank">
            <SVG src={TwitterRoundedIconSVG} uniquifyIDs={true} /> Twitter
          </SocialsButton>
          <SocialsButton href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`} target="_blank">
            <SVG src={LinkedinRoundedIconSVG} uniquifyIDs={true} /> Linkedin
          </SocialsButton>
        </Socials>

        <Copy copied={copied}>
          {url && <input type="text" id="url" name="url" defaultValue={url} />}
          <button type="button" ref={copySubmitButton} data-clipboard-target="#url">{copied ? 'Copiado!' : `Copiar`}</button>
        </Copy>
      </Wrapper>
    </Container>
  )
}

export default Share;
