import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Api from 'services';

import Empty from 'pages/MyAccount/Empty';

// images
import IShare from 'assets/icons/share';
import IMail from 'assets/icons/mail';
import IWhats from 'assets/icons/whatsapp-orange';

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

function Favorites() {
  const user = useSelector(state => state.user);
  const [ buildings, setBuildings ] = useState([]);

  useEffect(() => {
    async function loadBuildings() {
      if (user && user.logged) {
        const buildings = await Api.MyAccount.getFavorites(user.access_token);
        setBuildings(buildings);
      }
    }

    loadBuildings();
  }, [ user ]);

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
          <h4>
            Existem <strong>{buildings.length} imóveis</strong> favoritos por
            você
          </h4>
          <ShareIcon src={IShare} />
          <GroupIcon>
            <MailIcon src={IMail} />
            <WhatsIcon src={IWhats} />
          </GroupIcon>
        </Amount>
        {buildings &&
          buildings.length > 0 &&
          buildings.map(building => (
            <BuildingItem
              useBtRemove
              useBtSchedule
              item={building}
              key={building.reference}
            />
          ))}
      </Body>
    </Container>
  );
}

export default Favorites;
