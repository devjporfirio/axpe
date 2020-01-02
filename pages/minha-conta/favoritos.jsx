import React, { useEffect, useState } from 'react';
import Api from 'services';
import { useSelector, useDispatch } from 'react-redux';

// actions
import { setMain } from 'store/modules/main/actions';

// images
import IShare from 'assets/icons/share';
import IMail from 'assets/icons/mail';
import IWhats from 'assets/icons/whatsapp-orange';

// styles
import {
  Container,
  Body,
  Empty,
  Amount,
  ShareIcon,
  GroupIcon,
  MailIcon,
  WhatsIcon,
  BuildingItem
} from 'pages/MyAccount/Favorites/styles';

function Favorites({}) {
  const dispatch = useDispatch();
  const access = useSelector(state => state.user);
  const [ buildings, setbuildings ] = useState([]);

  useEffect(() => {
    async function loadBuildings() {
      if (access && access.logged) {
        const buildings = await Api.MyAccount.getFavorites(access.access_token);
        setbuildings(buildings);
      } else {
        dispatch(
          setMain({
            modalLogin: true
          })
        );
      }
    }

    loadBuildings();
  }, [ access ]);

  return !buildings || buildings.length <= 0 ? (
    <Container>
      <Body>
        <Empty>
          <h4>Você ainda não tem nenhum imóvel favorito</h4>
          <p>
            Para favoritar um imóvel, faça uma busca e clique nos ícones de
            coração em cada imóvel.
          </p>
        </Empty>
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

Favorites.getInitialProps = async ({}) => {
  // const buildings = await Api.MyAccount.getFavorites();
  // return {
  //   buildings
  // };
};

export default Favorites;
