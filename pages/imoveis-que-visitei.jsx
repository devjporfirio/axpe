import React, { useEffect, useState } from 'react'; // helpers
import Head from 'next/head';
import Api from 'services';

// helpers
import SeoData from 'helpers/seo';
import CookieBuildingSeen from 'helpers/cookieBuildingSeen';

// components
import BlockHighlighted from 'components/BlockHighlighted';
import BuildingCard from 'components/Building/Card';

// styles
import {
  Container,
  Body,
  Buildings,
  Empty,
} from 'pages/VisitedBuildings/styles';

function VisitedBuildings() {
  const [ loaded, setLoaded ] = useState(false);
  const [ buildingsSeen, setBuildingsSeen ] = useState([]);

  useEffect(() => {
    async function loadBuildinsSeen() {
      const buildings = CookieBuildingSeen.get();

      if (!buildings.length) {
        setLoaded(true);
      }

      const listBuildingsSeen = await Api.Search.getBuildings(
        `?reference=${buildings.join(',')}`
      );

      setBuildingsSeen(listBuildingsSeen.data);
      setLoaded(true);
    }

    loadBuildinsSeen();
  }, []);

  return (
    <>
      <Head>
        <title>{`Minha Conta - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        <BlockHighlighted type="visitedBuildings" />
        <Body>
          {loaded && (
            <>
              {buildingsSeen.length >= 1 ? (
                <Buildings>
                  {buildingsSeen.map((building, buildingIndex) => (
                    <BuildingCard
                      key={`building-viewed-${building.reference}-${buildingIndex}`}
                      layout="vertical"
                      item={building}
                      gtmShowcase="Imóvel Recente"
                      positionIndex={buildingIndex + 1}
                    />
                  ))}
                </Buildings>
              ) : (
                <Empty>
                  <h4>Você ainda não visualizou nenhum imóvel</h4>
                  <p>
                    Navegue pelo site, visualize imóveis, e eles ficarão
                    disponíveis para visualizações futuras aqui.
                  </p>
                </Empty>
              )}
            </>
          )}
        </Body>
      </Container>
    </>
  );
}

export default VisitedBuildings;
