import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';

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
      finality: null,
      use: null,
      type: 'lancamento',
      src: '/forms/imovel/praiacampo-saopaulo-lancamentos.html'
    },
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
    },
    {
      source: 'sao-paulo',
      finality: 'aluguel',
      use: 'RESIDENCIAL',
      src: '/forms/imovel/locacao-saopaulo-residencial.html'
    },
    {
      source: 'internacional',
      finality: 'temporada',
      use: null,
      src: '/forms/imovel/temporada-internacional-residencial.html'
    },
    {
      source: 'praia-campo',
      finality: 'temporada',
      use: null,
      src: '/forms/imovel/temporada-praiacampo-residencial.html'
    },
    {
      source: 'internacional',
      finality: 'venda',
      use: null,
      type: 'lancamento',
      src: '/forms/imovel/venda-internacional-lancamentos.html'
    },
    {
      source: 'internacional',
      finality: 'venda',
      use: null,
      type: 'pronto',
      src: '/forms/imovel/venda-internacional-prontos.html'
    },
    {
      source: 'praia-campo',
      finality: 'venda',
      use: null,
      type: 'pronto',
      src: '/forms/imovel/venda-praiacampo-prontos.html'
    },
    {
      source: 'sao-paulo',
      finality: 'venda',
      use: 'COMERCIAL',
      type: 'lancamento',
      src: '/forms/imovel/venda-saopaulo-comercial-lancamentos.html'
    },
    {
      source: 'sao-paulo',
      finality: 'venda',
      use: 'COMERCIAL',
      type: 'pronto',
      src: '/forms/imovel/venda-saopaulo-comercial-prontos.html'
    },
    {
      source: 'sao-paulo',
      finality: 'venda',
      use: 'RESIDENCIAL',
      type: 'lancamento',
      src: '/forms/imovel/venda-saopaulo-residencial-lancamentos.html'
    },
    {
      source: 'sao-paulo',
      finality: 'venda',
      use: 'RESIDENCIAL',
      type: 'pronto',
      src: '/forms/imovel/venda-saopaulo-residencial-prontos.html'
    }
  ];

  const clickContainer = useCallback(
    event => {
      event.preventDefault();
      toggleShow();
    },
    [ show ]
  );

  const clickWrapper = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const toggleShow = useCallback(() => {
    if (!isBuilding || (isBuilding && user.logged)) {
      setShow(!show);
    } else {
      setShow(false);
      dispatch(
        setMain({
          modalLogin: router.asPath
        })
      );
    }
  }, [ show, isBuilding, user.logged ]);

  useEffect(() => {
    if (user.logged && user.me && currentBuilding) {
      const areaUseful =
        currentBuilding.infos && currentBuilding.infos.areaUseful
          ? currentBuilding.infos.areaUseful
          : null;
      const paramsObj = {
        reference: currentBuilding.reference,
        category: currentBuilding.category,
        type: currentBuilding.type,
        source: currentBuilding.source,
        region:
          currentBuilding.address && currentBuilding.address.region
            ? currentBuilding.address.region
            : null,
        local:
          currentBuilding.address && currentBuilding.address.local
            ? currentBuilding.address.local
            : null,
        areaUseful: !isNaN(areaUseful) ? parseInt(areaUseful) : areaUseful,
        bedrooms:
          currentBuilding.infos && currentBuilding.infos.bedrooms
            ? currentBuilding.infos.bedrooms
            : null,
        parking:
          currentBuilding.infos && currentBuilding.infos.parking
            ? currentBuilding.infos.parking
            : null,
        value: currentBuilding.values.sell
          ? currentBuilding.values.sell
          : currentBuilding.values.rent,
        userFirstName: user.me.name,
        userLastName: user.me.lastName,
        userPhone: user.me.phone,
        userEmail: user.me.email
      };
      const params = getParamsFromObject(paramsObj);
      let iframeSelected = null;
      let iframesPreSelected = iframes;
      const matches = [];

      if (searchFunnel) {
        iframesPreSelected = iframes.filter(
          iframe => iframe.finality === searchFunnel.finality
        );
      }

      if (iframesPreSelected.length) {
        iframesPreSelected.forEach(iframe => {
          let matchesTotal = 0;

          if (
            iframe.source &&
            iframe.source.search(currentBuilding.source) >= 0
          ) {
            matchesTotal++;

            if (iframe.type && iframe.type === currentBuilding.type) {
              matchesTotal++;
            }

            if (!searchFunnel || !searchFunnel.finality) {
              if (
                (iframe.finality === 'venda' && currentBuilding.values.sell) ||
                (iframe.finality === 'aluguel' && currentBuilding.values.rent)
              ) {
                matchesTotal++;
              } else {
                matchesTotal--;
              }
            }

            if (iframe.use && currentBuilding.infos && iframe.use === currentBuilding.infos.use) {
              matchesTotal++;
            }

            matches.push({ matchesTotal, ...iframe });
          }
        });

        iframeSelected = matches.reduce(
          (prev, current) =>
            prev.matchesTotal && prev.matchesTotal > current.matchesTotal
              ? prev
              : current,
          {}
        );

        if (iframeSelected) {
          setIframeUrl(`${iframeSelected.src}${params}`);
        }
      }
    } else {
      setIframeUrl(null);
    }

    setIsBuilding(router.route === '/imovel' ? true : false);
  }, [ router.route, user.logged, user.me, currentBuilding ]);

  useEffect(() => {
    if (refIframe.current) {
      refIframe.current.onload = function() {
        const $contents = this.contentDocument || this.contentWindow.document;

        const $btnClose = $contents.querySelector('.header__close');
        const $btnLogout = $contents.querySelector('.userinfo__btn');

        if ($btnClose) {
          $btnClose.addEventListener('click', event => {
            toggleShow();

            if ($btnClose.classList.contains('js-reset-iframe-url')) {
              refIframe.current.setAttribute('src', iframeUrl);
            }
          });
        }

        if ($btnLogout) {
          $btnLogout.addEventListener('click', event => {
            toggleShow();
            Router.push('/logout');
          });
        }
      };
    }
  }, [ refIframe, show ]);

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
                    <ButtonClose
                      type="button"
                      onClick={toggleShow}
                      isBuilding={isBuilding}
                    >
                      Fechar
                  </ButtonClose>
                    <h3>
                      <strong>Pergunte</strong>, peça um imóvel ou reclame. Pode
                    elogiar também.
                  </h3>
                  </Header>
                  <Column>
                    <p>Você pode também falar diretamente conosco:</p>
                    <List>
                      <li>
                        <ListLink
                          href="https://api.whatsapp.com/send?phone=551130743600"
                          target="_blank"
                        >
                          <i>
                            <SVG src={WhatsappIconSVG} uniquifyIDs={true} />
                          </i>
                          <span>
                            Whatsapp:
                          <br />
                            <strong>(11) 3074-3600</strong>
                          </span>
                        </ListLink>
                      </li>
                      <li>
                        <ListLink href="tel:+551130743600" target="_blank">
                          <i>
                            <SVG src={PhoneIconSVG} uniquifyIDs={true} />
                          </i>
                          <span>
                            Telefone:
                          <br />
                            <strong>(11) 3074-3600</strong>
                          </span>
                        </ListLink>
                      </li>
                      <li>
                        <ListButton type="button">
                          <i>
                            <SVG src={ChatIconSVG} uniquifyIDs={true} />
                          </i>
                          <span className="big">Fale pelo chat</span>
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
  );
}

export default ContactBar;
