import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import Api from 'services';
import SVG from 'react-inlinesvg';

// helpers
import SeoData from 'helpers/seo';

// components
import Share from 'components/Share';
import Empty from 'pages/MyAccount/Empty';

// actions
import { updateUserFavorites } from 'store/modules/user/actions';

// images
import ShareIconSVG from 'assets/icons/share';
// import MailIconSVG from 'assets/icons/mail';
// import WhatsappIconSVG from 'assets/icons/whatsapp-orange';

// styles
import {
  Container,
  Body,
  Amount,
  ButtonShare,
  // GroupIcon,
  // MailIcon,
  // WhatsIcon,
  BuildingItem
} from 'pages/MyAccount/Favorites/styles';
import { Title } from 'pages/MyAccount/styles';

function Favorites() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [ loaded, setLoaded ] = useState(false);
  const [ buildings, setBuildings ] = useState([]);
  const [ shareActive, setShareActive ] = useState(false);

  const shareOnClose = useCallback(() => {
    setShareActive(!shareActive);
  }, [ shareActive ]);

  useEffect(() => {
    async function loadBuildings() {
      if (user && user.logged && user.favorites && user.favorites.length) {
        const userFavorites = user.favorites.filter(fav => fav ? true : false);

        let tempBuildings = await Promise.all(
          userFavorites.map(async reference => {
            const response = await Api.Building.getPage(reference);
            return response.building;
          })
        );

        tempBuildings = tempBuildings.filter(item => item ? true : false);

        setBuildings(tempBuildings);
      } else {
        setBuildings([]);
      }

      setLoaded(true);
    }

    loadBuildings();
  }, [ user ]);

  useEffect(() => {
    return () => {
      dispatch(updateUserFavorites());
    };
  }, []);

  if (!user.logged || !loaded) return <Container />;

  return (
    <>
      <Head>
        <title>{`Favoritos | Minha Conta - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      {!buildings || !buildings.length ? (
        <Container>
          <Body>
            <Empty
              title="Você ainda não tem nenhum imóvel favorito"
              subtitle="Para favoritar um imóvel, faça uma busca e clique nos ícones de coração em cada imóvel."
            />
          </Body>
        </Container>
      ) : (
        <Container>
          <Body>
            <Amount>
              <Title>
                Você curtiu <strong>{buildings.length} imóveis</strong>
              </Title>
              <ButtonShare
                onClick={() => setShareActive(true)}
                className="holos-account-favorite-share"
              >
                <SVG src={ShareIconSVG} uniquifyIDs={true} />
              </ButtonShare>
              {/* <GroupIcon>
                <MailIcon src={MailIconSVG} />
                <WhatsIcon src={WhatsappIconSVG} />
              </GroupIcon> */}
            </Amount>
            <Share
              active={shareActive}
              path={`/favoritos/${user.me.hash}`}
              title={`Axpe - Resultado de Busca`}
              onClose={shareOnClose}
            />
            {buildings &&
              buildings.length > 0 &&
              buildings.map((building, buildingIndex) => (
                <BuildingItem
                  useBtRemove
                  useBtSchedule
                  item={building}
                  page="favorites"
                  positionIndex={buildingIndex + 1}
                  key={`building-${buildingIndex}-${building.reference}`}
                />
              ))}
          </Body>
        </Container>
      )}
    </>
  );
}

export default Favorites;
