import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

// components
import BlockHighlighted from 'components/BlockHighlighted';
import Contact from 'components/Contact';

// actions
import { setMain } from 'store/modules/main/actions';

// helpers
import SeoData from 'helpers/seo';

// styles
import { Container, List, Item, Gradient } from 'pages/RegisterProperty/styles';

const PROPERTY_TYPES = [
  { to: 'Residencial', label: 'Residencial em São Paulo' },
  { to: 'Comercial', label: 'Comercial em São Paulo' },
  { to: 'Praia', label: 'Praia' },
  { to: 'Campo', label: 'Campo' },
  { to: 'Internacional', label: 'Internacional' }
];

function RegisterProperty() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const router = useRouter();

  useEffect(() => {
    function loadUser() {
      if (user && user.logged) {
        dispatch(setMain({ modalLogin: false }));
      } else {
        dispatch(setMain({ modalLogin: router.pathname }));
      }
    }

    loadUser();
  }, [ user ]);

  return user && user.logged ? (
    <>
      <Head>
        <title>{`Cadastre seu imóvel - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        <BlockHighlighted type="registerPropertyWhite" />

        <List>
          {PROPERTY_TYPES.map(type => (
            <Link key={`register-type-${type.to}`} href={`/cadastrar/[type]`} as={`/cadastrar/${type.to}`} passHref>
              <Item background={type.to.toLowerCase()}>
                <Gradient />
                <p>{type.label}</p>
              </Item>
            </Link>
          ))}
        </List>

        <BlockHighlighted type="registerPropertyTransform" />
        <Contact />
      </Container>
    </>
  ) : null;
}

export default RegisterProperty;
