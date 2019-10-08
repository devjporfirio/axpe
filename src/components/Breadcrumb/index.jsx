import React from 'react';
import Button from 'components/Button';

import {
  Container,
  InfoLeft,
  InfoRight,
  Reference,
  FavoriteMobile,
  FavoriteDesktop,
  BackMobile,
  BackDesktop
} from './styles';

import IArrowOrange from '../../assets/icons/arrow-prev-orange.svg';
import IArrowBlack from '../../assets/icons/arrow-prev-black.svg';
import IHeartBlack from '../../assets/icons/heart-black.svg';
import IHeartOrange from '../../assets/icons/heart-orange.svg';
import Phone from '../Phone';

export default function Breadcrumb({ category, local, reference, search }) {
  return (
    <Container>
      <InfoLeft>
        <BackDesktop href="javascript:history.back()">
          <img src={IArrowOrange} alt="Voltar" />
          <span>Voltar</span>
        </BackDesktop>
        <BackMobile href="javascript:history.back()">
          <img src={IArrowBlack} alt="Voltar" />
        </BackMobile>
        <div>
          <p>{category}</p>
          <a href={`/search/${search}`}>{local}</a>
        </div>
      </InfoLeft>

      <InfoRight>
        <Reference>Ref {reference}</Reference>
        <FavoriteMobile src={IHeartOrange} alt="Favoritos" />
        <FavoriteDesktop>
          <span>3</span>
          <img src={IHeartBlack} alt="Favoritos" />
        </FavoriteDesktop>
        <Button label="Mais Informações" />
        <Phone color="orange" />
      </InfoRight>
    </Container>
  );
}
