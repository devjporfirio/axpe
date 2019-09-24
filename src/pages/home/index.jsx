import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import Api from 'services/';
import Slick from '../../components/Slick';

export default function Home() {
  const [ hero, setHero ] = useState([]);

  useEffect(() => {
    async function loadHome() {
      const homePage = await Api.home.loadHome();
      setHero(homePage.hero);
    }
    loadHome();
  }, []);

  return (
    <Container>
      <Slick items={hero} />
    </Container>
  );
}
