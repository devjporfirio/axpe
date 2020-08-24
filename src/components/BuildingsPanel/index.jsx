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
  data,
  title,
  subtitle,
  page = '',
  headerBig = false,
  buildingLayout = 'vertical',
  type = 'normal'
}) {
  const settings = {
    vertical: {
      dots: false,
      infinite: false,
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
      infinite: false,
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

  return data && data.length >= 1 ? (
    <Container type={type}>
      <Wrapper type={type}>
        <Header headerBig={headerBig}>
          {title && (
            <h3 dangerouslySetInnerHTML={{ __html: title }} />
          )}

          {subtitle && (
            <p dangerouslySetInnerHTML={{ __html: subtitle }} />
          )}
        </Header>

        {data && data.length > 0 ? (
          <Items data-layout={buildingLayout} data-quantity={data.length}>
            <SliderNew
              type="normal"
              arrowsColor="greenDark"
              arrowsClassName={page ? `holos-${page}-product-slider-arrow` : ''}
              settings={settings[buildingLayout]}
            >
              {data.map((building, buildingIndex) => (
                <BuildingCard
                  layout={buildingLayout}
                  item={building}
                  gtmShowcase={title}
                  positionIndex={buildingIndex + 1}
                  key={`building-searchitem-${building.reference}-${buildingIndex}`}
                />
              ))}
            </SliderNew>
          </Items>
        ) : null}
      </Wrapper>
    </Container>
  ) : null
}

export default BuildingsPanel;
