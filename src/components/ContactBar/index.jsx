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
import ChatIconSVG from 'assets/icons/chat.svg';
import WhatsappWhiteIconSVG from 'assets/icons/whatsapp-white-icon.svg'

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
  ButtonQuickCall,
  FormGroupName,
  // ListButton
} from './styles';

const registrySchema = Yup.object().shape({
  Name_First: Yup.string().required('Informe seu nome'),
  Name_Last: Yup.string().required('Informe seu sobrenome'),
  Email: Yup.string().email().required('Informe um email válido'),
  PhoneNumber: Yup.string().required('Informe seu Whatsapp'),
  SingleLine11: Yup.string().required('Deixe sua mensagem'),
});

const formSuccessPageUrl = `${process.env.config.siteUrl}/forms/imovel/sucesso.html`;

function ContactBar() {
  const [ isMounted, setIsMounted ] = useState(false);
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
      values,
      isSubmitting,
      touched,
      errors,
      handleChange,
      setTouched,
      validateForm
    } = useFormik({
      initialValues: {
       Name_First: '',
       Name_Last: '',
       Email: '',
       PhoneNumber: '',
       SingleLine11: '',
      },
      validationSchema: registrySchema,
      onSubmit: (values, { setSubmitting }) => {
        setSubmitting(false);
      },
    });

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    const url = `https://wa.me/551130743600?text=Olá, vim através do site, gostaria de falar com um corretor!`;
        
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

        if (iframeSelected && iframeSelected.src) {
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
      router.pathname.startsWith('/[category]/[slug]') || (contactBarActive && contactBarForced)
        ? true
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
  
  if(isBuilding && currentBuilding) {
    message = message.replace('{reference}', currentBuilding.reference);
    message = message.replace('{areaTotal}', currentBuilding.infos.areaTotal ? ', com ' + currentBuilding.infos.areaTotal +' m²': '');
    message = message.replace('{areaUseful}', currentBuilding.infos.areaUsefulStart ? ', com ' +  currentBuilding.infos.areaUsefulStart + ' m²' : '');
    message = message.replace('{bedrooms}', currentBuilding.infos.bedrooms ? ', ' + currentBuilding.infos.bedrooms + (parseInt(currentBuilding.infos.bedrooms) > 1 ? ' quartos' : ' quarto') : '');
    message = message.replace('{parking}', currentBuilding.infos.parking ? ' e ' + currentBuilding.infos.parking + (parseInt(currentBuilding.infos.parking) > 1 ? ' vagas' : ' vaga') : '');
  }

  if (!isMounted) {
    return null;
  }

  return (
    <>
    {!isBuilding && (
      <>
        <LinkFloat
          className='holos-contact-float moreinfo-btn--whatsapp hidden'
          href={!isBuilding ? `https://wa.me/551130743600` : `https://wa.me/551130743600?text=${message}`}
          target='_blank'>
          <SVG src={WhatsappWhiteIconSVG} aria-hidden="true"/>
          {isBuilding ? (
            <div>
              <span>Quer saber mais?</span>
              Fale com um corretor.
            </div>
          ) : (
            <div>Fale com um corretor</div>
          )}
        </LinkFloat>

        {/* Botão Mobile*/}
        <ButtonFloat
          className='holos-contact-float moreinfo-btn--whatsapp flex large:hidden'
          type='button'
          onClick={toggleShow}
          aria-label='Fale com um corretor'
        >
          <SVG src={WhatsappWhiteIconSVG} aria-hidden="true"/>
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
          aria-label='Fale com um corretor'
        >
          <SVG src={ChatIconSVG} aria-hidden="true"/>
          {isBuilding ? (
            <div>
              <span>Quer saber mais?</span>
              Fale com um corretor.
            </div>
          ) : (
            <div>Fale com um corretor</div>
          )}
        </ButtonFloat>
      </>
    )}

      {contactBarActive && (
        <Container onClick={clickContainer} data-type='container'>
          <Wrapper isHome={router.route === '/'}>
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
                  >
                    <input type="hidden" name="zf_referrer_name" value="Form Contato Home" />
                    <input
                      type="hidden"
                      name="zf_redirect_url"
                      value={formSuccessPageUrl}
                    />
                    <input type="hidden" name="zc_gad" value="" />
                    <input type="checkbox" name="DecisionBox" defaultChecked hidden />

                    <FormGroup>
                      <FormGroupBasics>
                        <FormGroupName>
                          <FormElements
                            name='Name_First'
                            placeholder='Nome'
                            onChange={handleChange}
                            error={touched.Name_First && errors.Name_First}
                            value={values.Name_First}
                            elname="First"
                            className='holos-form-field'
                            data-label='Nome'
                          />

                          <FormElements
                            name="Name_Last"
                            placeholder="Sobrenome"
                            value={values.Name_Last}
                            error={touched.Name_Last && errors.Name_Last}
                            onChange={handleChange}
                            elname="Last"
                            className='holos-form-field'
                            data-label='Sobrenome'
                          />
                        </FormGroupName>
                     
                        <FormElements
                          type='email'
                          name='Email'
                          placeholder='Seu E-mail'
                          onChange={handleChange}
                          error={touched.Email && errors.Email}
                          value={values.Email}
                          className='holos-form-field'
                          data-label='E-mail pessoal'
                        />
                        <FormElements
                          type='number'
                          name='PhoneNumber'
                          placeholder='Seu Whatsapp'
                          onChange={handleChange}
                          error={touched.PhoneNumber && errors.PhoneNumber}
                          value={values.PhoneNumber}
                          className='holos-form-field'
                          data-label='Whatsapp'
                        />
                        <FormElements
                          type='area'
                          name='SingleLine11'
                          placeholder='Deixe sua mensagem'
                          onChange={handleChange}
                          error={touched.SingleLine11 && errors.SingleLine11}
                          value={values.SingleLine11}
                          className='holos-form-field'
                          data-label='Mensagem sobre imóvel'
                        />
                       </FormGroupBasics>
                    </FormGroup>
                    <ButtonSubmit
                      type="button"
                      disabled={isSubmitting}
                      className="contact-form-submit"
                      onClick={async () => {
                        const formErrors = await validateForm();
                        const hasErrors = Object.keys(formErrors).length > 0;

                        setTouched({
                          Name_First: true,
                          Name_Last: true,
                          Email: true,
                          PhoneNumber: true,
                          SingleLine11: true,
                        });

                        if (!hasErrors && refForm.current) {
                          refForm.current.submit();
                        }
                      }}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar formulário'}
                    </ButtonSubmit>
                      <button className='contact-whatsapp-button-green' disabled={isSubmitting} onClick={handleWhatsapp}>
                        Whatsapp  <strong>(11) 3074-3600</strong>
                      </button>
                      <ButtonQuickCall>
                        <a href="tel:+551130743600" target="_blank" class="moreinfo-btn holos-product-contact-method" data-label="Telefone">
                            Telefone: <strong>(11) 3074-3600</strong>
                        </a>
                      </ButtonQuickCall>
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
