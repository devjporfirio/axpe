import React from 'react';

// components
import BuildingCard from 'components/Building/Card';
import SliderNew from 'components/SliderNew';

// styles
import {
  Container,
  Wrapper,
  Header,
  Items
} from './styles';

function BuildingsPanel({
  title,
  headerBig = false,
  buildingLayout = 'vertical',
  subtitle,
  data
}) {
  const settings = {
    vertical: {
      dots: false,
      infinite: true,
      lazyLoad: true,
      speed: 800,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    },
    horizontal: {
      dots: false,
      infinite: true,
      vertical: true,
      speed: 800,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            vertical: false
          }
        }
      ]
    },
  }

  return (
    <Container>
      <Wrapper>
        <Header headerBig={headerBig}>
          {title && (
            <h3 dangerouslySetInnerHTML={{ __html: title }} />
          )}

          {subtitle && (
            <p dangerouslySetInnerHTML={{ __html: subtitle }} />
          )}
        </Header>

        {data && data.length > 0 ? (
          <Items>
            <SliderNew
              type="normal"
              arrowsColor="greenDark"
              settings={settings[buildingLayout]}
            >
              {data.map((building, buildingIndex) => (
                <BuildingCard
                  layout={buildingLayout}
                  item={building}
                  key={`building-searchitem-${building.reference}-${buildingIndex}`}
                />
              ))}
            </SliderNew>
          </Items>
        ) : null}
      </Wrapper>
    </Container>
  )
}

export default BuildingsPanel;
