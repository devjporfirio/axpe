import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/router';

// actions
import { setMain } from 'store/modules/main/actions';

// components
import InfoUser from 'components/InfoUser';

// assets
import WhatsappIconSVG from 'assets/icons/whats-white-trans';
import PhoneIconSVG from 'assets/icons/phone';
import ChatIconSVG from 'assets/icons/chat';

// styles
import {
  Container,
  Wrapper,
  ButtonFloat,
  Header,
  ButtonClose,
  Iframe,
  IframeContainer,
  Column,
  List,
  ListLink,
  ListButton
} from './styles';

function ContactBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [ isBuilding, setIsBuilding ] = useState(false);
  const [ show, setShow ] = useState(false);

  const clickContainer = useCallback((event) => {
    event.preventDefault();
    toggleShow();
  }, [ show ]);

  const clickWrapper = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const toggleShow = useCallback(() => {
    if(!isBuilding || (isBuilding && user.logged)) {
      setShow(!show);
    } else {
      setShow(false);
      dispatch(setMain({
        modalLogin: router.asPath
      }));
    }
  }, [ show, isBuilding, user.logged ]);

  useEffect(() => {
    setIsBuilding(router.route === '/building/[reference]' ? true : false);
  }, [ router.route ]);

  return (
    <>
      <ButtonFloat type="button" onClick={toggleShow}>
        Abrir contato
        <SVG src={ChatIconSVG} uniquifyIDs={true} />
      </ButtonFloat>
      {show && (
        <Container onClick={clickContainer}>
          <Wrapper onClick={clickWrapper}>
            {isBuilding ? (
              <>
                <Header isBuilding={isBuilding}>
                  <ButtonClose type="button" onClick={toggleShow} isBuilding={isBuilding}>Fechar</ButtonClose>
                  <h3>Quer mais informações sobre este imóvel?</h3>
                </Header>
                <IframeContainer>
                  <Iframe src="/forms/imovel/index.html" border="none" frameBorder="0" title={router.asPath}></Iframe>
                  <InfoUser />
                </IframeContainer>
              </>
            ) : (
              <Header isBuilding={isBuilding}>
                <ButtonClose type="button" onClick={toggleShow} isBuilding={isBuilding}>Fechar</ButtonClose>
                <h3><strong>Pergunte</strong>, peça um imóvel ou reclame. Pode elogiar também.</h3>
              </Header>
            )}
            <Column>
              <p>Você pode também falar diretamente conosco:</p>
              <List>
                <li>
                  <ListLink href="https://api.whatsapp.com/send?phone=5511999998888" target="_blank">
                    <i>
                      <SVG src={WhatsappIconSVG} uniquifyIDs={true} />
                    </i>
                    <span>
                      Whatsapp:<br/>
                      <strong>(11) 99999-8888</strong>
                    </span>
                  </ListLink>
                </li>
                <li>
                  <ListLink href="tel:+5511999998889" target="_blank">
                    <i>
                      <SVG src={PhoneIconSVG} uniquifyIDs={true} />
                    </i>
                    <span>
                      Telefone:<br/>
                      <strong>(11) 99999-8888</strong>
                    </span>
                  </ListLink>
                </li>
                <li>
                  <ListButton type="button">
                    <i>
                      <SVG src={ChatIconSVG} uniquifyIDs={true} />
                    </i>
                    <span className="big">Chat</span>
                  </ListButton>
                </li>
              </List>
            </Column>
          </Wrapper>
        </Container>
      )}
    </>
  )
}

export default ContactBar
