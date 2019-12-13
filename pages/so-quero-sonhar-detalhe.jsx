import React, { useCallback, useEffect, useState } from 'react';
import { Container, Header, List } from 'pages/Dream/Detail/styles';
import Api from 'services';
import Building from 'components/Building';

// styles
import {
  HeaderCombo,
  Wrapper,
  ButtonBack,
  Buildings,
  BuildingsNotFound,
  BuildingsLoadMore
} from 'pages/Search/styles'

function DreamDetail() {
  const [ buildings, setBuildings, total ] = useState(null);

  const setNewData = useCallback((newData, first) => {
    const newBuildings = buildings && buildings.length && !first ? [ ...buildings, ...newData ] : [ ...newData ];
    setBuildings(newBuildings);
    //setIsLoading(false);
  }, [ buildings ]);

  useEffect(() => {
    const getData = async () => {

      const params = {source: 'praia', finality: 'aluguel', limit: 5};
      const response = await Api.Search.getBuildings(params);
      console.log('res', response);
      
      

      setNewData(response.data, true);
    }

    getData();

  }, [ total, setNewData ]);

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

      <footer>
        <h2>Sonhe também com:</h2>
        <ul>
          <li></li>
        </ul>
      </footer>
    </Container>
  )
}

export default DreamDetail;