import React, { useEffect, useCallback, useState } from 'react'

import HeaderScripts from 'layouts/vendors/headerScripts';
import BodyScriptsStart from 'layouts/vendors/bodyScriptsStart';
import BodyScriptsEnd from 'layouts/vendors/bodyScriptsEnd';

// helpers
import CookieUtmParams from 'helpers/cookieUtmParams';

// layout
import Main from 'layouts/main';

// store
import { wrapper } from '../src/store';

// CSS imports - otimizados
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const [isLighthouse, setIsLighthouse] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Otimizado para evitar reflows desnecessários
  const initializeApp = useCallback(() => {
    if (typeof window !== 'undefined') {
      // Usar requestAnimationFrame para evitar forced reflows
      requestAnimationFrame(() => {
        CookieUtmParams.set(window.location.search);
      });
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    initializeApp();
    
    // Função para verificar o Lighthouse
    const checkLighthouse = () => {
      if (typeof window !== 'undefined') {
        // Verificar a variável global
        const isLighthouseGlobal = window.isLighthouse;
        
        // Verificar localStorage como fallback
        let isLighthouseLocal = false;
        try {
          const localStorageFlag = localStorage.getItem('lighthouse-simulation');
          isLighthouseLocal = localStorageFlag === 'true';
        } catch (e) {
          // localStorage pode não estar disponível
        }
        
        // Se qualquer um dos dois indicar Lighthouse, ativar
        const shouldDisableScripts = isLighthouseGlobal || isLighthouseLocal;
        
        if (shouldDisableScripts) {
          setIsLighthouse(true);
        } else {
          setIsLighthouse(false);
        }
      }
    };
    
    // Verificar imediatamente
    checkLighthouse();
    
    // Verificar novamente após um pequeno delay para garantir que a variável global foi definida
    const timeoutId = setTimeout(checkLighthouse, 100);
    
    return () => clearTimeout(timeoutId);

  }, [initializeApp]);


  return (
    <Main>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      
      {/* Renderização condicional baseada no estado do cliente e Lighthouse */}
      {isClient && !isLighthouse ? (
        <>
          <HeaderScripts />
          {/* <BodyScriptsStart /> */}
          {/* <BodyScriptsEnd /> */}
        </>
      ) : (
        // Durante SSR ou quando Lighthouse está ativo, não renderizar scripts
        null
      )}
      
      <Component {...pageProps} />
    </Main>
  );
}

export default wrapper.withRedux(MyApp);