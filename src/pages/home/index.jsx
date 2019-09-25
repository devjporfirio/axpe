import React, { useState, useEffect } from 'react';
import { Container, BuildingSeen, BuildingForYou } from './styles';
import Api from 'services/';
import Slick from '../../components/Slick';

export default function Home() {
  const [ hero, setHero ] = useState([]);
  const [ buildingsSquare, setBuildingsSquare ] = useState([]);
  const [ buildingsGrid, setBuildingsGrid ] = useState([]);
  const [ buildingsSeen, setBuildingsSeen ] = useState([]);
  const [ buildingsForYou, setBuildingsForYou ] = useState([]);

  useEffect(() => {
    async function loadHome() {
      const homePage = await Api.home.loadHome();
      setHero(homePage.hero);
      setBuildingsSquare(homePage.components[1].items);
      setBuildingsGrid(homePage.components[2].items);

      const mock = [
        ...homePage.components[1].items,
        {
          ...homePage.components[1].items[0],
          id: 3,
          title: homePage.components[1].items[0].title + 3
        },
        {
          ...homePage.components[1].items[0],
          id: 4,
          title: homePage.components[1].items[0].title + 4
        },
        {
          ...homePage.components[1].items[0],
          id: 5,
          title: homePage.components[1].items[0].title + 5
        },
        {
          ...homePage.components[1].items[0],
          id: 6,
          title: homePage.components[1].items[0].title + 6
        },
        {
          ...homePage.components[1].items[0],
          id: 7,
          title: homePage.components[1].items[0].title + 7
        },
        {
          ...homePage.components[1].items[0],
          id: 8,
          title: homePage.components[1].items[0].title + 8
        }
      ];
      setBuildingsSeen(mock);
      setBuildingsForYou(mock);
    }
    loadHome();
  }, []);

  return (
    <Container>
      <Slick items={hero} />
      <br />
      <Slick type="slickLeft" items={buildingsSquare} />
      <br />
      <Slick type="slickGrid" items={buildingsGrid} />
      <br />

      {/* title="Imóveis que você viu" */}
      <BuildingSeen>
        <Slick
          type="slickLarge"
          rows={window.innerWidth > 769 ? 2 : 1}
          slidesPerRow={1}
          slidesToShow={1}
          items={buildingsSeen}
        />
      </BuildingSeen>
      <br />

      {/* title="Indicados para você"
      subTitle="Selecionamos alguns imóveis que acabaram de chegar" */}
      <BuildingForYou>
        <Slick
          type="slickSmall"
          slidesToShow={window.innerWidth > 769 ? 3 : 1}
          items={buildingsForYou}
        />
      </BuildingForYou>
    </Container>
  );
}
