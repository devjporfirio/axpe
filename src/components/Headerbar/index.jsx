import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';

// store
import { setMain } from 'store/modules/main/actions'

// components
import Share from 'components/Share';

// helpers
import useScrollPosition from 'helpers/scroll-position';

// assets
import AlertIconSVG from 'assets/icons/alert';
import ShareIconSVG from 'assets/icons/share';

// styles
import {
  Container,
  Wrapper,
  Column,
  ButtonBack,
  ButtonIcon,
  ButtonContact
} from './styles';

function Headerbar({ type, title, subtitle }) {
  const refEl = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const scrollPosition = useScrollPosition();
  const { searchFormActive } = useSelector(state => state.main);
  const [ shareActive, setShareActive ] = useState(false);

  const toggleShare = useCallback(() => {
    setShareActive(!shareActive)
  }, [ shareActive ]);

  const shareOnClose = useCallback(() => {
    setShareActive(!shareActive)
  }, [ shareActive ]);

  const toggleSearch = useCallback(() => {
    dispatch(setMain({ searchFormActive: !searchFormActive }))
  }, [ searchFormActive ]);

  const handleScrollPosition = ([ curTop, oldTop ]) => {
    const startTopHeaderbar = window.innerWidth < 768 ? 70 : 0;

    if(!refEl || !refEl.current) return false;

    if(!startTopHeaderbar) {
      refEl.current.style.top = `0px`;
      return false;
    }

    let topHeaderbar = curTop > oldTop ? startTopHeaderbar - curTop : startTopHeaderbar;

    if(topHeaderbar < 0) {
      topHeaderbar = 0;
    } else if(topHeaderbar > startTopHeaderbar) {
      topHeaderbar = startTopHeaderbar;
    }

    refEl.current.style.top = `${topHeaderbar}px`;
  };

  useEffect(() => {
    handleScrollPosition(scrollPosition);
  }, scrollPosition);

  useEffect(() => {
    dispatch(setMain({ headerHiding: true }));
  }, []);

  return (
    <>
      <Container type={type}>
        <Wrapper ref={refEl}>
          <ButtonBack type="button" onClick={toggleSearch}>Voltar</ButtonBack>

          {title && (
            <h2 dangerouslySetInnerHTML={{ __html: title }} />
          )}

          {subtitle && (
            <h3 dangerouslySetInnerHTML={{ __html: subtitle }} />
          )}

          <Column>
            <ButtonIcon type="button">
              <SVG src={AlertIconSVG} uniquifyIDs={true} />
            </ButtonIcon>
            <ButtonIcon type="button" onClick={toggleShare}>
              <SVG src={ShareIconSVG} uniquifyIDs={true} />
            </ButtonIcon>
            <ButtonContact type="button" size="small">Fale conosco</ButtonContact>
          </Column>
        </Wrapper>
      </Container>
      <Share active={shareActive} path={router.asPath} title={`Axpe - Resultado de Busca`} onClose={shareOnClose} />
    </>
  )
}

Headerbar.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default Headerbar
