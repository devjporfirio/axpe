import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/router';

// actions
import { setMain } from 'store/modules/main/actions';

// helpers
import { getParamsFromObject } from 'helpers/utils';

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
  Column,
  List,
  ListLink,
  ListButton
} from './styles';

function ContactBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const refIframe = useRef(null);
  const { currentBuilding, searchFunnel } = useSelector(state => state.main);
  const user = useSelector(state => state.user);
  const [ isBuilding, setIsBuilding ] = useState(false);
  const [ show, setShow ] = useState(false);
  const [ iframeUrl, setIframeUrl ] = useState(null);
  const iframes = [
    {
      source: 'praia-campo',
      finality: 'aluguel',
      use: 'RESIDENCIAL',
      src: '/forms/imovel/locacao-praiacampo-residencial.html'
    },
    {
      source: 'sao-paulo',
      finality: 'aluguel',
      use: 'COMERCIAL',
      src: '/forms/imovel/locacao-saopaulo-comercial.html'
    }
  ];

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
    if(user.logged && currentBuilding) {
      const paramsObj = {
        reference: currentBuilding.reference,
        category: currentBuilding.category,
        type: currentBuilding.type,
        source: currentBuilding.source,
        region: currentBuilding.address.region,
        local: currentBuilding.address.local,
        areaUseful: currentBuilding.infos.areaUseful,
        bedrooms: currentBuilding.infos.bedrooms,
        parking: currentBuilding.infos.parking,
        value: currentBuilding.values.sell,
        userFirstName: user.me.name,
        userLastName: user.me.lastName,
        userPhone: user.me.phone,
        userEmail: user.me.email,
      };
      const params = getParamsFromObject(paramsObj);
      let iframeSelected = null;

      if(searchFunnel) {
        iframes.forEach(iframe => {
          if(searchFunnel.finality === iframe.finality &&
            currentBuilding.infos.use === iframe.use &&
            iframe.source.search(currentBuilding.source) >= 0) {
            iframeSelected = iframe;
          }
        });
        if(iframeSelected) {
          setIframeUrl(`${iframeSelected.src}${params}`);
        }
      }
    } else {
      setIframeUrl(null);
    }

    setIsBuilding(router.route === '/building/[reference]' ? true : false);
  }, [ router.route, user.logged ]);


  // useEffect(() => {
  //   if(refIframe.current) {
  //     console.log(refIframe);
  //   }
  // }, [ refIframe.current ])

  return (
    <>
      <ButtonFloat type="button" onClick={toggleShow}>
        Abrir contato
        <SVG src={ChatIconSVG} uniquifyIDs={true} />
      </ButtonFloat>
      {show && (
        <Container onClick={clickContainer}>
          <Wrapper onClick={clickWrapper}>
            {isBuilding && iframeUrl ? (
              <Iframe
                ref={refIframe}
                src={iframeUrl}
                border="none"
                frameBorder="0"
                title={router.asPath}
              ></Iframe>
            ) : (
              <>
                <Header isBuilding={isBuilding}>
                  <ButtonClose type="button" onClick={toggleShow} isBuilding={isBuilding}>Fechar</ButtonClose>
                  <h3><strong>Pergunte</strong>, peça um imóvel ou reclame. Pode elogiar também.</h3>
                </Header>
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
              </>
            )}
          </Wrapper>
        </Container>
      )}
    </>
  )
}

export default ContactBar
