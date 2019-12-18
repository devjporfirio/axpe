import React, { useCallback, useEffect, useState } from 'react';
import { Container, Header, List, Footer } from 'pages/Dream/Detail/styles';
import BlockHighlighted from 'components/BlockHighlighted';
import Api from 'services';
import Building from 'components/Building';
import Slider from 'react-slick';

// styles
import {
  Buildings,
  BuildingsNotFound,
} from 'pages/Search/styles'

function DreamDetail() {
  const [ buildings, setBuildings, total ] = useState(null);

  const setNewData = useCallback((newData, first) => {
    const newBuildings = buildings && buildings.length && !first ? [ ...buildings, ...newData ] : [ ...newData ];
    setBuildings(newBuildings);
    // setIsLoading(false);
  }, [ buildings ]);

  useEffect(() => {
    const getData = async () => {
      const params = { source: 'praia', finality: 'aluguel', limit: 5 };
      const response = await Api.Search.getBuildings(params);
      // console.log('res', response);
      setNewData(response.data, true);
    }

    getData();

  }, [ total, setNewData ]);

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    draggable: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Container>
      <Header>
        <h1>Só quero Sonhar<span>Descolados</span></h1>
        <p>Lorem ipsum sit dolor sit amet, consecteur elit. Sed nec eros. Lorem ipsum sit dolor sit amet, consecteur elit. Sed nec eros</p>
      </Header>

      <List>
        <h2>Confira nossa seleção com as casas mais <span>descoladas</span></h2>
        
        <Buildings>
          {buildings && buildings.length > 0 ? buildings.map((building, buildingIndex) => (
              <Building item={building} key={`building-searchitem-${building.reference}-${buildingIndex}`} />
            )) : (
            <BuildingsNotFound>
              <h6>Não encontramos o imóveis na categoria que você procura <span>:(</span></h6>
              <p>Tente fazer uma <a href="/search">busca!</a></p>
            </BuildingsNotFound>
          )}
        </Buildings>
      </List>

      <Footer>
        <h2>Sonhe também com:</h2>
        <Slider {...sliderSettings}>
          <div className="item">
            <a href="/so-quero-sonhar-detalhe">
              <h3>Vintage</h3>
              <p>Soluções espertas para imóveis despojados.</p>
            </a>
          </div>
          <div className="item">
            <a href="/so-quero-sonhar-detalhe">
              <h3>Mirante</h3>
              <p>Soluções espertas para imóveis despojados.</p>
            </a>
          </div>
          <div className="item">
            <a href="/so-quero-sonhar-detalhe">
              <h3>Arquitetura de Autor</h3>
              <p>Soluções espertas para imóveis despojados.</p>
            </a>
          </div>
          <div className="item">
            <a href="/so-quero-sonhar-detalhe">
              <h3>Verde que te quero verde</h3>
              <p>Soluções espertas para imóveis despojados.</p>
            </a>
          </div>
          <div className="item">
            <a href="/so-quero-sonhar-detalhe">
              <h3>Clássico contemporâneo</h3>
              <p>Soluções espertas para imóveis despojados.</p>
            </a>
          </div>
        </Slider>
      </Footer>
      <BlockHighlighted type="dream" />
    </Container>
  )
}

export default DreamDetail;