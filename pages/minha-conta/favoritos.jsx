import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Api from 'services';

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

function Favorites() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [ buildings, setBuildings ] = useState([]);

  useEffect(() => {
    async function loadBuildings() {
      if (user && user.logged) {
        dispatch(setMain({ modalLogin: false }));
        const buildings = await Api.MyAccount.getFavorites(user.access_token);
        setBuildings(buildings);
      } else {
        dispatch(setMain({ modalLogin: true }));
      }
    }

    loadBuildings();
  }, [ user ]);

  if(!user.logged) return null;

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

export default Favorites;
