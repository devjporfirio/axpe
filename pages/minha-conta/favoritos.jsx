import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Api from 'services';

// components
import Share from 'components/Share';
import Empty from 'pages/MyAccount/Empty';

// actions
import { updateUserFavorites } from 'store/modules/user/actions';

// images
import ShareIconSVG from 'assets/icons/share';
import MailIconSVG from 'assets/icons/mail';
import WhatsappIconSVG from 'assets/icons/whatsapp-orange';

// styles
import {
  Container,
  Body,
  Amount,
  ShareIcon,
  GroupIcon,
  MailIcon,
  WhatsIcon,
  BuildingItem
} from 'pages/MyAccount/Favorites/styles';
import { Title } from 'pages/MyAccount/styles';

function Favorites() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [ buildings, setBuildings ] = useState([]);
  const [ shareActive, setShareActive ] = useState(false);

  const shareOnClose = useCallback(() => {
    setShareActive(!shareActive);
  }, [ shareActive ]);

  useEffect(() => {
    async function loadBuildings() {
      if (user && user.logged && user.favorites && user.favorites.length) {
        const buildings = await Promise.all(
          user.favorites.map(async reference => {
            const response = await Api.Building.getPage(reference);
            return response.building;
          })
        );
        setBuildings(buildings);
      }
    }

    loadBuildings();
  }, [ user ]);

  useEffect(() => {
    return () => {
      dispatch(updateUserFavorites());
    };
  }, []);

  if (!user.logged) return <Container />;

  return !buildings || buildings.length <= 0 ? (
    <Container>
      <Body>
        <Empty
          title="Você ainda não tem nenhum imóvel favorito"
          subtitle="Para favoritar um imóvel, faça uma busca e clique nos ícones de
              coração em cada imóvel."
        />
      </Body>
    </Container>
  ) : (
    <Container>
      <Body>
        <Amount>
          <Title>
            Você tem <strong>{buildings.length} imóveis</strong> favoritos
          </Title>
          <ShareIcon src={ShareIconSVG} onClick={() => setShareActive(true)} />
          <GroupIcon>
            <MailIcon src={MailIconSVG} />
            <WhatsIcon src={WhatsappIconSVG} />
          </GroupIcon>
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
              key={`building-${buildingIndex}-${building.reference}`}
            />
          ))}
      </Body>
    </Container>
  );
}

export default Favorites;
