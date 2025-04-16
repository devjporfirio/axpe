import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router, { useRouter } from 'next/router';
import FormElements from 'components/FormElements';
import { FormGroup } from 'components/FormElements/styles';
import SVG from 'react-inlinesvg';

// actions
import { setMain } from 'store/modules/main/actions';

// helpers
import { getParamsFromObject } from 'helpers/utils';

// assets
import ChatIconSVG from 'assets/icons/chat';
import WhatsappWhiteIconSVG from 'assets/icons/whatsapp-white-icon'

// styles
import {
  Container,
  Wrapper,
  LinkFloat,
  ButtonFloat,
  Form,
  FormGroupBasics,
  ButtonSubmit,
  Header,
  ButtonClose,
  Iframe,
  Column,
  // ListButton
} from './styles';

const registrySchema = Yup.object().shape({
  name: Yup.string().required(),
  whatsapp: Yup.number().required(),
  email: Yup.string()
    .email()
    .required(),
  message: Yup.string().required(),
});

function ContactBar() {
  const router = useRouter();
  const refForm = useRef(null);
  const dispatch = useDispatch();
  const refIframe = useRef(null);
  const {
    currentBuilding,
    contactBarActive,
    contactBarForced,
    searchFunnel,
  } = useSelector((state) => state.main);
  const [ isBuilding, setIsBuilding ] = useState(false);
  const [ iframeUrl, setIframeUrl ] = useState(null);
  const {
      handleSubmit,
      values,
      isSubmitting,
      touched,
      errors,
      handleChange,
    } = useFormik({
      initialValues: {
       name: '',
       email: '',
       whatsapp: '',
       message: '',
      },
      validationSchema: registrySchema,
      onSubmit: async (values) => {
      },
    });
  const iframes = [
    {
      source: 'praia-campo',
      finality: null,
      use: null,
      type: 'lancamento',
      src: '/forms/imovel/praiacampo-saopaulo-lancamentos.html',
    },
    {
      source: 'praia-campo',
      finality: 'aluguel',
      use: 'RESIDENCIAL',
      src: '/forms/imovel/locacao-praiacampo-residencial.html',
    },
    {
      source: 'sao-paulo',
      finality: 'aluguel',
      use: 'COMERCIAL',
      src: '/forms/imovel/locacao-saopaulo-comercial.html',
    },
    {
      source: 'sao-paulo',
      finality: 'aluguel',
      use: 'RESIDENCIAL',
      src: '/forms/imovel/locacao-saopaulo-residencial.html',
    },
    {
      source: 'internacional',
      finality: 'temporada',
      use: null,
      src: '/forms/imovel/temporada-internacional-residencial.html',
    },
    {
      source: 'praia-campo',
      finality: 'temporada',
      use: null,
      src: '/forms/imovel/temporada-praiacampo-residencial.html',
    },
    {
      source: 'internacional',
      finality: 'venda',
      use: null,
      type: 'lancamento',
      src: '/forms/imovel/venda-internacional-lancamentos.html',
    },
    {
      source: 'internacional',
      finality: 'venda',
      use: null,
      type: 'pronto',
      src: '/forms/imovel/venda-internacional-prontos.html',
    },
    {
      source: 'praia-campo',
      finality: 'venda',
      use: null,
      type: 'pronto',
      src: '/forms/imovel/venda-praiacampo-prontos.html',
    },
    {
      source: 'sao-paulo',
      finality: 'venda',
      use: 'COMERCIAL',
      type: 'lancamento',
      src: '/forms/imovel/venda-saopaulo-comercial-lancamentos.html',
    },
    {
      source: 'sao-paulo',
      finality: 'venda',
      use: 'COMERCIAL',
      type: 'pronto',
      src: '/forms/imovel/venda-saopaulo-comercial-prontos.html',
    },
    {
      source: 'sao-paulo',
      finality: 'venda',
      use: 'RESIDENCIAL',
      type: 'lancamento',
      src: '/forms/imovel/venda-saopaulo-residencial-lancamentos.html',
    },
    {
      source: 'sao-paulo',
      finality: 'venda',
      use: 'RESIDENCIAL',
      type: 'pronto',
      src: '/forms/imovel/venda-saopaulo-residencial-prontos.html',
    },
  ];

  const handleWhatsapp = () => {
    const url = `https://wa.me/551130743600?text=Olá, vim através do site, gostaria de falar com um corretor, meu nome é ${values.name}, ${values.message}`;
        
    window.open(url, '_blank');
  }

  const clickContainer = useCallback(
    (event) => {
      const type = event.target.getAttribute('data-type');
      if (type && type == 'container') {
        event.preventDefault();
        toggleShow();
      }
    },
    [ contactBarActive ]
  );

  const toggleShow = () => {
    dispatch(
      setMain({
        contactBarActive: !contactBarActive,
        contactBarForced: false,
      })
    );
  };

  useEffect(() => {
    if (currentBuilding) {
      let params = null;
      const areaUseful = !currentBuilding.infos
        ? null
        : currentBuilding.infos.areaTotal
        ? currentBuilding.infos.areaTotal
        : currentBuilding.infos.areaUsefulStart;
      const paramsObj = {
        type: currentBuilding.type,
        reference: currentBuilding.reference,
        category: currentBuilding.category,
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
        bedrooms: !currentBuilding.infos
          ? null
          : currentBuilding.infos.bedrooms
          ? currentBuilding.infos.bedrooms
          : currentBuilding.infos.bedroomsStart,
        parking: !currentBuilding.infos
          ? null
          : currentBuilding.infos.parking
          ? currentBuilding.infos.parking
          : currentBuilding.infos.parkingStart,
        value: null,
        url: location.href,
        redirectUrl: `${process.env.config.siteUrl}/forms/imovel/sucesso.html`,
      };
      let iframeSelected = null;
      let iframesPreSelected = iframes;
      const matches = [];

      if (searchFunnel) {
        iframesPreSelected = iframes.filter(
          (iframe) => iframe.finality === searchFunnel.finality
        );
      }

      if (iframesPreSelected.length) {
        iframesPreSelected.forEach((iframe) => {
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

            if (
              iframe.use &&
              currentBuilding.infos &&
              iframe.use === currentBuilding.infos.use
            ) {
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
          if (iframeSelected.src.search('locacao') >= 0) {
            paramsObj.value = currentBuilding.values.rent;
          } else if (iframeSelected.src.search('lancamento') >= 0) {
            paramsObj.value = currentBuilding.values.release;
          } else {
            paramsObj.value = currentBuilding.values.sell;
          }

          params = getParamsFromObject(paramsObj);
          setIframeUrl(
            `${process.env.config.siteUrl}${iframeSelected.src}${params}`
          );
        }
      }
    } else {
      setIframeUrl(null);
    }

    setIsBuilding(
      router.route === '/imovel' || (contactBarActive && contactBarForced)
        ? false // Modal fale com corretor se torna o mesmo da home (v0)
        : false
    );
  }, [ router.route, contactBarActive, currentBuilding ]);

  useEffect(() => {
    if (refIframe.current && iframeUrl) {
      refIframe.current.onload = function() {
        const $iframe = this.contentWindow || this.contentDocument;

        if ($iframe.document) {
          const $contents = $iframe.document;

          const $btnClose = $contents.querySelector('.header__close');
          const $btnLogout = $contents.querySelector('.userinfo__btn');

          if ($btnClose) {
            $btnClose.addEventListener('click', (event) => {
              toggleShow();

              if (
                $btnClose.classList.contains('js-reset-iframe-url') &&
                refIframe.current
              ) {
                refIframe.current.setAttribute('src', iframeUrl);
              }
            });
          }

          if ($btnLogout) {
            $btnLogout.addEventListener('click', (event) => {
              toggleShow();
              Router.push('/logout');
            });
          }
        }
      };
    }
  }, [ refIframe.current, iframeUrl, contactBarActive ]);

  const pageUrl = 'http://www.axpe.com.br'+router.asPath;
  
  let message = `Olá, gostaria de saber mais sobre o imóvel {reference}{areaTotal}{areaUseful}{bedrooms}{parking}. `+ pageUrl;
  
  if(isBuilding) {
    message = message.replace('{reference}', currentBuilding.reference);
    message = message.replace('{areaTotal}', currentBuilding.infos.areaTotal ? ', com ' + currentBuilding.infos.areaTotal +' m²': '');
    message = message.replace('{areaUseful}', currentBuilding.infos.areaUsefulStart ? ', com ' +  currentBuilding.infos.areaUsefulStart + ' m²' : '');
    message = message.replace('{bedrooms}', currentBuilding.infos.bedrooms ? ', ' + currentBuilding.infos.bedrooms + (parseInt(currentBuilding.infos.bedrooms) > 1 ? ' quartos' : ' quarto') : '');
    message = message.replace('{parking}', currentBuilding.infos.parking ? ' e ' + currentBuilding.infos.parking + (parseInt(currentBuilding.infos.parking) > 1 ? ' vagas' : ' vaga') : '');
  }
  
  return (
    <>
      <LinkFloat
        className='holos-contact-float moreinfo-btn--whatsapp hidden'
        href={!isBuilding ? `https://wa.me/551130743600` : `https://wa.me/551130743600?text=${message}`}
        target='_blank'>
        <SVG src={WhatsappWhiteIconSVG} />
        {isBuilding ? (
          <div>
            <span>Quer saber mais?</span>
            Fale com um corretor.
          </div>
        ) : (
          <div>Fale com um corretor</div>
        )}
      </LinkFloat>{/* Botão MObile */}

       {/* Botão Mobile*/}
       <ButtonFloat
        className='holos-contact-float moreinfo-btn--whatsapp flex large:hidden'
        type='button'
        onClick={toggleShow}
      >
        <SVG src={WhatsappWhiteIconSVG} />
        {isBuilding ? (
          <div>
            <span>Quer saber mais?</span>
            Fale com um corretor.
          </div>
        ) : (
          <div>Fale com um corretor</div>
        )}
      </ButtonFloat>
      
      {/* Botão Dekstop*/}
      <ButtonFloat
        className='holos-contact-float hidden large:flex'
        type='button'
        onClick={toggleShow}
      >
        <SVG src={ChatIconSVG} />
        {isBuilding ? (
          <div>
            <span>Quer saber mais?</span>
            Fale com um corretor.
          </div>
        ) : (
          <div>Fale com um corretor</div>
        )}
      </ButtonFloat>

      {contactBarActive && (
        <Container onClick={clickContainer} data-type='container'>
          <Wrapper isHome={true}>
            {isBuilding && iframeUrl ? (
              <Iframe
                ref={refIframe}
                src={iframeUrl}
                border='none'
                frameBorder='0'
                title={router.asPath}
              ></Iframe>
            ) : (
              <>
                <Header isBuilding={isBuilding}>
                  <ButtonClose
                    type='button'
                    onClick={toggleShow}
                    isBuilding={isBuilding}
                    className='holos-modal-close'
                    data-type={
                      router.route === '/imovel'
                        ? `Produto - Contato`
                        : `Contato`
                    }
                  >
                    Fechar
                  </ButtonClose>
                  <h3>
                    Quer vender, comprar ou alugar um imóvel?
                  </h3>
                </Header>
                <Column>
                  <p>Deixe seu contato para nosso time entrar em contato com você.</p>
                  <Form
                    ref={refForm}
                    action='https://forms.zohopublic.com/axpeimoveis1/form/SITECADASTROGERAL/formperma/kS1k-h1kXXOhkZbL-r5ZJvV0cpaVSWVg-cm5AoLytbg/htmlRecords/submit'
                    method='POST'
                    accept-charset='UTF-8'
                    enctype='multipart/form-data'
                    onSubmit={handleSubmit}
                  >
                    <FormGroup>
                      <FormGroupBasics>
                        <FormElements
                          name='name'
                          placeholder='Nome e Sobrenome'
                          onChange={handleChange}
                          error={touched.name && errors.name}
                          value={values.name}
                          className='holos-form-field'
                          data-label='Nome e Sobrenome'
                          data-type='Trabalhe Conosco'
                        />
                        <FormElements
                          type='emailmask'
                          name='email'
                          placeholder='Seu E-mail'
                          onChange={handleChange}
                          error={touched.email && errors.email}
                          value={values.email}
                          className='holos-form-field'
                          data-label='E-mail pessoal'
                          data-type='Trabalhe Conosco'
                        />
                        <FormElements
                          type='number'
                          name='whatsapp'
                          placeholder='Seu Whatsapp'
                          onChange={handleChange}
                          error={touched.whatsapp && errors.whatsapp}
                          value={values.whatsapp}
                          className='holos-form-field'
                          data-label='Whatsapp'
                          data-type='Trabalhe Conosco'
                        />
                        <FormElements
                          type='area'
                          name='message'
                          placeholder='Deixe sua mensagem'
                          onChange={handleChange}
                          error={touched.message && errors.message}
                          value={values.message}
                          className='holos-form-field'
                          data-label='Experiências anteriores na area comercial de empresas'
                          data-type='Trabalhe Conosco'
                        />
                      </FormGroupBasics>
                    </FormGroup>
                      <ButtonSubmit
                        disabled={isSubmitting}
                        type='submit'
                        className='contact-form-submit'
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar formulário'}
                      </ButtonSubmit>
                      <button className='contact-whatsapp-button-green' disabled={isSubmitting} onClick={handleWhatsapp}>
                        Whatsapp  <strong>(11) 3074-3600</strong>
                      </button>
                  </Form>
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
