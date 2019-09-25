import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import Api from 'services/';
import Slick from '../../components/Slick';

export default function Home() {
  const [ hero, setHero ] = useState([]);
  const [ buildingsSquare, setBuildingsSquare ] = useState([]);
  const [ buildingsGrid, setBuildingsGrid ] = useState([]);

  useEffect(() => {
    async function loadHome() {
      const homePage = await Api.home.loadHome();
      setHero(homePage.hero);
      setBuildingsSquare(homePage.components[1].items);
      setBuildingsGrid(homePage.components[2].items);
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
    </Container>
  );
}
