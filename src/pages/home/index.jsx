import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import Api from 'services/';
import Slick from '../../components/Slick';

export default function Home() {
  const [ hero, setHero ] = useState([]);
  const [ buildingsSquare, setBuildingsSquare ] = useState([]);

  useEffect(() => {
    async function loadHome() {
      const homePage = await Api.home.loadHome();
      setHero(homePage.hero);
      setBuildingsSquare(homePage.components[1].items);
    }
    loadHome();
  }, []);

  return (
    <Container>
      <Slick items={hero} />
      <br />
      <Slick type="slideLeft" items={buildingsSquare} />
      <br />
      <Slick type="slideGrid" items={buildingsSquare} />
    </Container>
  );
}
