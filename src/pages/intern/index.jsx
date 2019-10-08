import React, { useState, useEffect } from 'react';
import Breadcrumb from 'components/Breadcrumb';
import Gallery from 'components/Gallery';
import Api from 'services';

import {
  Container,
  Datasheet,
  BlockOne,
  BlockTwo,
  BlockThree,
  InfoValue,
  Alert,
  GroupButton,
  Type,
  Neighborhood,
  Ref,
  Price,
  Content,
  Delivery
} from './styles';
import Button from '../../components/Button';

export default function Intern({ match }) {
  const { reference } = match.params;
  const [ property, setProperty ] = useState({});

  useEffect(() => {
    async function loadIntern() {
      const property = await Api.intern.loadIntern(reference);
      setProperty(property.building);
    }
    loadIntern();
  }, []);

  if (!property || !Object.keys(property).length > 0) {
    return <h1>Loading..</h1>;
  }

  return (
    <Container>
      <Breadcrumb
        category={property.category}
        local={property.address.local}
        source={property.source}
        reference={property.reference}
      />

      <br />
      {property.gallery && (
        <Gallery items={property.gallery} tour360={property.tour360} />
      )}
      <br />

      <Datasheet>
        <BlockOne>
          <div>
            <Type>{property.category}</Type>
            <br />
            <Neighborhood>{property.address.local}</Neighborhood>
            <Ref>Ref {property.reference}</Ref>
          </div>

          <GroupButton>
            <Button label={'Novidade'} icon="star" color="blueLight" />
            <Button label={'Só na Axpe'} icon="check" color="greenLight2" />
          </GroupButton>
        </BlockOne>
        {property.content && (
          <BlockTwo>
            <Content>{property.content}</Content>
          </BlockTwo>
        )}
        <BlockThree>
          <Price>
            <p>Venda:</p>
            <p>R$ 2.498.000</p>
            <p>
              IPTU: 10x R$150
              <br />
              Condominio: R$ 1400,00
            </p>
          </Price>
          <Price>
            <p>Aluguel:</p>
            <p>R$ 15.050</p>
            <p>Total locação: R$ 11.550,00 (Aluguel + IPTU + Cond.)</p>
          </Price>
          <InfoValue>
            <p>3 Quartos</p>
            <p>sendo 2 suítes</p>
          </InfoValue>
          <InfoValue>
            <p>3</p>
            <p>Vagas</p>
          </InfoValue>
          <InfoValue>
            <p>160m²</p>
            <p>Área útil</p>
          </InfoValue>
          <InfoValue>
            <p>120m²</p>
            <p>Área coberta</p>
          </InfoValue>
        </BlockThree>
        {property.type !== 'pronto' && (
          <Delivery>Previsão de entrega em <span>{property.infos.releaseDelivery}</span></Delivery>
        )}
      </Datasheet>
      <Alert>
        Todas as informações aqui contidas, incluindo preço, metragem quadrada e
        valores são aproximadas e não garantidas, devendo ser confirmadas
        pessoalmente pelos interessados. No caso de imóveis em lançamento, as
        imagens são meramente ilustrativas e os valores estão sujeitos a
        alteração de tabela.
      </Alert>
    </Container>
  );
}
